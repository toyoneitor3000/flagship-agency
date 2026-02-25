import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Inicializar el cliente de Resend con la key de .env
const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET() {
    try {
        console.log("Enviando correo de prueba con:", {
            apiKeyPresent: !!process.env.RESEND_API_KEY,
            fromEmail: process.env.RESEND_FROM_EMAIL
        });

        // Asegurarnos de que el correo de envío está configurado
        const fromEmail = process.env.RESEND_FROM_EMAIL || 'Pigmento Stickers <hola@pigmentostkrs.com>';

        // Vamos a enviarte un correo a ti mismo para probar (o la dirección que prefieras)
        // Puedes cambiar el "to:" por el correo real que quieras probar
        const { data, error } = await resend.emails.send({
            from: fromEmail,
            to: ['toyoneitor3000@gmail.com'], // Reemplaza esto con un correo al que tengas acceso para probar
            subject: '¡Prueba Exitosa! Todo listo para producción 🎉',
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px; text-align: center; color: #333;">
                    <h2>¡Hola desde Pigmento Stickers!</h2>
                    <p>Si estás leyendo esto, significa que <strong>todo está perfectamente configurado</strong>.</p>
                    <p>Los registros DNS de Vercel y Resend están sincronizados y tu dominio (<strong>pigmentostkrs.com</strong>) está enviando correos como un campeón sin caer en Spam.</p>
                    <br/>
                    <p>¡Felicitaciones y muchos éxitos en tus ventas!</p>
                </div>
            `,
        });

        if (error) {
            console.error("Error de Resend:", error);
            return NextResponse.json({ success: false, error }, { status: 400 });
        }

        return NextResponse.json({ success: true, message: "Correo enviado exitosamente!", data });

    } catch (error) {
        console.error("Error general:", error);
        return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
    }
}
