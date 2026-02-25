import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { auth } from '@/auth';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
    try {
        const session = await auth();

        // Solo administradores pueden enviar notificaciones
        if (session?.user?.role !== "ADMIN") {
            return NextResponse.json({ error: 'No autorizado' }, { status: 403 });
        }

        const { to, subject, htmlBody, textBody } = await req.json();

        if (!to || !subject || (!htmlBody && !textBody)) {
            return NextResponse.json({ error: 'Faltan campos requeridos' }, { status: 400 });
        }

        const { data, error } = await resend.emails.send({
            from: process.env.RESEND_FROM_EMAIL || 'Pigmento Stickers <onboarding@resend.dev>',
            to: [to],
            subject,
            html: htmlBody,
            text: textBody,
        });

        if (error) {
            console.error('[POST /api/notifications/email] Resend error:', error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        console.log('[POST /api/notifications/email] Email sent:', data?.id, 'to:', to);

        return NextResponse.json({
            success: true,
            emailId: data?.id,
            message: 'Email enviado exitosamente',
        });
    } catch (error: any) {
        console.error('[POST /api/notifications/email] Error:', error?.message || error);
        return NextResponse.json(
            { error: 'Error enviando email', details: error?.message },
            { status: 500 }
        );
    }
}
