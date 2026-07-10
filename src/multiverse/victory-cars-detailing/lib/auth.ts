import { NextRequest } from 'next/server';

export function checkAuth(req: NextRequest): boolean {
  const adminPassword = process.env.ADMIN_PASSWORD;
  
  // If no password is set in .env, default to authorized (convenient for local dev, warning will be shown in UI)
  if (!adminPassword) {
    return true;
  }
  
  // Check authorization header or custom header
  const authHeader = req.headers.get('Authorization') || req.headers.get('authorization');
  if (authHeader) {
    const token = authHeader.replace('Bearer ', '').trim();
    if (token === adminPassword) {
      return true;
    }
  }
  
  // Check query parameter as fallback
  const url = new URL(req.url);
  const tokenParam = url.searchParams.get('token');
  if (tokenParam === adminPassword) {
    return true;
  }
  
  return false;
}
