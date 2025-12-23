import { VercelRequest } from '@vercel/node';

export interface AuthUser {
  userId: string;
  email: string;
  name?: string;
}

export async function getUserFromRequest(req: VercelRequest): Promise<AuthUser | null> {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null;
    }

    const token = authHeader.substring(7);

    const clerkResponse = await fetch('https://api.clerk.com/v1/sessions/verify', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.CLERK_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    });

    if (!clerkResponse.ok) {
      return null;
    }

    const session = await clerkResponse.json();
    
    return {
      userId: session.user_id,
      email: session.user?.email_addresses?.[0]?.email_address || '',
      name: session.user?.first_name || undefined,
    };
  } catch (error) {
    console.error('Auth error:', error);
    return null;
  }
}

export function requireAuth(user: AuthUser | null): asserts user is AuthUser {
  if (!user) {
    throw new Error('Unauthorized');
  }
}

