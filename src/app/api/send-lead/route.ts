import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, website } = body;

    // Validación básica
    if (!name || !email || !website) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos' },
        { status: 400 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: 'Purrpurr Agent <onboarding@resend.dev>',
      to: ['camilotoloza1136@gmail.com'],
      subject: `🔎 Nueva Solicitud de Auditoría: ${website}`,
      html: `
        <div style="font-family: monospace; background-color: #0f0f10; color: #e4e4e7; padding: 20px; border-radius: 8px;">
          <h2 style="color: #a855f7; margin-bottom: 20px;">[NUEVO LEAD CAPTURADO]</h2>
          
          <div style="margin-bottom: 15px;">
            <p style="margin: 0; color: #71717a; font-size: 12px;">CLIENTE</p>
            <p style="margin: 5px 0 0; font-size: 16px;"><strong>${name}</strong></p>
          </div>

          <div style="margin-bottom: 15px;">
             <p style="margin: 0; color: #71717a; font-size: 12px;">EMAIL DE CONTACTO</p>
             <p style="margin: 5px 0 0; font-size: 16px; color: #a855f7;">${email}</p>
          </div>

          <div style="margin-bottom: 25px;">
             <p style="margin: 0; color: #71717a; font-size: 12px;">URL OBJETIVO</p>
             <p style="margin: 5px 0 0; font-size: 16px;">
               <a href="${website}" style="color: #34d399; text-decoration: none;">${website}</a>
             </p>
          </div>

          <hr style="border-color: #27272a; margin: 20px 0;" />
          
          <p style="font-size: 12px; color: #52525b;">
            Este lead fue capturado automáticamente por el Agente Purrpurr desde el Lead Magnet.
          </p>
        </div>
      `
    });

    if (error) {
      console.error('RESEND API ERROR:', error);
      return NextResponse.json({ error }, { status: 400 });
    }

    console.log('RESEND SUCCESS:', data);
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('SERVER ERROR SENDING EMAIL:', error);
    return NextResponse.json(
      { error: 'Error enviando el correo', details: error },
      { status: 500 }
    );
  }
}
