'use server'

import { prisma } from '@/lib/prisma';
import { contactSchema } from '@/lib/schemas';

type ActionResponse = {
  success: boolean;
  message: string;
  errors?: { [key: string]: string[] };
}

export async function submitContactForm(formData: FormData): Promise<ActionResponse> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));

  const rawData = {
    name: formData.get('name'),
    email: formData.get('email'),
    budget: formData.get('budget'),
    message: formData.get('message'),
    _honey: formData.get('_honey')
  };

  // Zod Validation
  const result = contactSchema.safeParse(rawData);

  if (!result.success) {
    // Format Zod errors
    const errors: { [key: string]: string[] } = {};
    result.error.issues.forEach(issue => {
      const path = issue.path[0] as string;
      if (!errors[path]) errors[path] = [];
      errors[path].push(issue.message);
    });

    return {
      success: false,
      message: 'Please check your inputs',
      errors
    };
  }

  // Validation passed
  const data = result.data;

  // Save to Database
  try {
    await prisma.contact.create({
      data: {
        name: data.name,
        email: data.email,
        budget: data.budget || '',
        message: data.message
      }
    });

    console.log('✅ Lead saved to database:', data.email);

    // Send Email Notification (Resend)
    // NOTE: This requires RESEND_API_KEY in .env
    if (process.env.RESEND_API_KEY) {
      const { Resend } = await import('resend');
      const resend = new Resend(process.env.RESEND_API_KEY);

      await resend.emails.send({
        from: 'Financars Lead <onboarding@resend.dev>', // Use your verified domain in production
        to: 'purrpurrdev@gmail.com',
        subject: `New Lead: ${data.name}`,
        html: `
          <h1>New Project Inquiry</h1>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Budget:</strong> ${data.budget}</p>
          <p><strong>Message:</strong></p>
          <blockquote style="background: #f4f4f5; padding: 16px; border-radius: 8px;">${data.message}</blockquote>
        `
      });
      console.log('📧 Email notification sent');
    } else {
      console.warn('⚠️ RESEND_API_KEY missing. Email not sent.');
    }

    return {
      success: true,
      message: 'Message received! We will contact you shortly.'
    };
  } catch (error) {
    console.error('Database Error:', error);
    return {
      success: false,
      message: 'Failed to save your message. Please try again later.'
    };
  }
}