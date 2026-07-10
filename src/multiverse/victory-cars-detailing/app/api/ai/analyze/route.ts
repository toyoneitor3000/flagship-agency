import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { GoogleAIFileManager } from "@google/generative-ai/server";
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

// Replace with your actual Gemini API Key from Google AI Studio
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'MISSING_API_KEY');
const fileManager = new GoogleAIFileManager(process.env.GEMINI_API_KEY || 'MISSING_API_KEY');

export async function POST(req: NextRequest) {
  try {
    const { imageUrl, imageBase64, category } = await req.json();

    if (!imageUrl && !imageBase64) {
      return NextResponse.json({ error: 'Falta imageUrl o imageBase64' }, { status: 400 });
    }
    if (!category) {
      return NextResponse.json({ error: 'Falta category' }, { status: 400 });
    }

    if (!process.env.GEMINI_API_KEY) {
      // Mock mode if API key is not present
      console.warn("GEMINI_API_KEY is not set. Using Mock Response.");
      await new Promise(resolve => setTimeout(resolve, 2000));
      return NextResponse.json({
        categoria: category,
        copyGenerado: 'Protección máxima para su vehículo. Nuestro servicio mantiene el más alto estándar estético. Agenda tu cita en Victory Cars Detailing. #VictoryCars #CarDetailing',
        recomendacionPauta: 'Este tipo de contenido demuestra nuestros altos estándares de calidad. Sugiero pautarlo para públicos con intereses en vehículos de alta gama y lujo.',
        score: 9
      });
    }

    let buffer: Buffer;
    let mimeType = 'image/jpeg';
    let isVideo = false;

    if (imageUrl) {
      const mediaResp = await fetch(imageUrl);
      if (!mediaResp.ok) {
          throw new Error("No se pudo descargar el archivo proporcionado");
      }
      const arrayBuffer = await mediaResp.arrayBuffer();
      buffer = Buffer.from(arrayBuffer);
      mimeType = mediaResp.headers.get('content-type') || 'application/octet-stream';
      isVideo = mimeType.startsWith('video/');
    } else if (imageBase64) {
      // Decode base64
      // Expecting format: data:image/png;base64,iVBORw0KGgo...
      const matches = imageBase64.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
      if (matches && matches.length === 3) {
        mimeType = matches[1];
        buffer = Buffer.from(matches[2], 'base64');
        isVideo = mimeType.startsWith('video/');
      } else {
        // Raw base64 string
        buffer = Buffer.from(imageBase64, 'base64');
      }
    } else {
       throw new Error("No media provided");
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
      Eres un experto en Marketing Automotriz para un negocio llamado "Victory Cars Detailing".
      Nuestra empresa se caracteriza por ser muy pulida, seria, profesional y mantener los más altos estándares de calidad.
      
      IMPORTANTE: El usuario ya determinó que este contenido pertenece a la categoría: "${category}".
      
      Analiza este contenido visual y devuelve ÚNICAMENTE un objeto JSON válido con las siguientes propiedades:
      1. "copyGenerado": Un texto para Instagram promocionando este servicio ESPECÍFICAMENTE para la categoría de ${category}. El tono DEBE SER ESTRICTAMENTE serio, técnico, profesional y de alta gama. ESTÁ ESTRICTAMENTE PROHIBIDO USAR EMOJIS (ni uno solo). Incluye hashtags relevantes al final. 
         ¡CRÍTICO!: Al final de los hashtags, debes incluir obligatoriamente el hashtag oculto para la clasificación del sistema: #Categoria${category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()} (Ejemplo: #CategoriaPpf o #CategoriaDetailing).
      2. "recomendacionPauta": Un breve análisis técnico de por qué este contenido es apto para pautarlo en Meta Ads.
      3. "score": Un número del 1 al 10 evaluando qué tan bueno es este contenido visual para usarlo como anuncio pago.
      
      No incluyas markdown \`\`\`json ni nada más, solo el objeto JSON puro.
    `;

    let result;

    if (isVideo) {
      // -----------------------------------------------------
      // VIDEO FLOW (requires GoogleAIFileManager)
      // -----------------------------------------------------
      const tempFilePath = path.join(os.tmpdir(), `upload_${Date.now()}.mp4`);
      fs.writeFileSync(tempFilePath, buffer);

      try {
        const uploadResponse = await fileManager.uploadFile(tempFilePath, {
          mimeType,
          displayName: `Video_${Date.now()}`
        });

        const name = uploadResponse.file.name;

        // Poll for processing completion
        let fileState = await fileManager.getFile(name);
        while (fileState.state === "PROCESSING") {
          console.log('Video procesando, esperando 5 segundos...');
          await new Promise(resolve => setTimeout(resolve, 5000));
          fileState = await fileManager.getFile(name);
        }

        if (fileState.state === "FAILED") {
           throw new Error("El procesamiento de video falló en los servidores de Google AI.");
        }

        result = await model.generateContent([
          prompt,
          {
            fileData: {
              mimeType: uploadResponse.file.mimeType,
              fileUri: uploadResponse.file.uri
            }
          }
        ]);

        // Clean up the file from Google AI to save quota
        try {
          await fileManager.deleteFile(name);
        } catch (e) {
          console.error("Error deleting file from Google AI", e);
        }
      } finally {
        // Clean up temp file
        if (fs.existsSync(tempFilePath)) {
          fs.unlinkSync(tempFilePath);
        }
      }
    } else {
      // -----------------------------------------------------
      // IMAGE FLOW (inlineData is faster for images)
      // -----------------------------------------------------
      const imageParts = [
        {
          inlineData: {
            data: buffer.toString("base64"),
            mimeType
          },
        },
      ];
      result = await model.generateContent([prompt, ...imageParts]);
    }

    const responseText = result.response.text();
    
    // Clean potential markdown from Gemini response
    const cleanedText = responseText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    
    let analysis;
    try {
        analysis = JSON.parse(cleanedText);
        // Force the category back into the response for the frontend
        analysis.categoria = category;
    } catch(e) {
        throw new Error("Gemini no devolvió un JSON válido: " + cleanedText);
    }

    return NextResponse.json(analysis);

  } catch (error: any) {
    console.error('AI Analysis Error:', error);
    return NextResponse.json({ error: error.message || 'Fallo en el análisis de IA' }, { status: 500 });
  }
}
