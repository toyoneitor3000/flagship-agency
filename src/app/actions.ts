'use server'

export async function submitContactForm(formData: FormData) {
  // Simulación de delay de red
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const email = formData.get('email');
  
  // Aquí iría la integración real con Resend/SendGrid
  console.log('📧 Nuevo lead capturado:', email);
  
  // Retornar estado
  return {
    success: true,
    message: '¡Recibido! Te contactaremos pronto.'
  };
}