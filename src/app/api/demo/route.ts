import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

// Validation schema for demo requests
const demoRequestSchema = z.object({
  name: z.string().min(2, 'Nombre muy corto'),
  whatsapp: z.string().min(10, 'WhatsApp inválido'),
  instagram: z.string().optional(),
  industry: z.string().min(1, 'Selecciona una industria'),
  message: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate input
    const result = demoRequestSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { success: false, message: 'Datos inválidos', errors: result.error.flatten() },
        { status: 400 }
      );
    }

    const data = result.data;

    // Format WhatsApp number
    const formattedWhatsApp = data.whatsapp.startsWith('57')
      ? data.whatsapp
      : `57${data.whatsapp}`;

    // Save to database
    const demoRequest = await prisma.demoRequest.create({
      data: {
        name: data.name,
        whatsapp: formattedWhatsApp,
        instagram: data.instagram || null,
        industry: data.industry,
        message: data.message || null,
        status: 'pending',
      },
    });

    console.log('🚀 Nueva solicitud de demo:', {
      id: demoRequest.id,
      name: data.name,
      whatsapp: formattedWhatsApp,
      industry: data.industry,
    });

    // Send email notification
    if (process.env.RESEND_API_KEY) {
      try {
        const { Resend } = await import('resend');
        const resend = new Resend(process.env.RESEND_API_KEY);

        const whatsappLink = `https://wa.me/${formattedWhatsApp}`;
        const instagramLink = data.instagram
          ? `https://instagram.com/${data.instagram}`
          : 'No proporcionado';

        await resend.emails.send({
          from: 'Purrpurr Demos <onboarding@resend.dev>',
          to: 'purrpurrdev@gmail.com',
          subject: `🚀 Nueva Demo: ${data.name} (${data.industry})`,
          html: `
            <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto;">
              <div style="background: linear-gradient(135deg, #8f69ff 0%, #6d42e5 100%); padding: 24px; border-radius: 12px 12px 0 0;">
                <h1 style="color: white; margin: 0; font-size: 24px;">🚀 Nueva Solicitud de Demo</h1>
              </div>
              
              <div style="background: #f8f9fa; padding: 24px; border-radius: 0 0 12px 12px;">
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                      <strong style="color: #6b7280;">Nombre:</strong>
                    </td>
                    <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; text-align: right;">
                      <span style="color: #1f2937; font-weight: 600;">${data.name}</span>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                      <strong style="color: #6b7280;">WhatsApp:</strong>
                    </td>
                    <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; text-align: right;">
                      <a href="${whatsappLink}" style="color: #25D366; font-weight: 600; text-decoration: none;">
                        +${formattedWhatsApp} → Abrir Chat
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                      <strong style="color: #6b7280;">Instagram:</strong>
                    </td>
                    <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; text-align: right;">
                      <a href="${instagramLink}" style="color: #E4405F; font-weight: 600; text-decoration: none;">
                        ${data.instagram ? `@${data.instagram}` : 'No proporcionado'}
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 0;">
                      <strong style="color: #6b7280;">Industria:</strong>
                    </td>
                    <td style="padding: 12px 0; text-align: right;">
                      <span style="background: #8f69ff; color: white; padding: 4px 12px; border-radius: 20px; font-size: 14px;">
                        ${data.industry}
                      </span>
                    </td>
                  </tr>
                </table>

                ${data.message ? `
                <div style="margin-top: 16px; padding: 16px; background: #f3f4f6; border-radius: 8px; border-left: 4px solid #8f69ff;">
                  <p style="margin: 0 0 8px; color: #6b7280; font-size: 12px; font-weight: 600;">LO QUE QUIERE EL CLIENTE:</p>
                  <p style="margin: 0; color: #1f2937; font-size: 14px; line-height: 1.5;">${data.message}</p>
                </div>
                ` : ''}

                <div style="margin-top: 24px; padding: 16px; background: white; border-radius: 8px; border: 1px solid #e5e7eb;">
                  <p style="margin: 0 0 12px; color: #6b7280; font-size: 14px;">Acción rápida:</p>
                  <a href="${whatsappLink}?text=Hola%20${encodeURIComponent(data.name)}%2C%20soy%20de%20Purrpurr.%20Recibimos%20tu%20solicitud%20de%20demo%20%F0%9F%9A%80" 
                     style="display: inline-block; background: #25D366; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600;">
                    Contactar por WhatsApp →
                  </a>
                </div>

                <p style="margin-top: 24px; color: #9ca3af; font-size: 12px; text-align: center;">
                  Solicitud recibida el ${new Date().toLocaleString('es-CO', { timeZone: 'America/Bogota' })}
                </p>
              </div>
            </div>
          `,
        });

        console.log('📧 Email de notificación enviado');
      } catch (emailError) {
        console.error('Error enviando email:', emailError);
        // Don't fail the request if email fails
      }
    } else {
      console.warn('⚠️ RESEND_API_KEY no configurado. Email no enviado.');
    }

    return NextResponse.json({
      success: true,
      message: 'Solicitud recibida. Te contactaremos pronto.',
      id: demoRequest.id,
    });
  } catch (error) {
    console.error('Error procesando solicitud de demo:', error);
    return NextResponse.json(
      { success: false, message: 'Error interno. Intenta de nuevo.' },
      { status: 500 }
    );
  }
}
