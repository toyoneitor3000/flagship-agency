import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    gemini: !!process.env.GEMINI_API_KEY,
    meta: !!process.env.META_USER_ACCESS_TOKEN,
    firebase: !!process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  });
}
