export const prerender = false;

import type { APIRoute } from 'astro';

const PGB_TYPES = new Set(['Wlz', 'Wmo', 'Jeugdwet', 'Zvw', 'Meerdere', 'Weet ik niet']);
const MAX_NAME_LENGTH = 200;
const MAX_EMAIL_LENGTH = 254;
const MAX_MESSAGE_LENGTH = 2000;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ContactPayload = {
  name: string;
  email: string;
  pgbType: string | null;
  message: string;
  subscribeToUpdates: boolean;
};

function jsonResponse(status: number, body: Record<string, unknown>) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

function parsePayload(body: unknown): ContactPayload | null {
  if (typeof body !== 'object' || body === null) return null;

  const { name, email, pgbType, message, subscribeToUpdates, recaptchaToken } =
    body as Record<string, unknown>;

  const trimmedName = typeof name === 'string' ? name.trim() : '';
  const trimmedEmail = typeof email === 'string' ? email.trim() : '';
  const messageValue = typeof message === 'string' ? message : '';

  const normalizedPgbType =
    pgbType === null
      ? null
      : typeof pgbType === 'string' && PGB_TYPES.has(pgbType)
        ? pgbType
        : undefined;

  const hasMessageOrUpdates =
    messageValue.trim().length > 0 || subscribeToUpdates === true;

  const isValid =
    trimmedName.length > 0 &&
    trimmedName.length <= MAX_NAME_LENGTH &&
    trimmedEmail.length > 0 &&
    trimmedEmail.length <= MAX_EMAIL_LENGTH &&
    EMAIL_PATTERN.test(trimmedEmail) &&
    normalizedPgbType !== undefined &&
    messageValue.length <= MAX_MESSAGE_LENGTH &&
    typeof subscribeToUpdates === 'boolean' &&
    hasMessageOrUpdates &&
    typeof recaptchaToken === 'string' &&
    recaptchaToken.length > 0;

  if (!isValid) return null;

  return {
    name: trimmedName,
    email: trimmedEmail,
    pgbType: normalizedPgbType,
    message: messageValue,
    subscribeToUpdates: subscribeToUpdates as boolean,
  };
}

async function verifyRecaptcha(token: string, secret: string): Promise<boolean> {
  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${encodeURIComponent(secret)}&response=${encodeURIComponent(token)}`,
    });

    if (!response.ok) return false;

    const data = await response.json();
    return data?.success === true;
  } catch {
    return false;
  }
}

export const POST: APIRoute = async ({ request }) => {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return jsonResponse(400, { success: false, reason: 'validation' });
  }

  const recaptchaToken =
    typeof body === 'object' && body !== null && 'recaptchaToken' in body
      ? (body as Record<string, unknown>).recaptchaToken
      : undefined;

  const payload = parsePayload(body);
  if (!payload) {
    return jsonResponse(400, { success: false, reason: 'validation' });
  }

  const secret = import.meta.env.RECAPTCHA_SECRET_KEY;
  if (!secret) {
    console.error('RECAPTCHA_SECRET_KEY is not configured');
    return jsonResponse(500, { success: false, reason: 'server' });
  }

  const recaptchaOk = await verifyRecaptcha(recaptchaToken as string, secret);
  if (!recaptchaOk) {
    return jsonResponse(400, { success: false, reason: 'recaptcha' });
  }

  const webhookUrl = import.meta.env.CONTACT_WEBHOOK_URL;
  if (!webhookUrl) {
    console.error('CONTACT_WEBHOOK_URL is not configured');
    return jsonResponse(500, { success: false, reason: 'server' });
  }

  try {
    const forwardResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!forwardResponse.ok) {
      return jsonResponse(502, { success: false, reason: 'server' });
    }
  } catch {
    return jsonResponse(502, { success: false, reason: 'server' });
  }

  return jsonResponse(200, { success: true });
};
