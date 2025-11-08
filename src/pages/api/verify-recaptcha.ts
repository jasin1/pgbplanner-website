export const prerender = false;

import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  console.log('📍 SECRET KEY:', import.meta.env.RECAPTCHA_SECRET_KEY ? 'GEVONDEN ✅' : 'NIET GEVONDEN ❌');
  try {
    // Probeer de body te lezen
    const body = await request.json();
    const recaptcha = body?.recaptcha;
    
    if (!recaptcha) {
      return new Response(
        JSON.stringify({ success: false, error: 'Geen recaptcha token' }), 
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    const secret = import.meta.env.RECAPTCHA_SECRET_KEY;
    
    if (!secret) {
      console.error('RECAPTCHA_SECRET_KEY niet gevonden in environment variables!');
      return new Response(
        JSON.stringify({ success: false, error: 'Server configuratie fout' }), 
        { 
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }
    
    const response = await fetch(
      'https://www.google.com/recaptcha/api/siteverify',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `secret=${secret}&response=${recaptcha}`,
      }
    );

    const data = await response.json();

    console.log('🔍 Google reCAPTCHA response:', data);
    
    return new Response(
      JSON.stringify({ success: data.success }), 
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
    
  } catch (error) {
    console.error('API Error:', error);
    return new Response(
      JSON.stringify({ success: false, error: 'Server error' }), 
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
};
