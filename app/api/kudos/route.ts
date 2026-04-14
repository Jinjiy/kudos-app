import { kv } from '@vercel/kv';
import { NextResponse } from 'next/server';

// השורה הזו עוזרת ל-Vercel להבין שמדובר ב-API דינמי
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // בדיקה שהנתונים קיימים
    if (!body.sender || !body.receiver || !body.message) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    await kv.lpush('kudos_list', { 
      sender: body.sender, 
      receiver: body.receiver, 
      message: body.message, 
      timestamp: Date.now() 
    });
    
    // שומרים רק את ה-50 האחרונים
    await kv.ltrim('kudos_list', 0, 49);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to save' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const kudos = await kv.lrange('kudos_list', 0, 10);
    return NextResponse.json(kudos || []);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
  }
}