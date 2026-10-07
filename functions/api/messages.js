export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      'Allow': 'POST, OPTIONS',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
}

export async function onRequestPost(context) {
  const jsonHeaders = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  };

  let body;
  try {
    body = await context.request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON payload.' }), {
      status: 400,
      headers: jsonHeaders
    });
  }

  const { name, email, message } = body || {};

  if (!email || !message) {
    return new Response(JSON.stringify({ error: 'Email and message are required.' }), {
      status: 400,
      headers: jsonHeaders
    });
  }

  const apiKey = context.env?.RESEND_API_KEY;
  const recipient = context.env?.CONTACT_TO_EMAIL;

  if (!apiKey || !recipient) {
    return new Response(JSON.stringify({
      error: 'The contact service is not configured yet.'
    }), {
      status: 503,
      headers: jsonHeaders
    });
  }

  const senderName = typeof name === 'string' && name.trim() ? name.trim() : 'Anonymous';
  const senderEmail = String(email).trim();
  const senderMessage = String(message).trim();

  if (senderEmail.length > 320 || senderMessage.length > 10000) {
    return new Response(JSON.stringify({ error: 'Message is too long.' }), {
      status: 400,
      headers: jsonHeaders
    });
  }

  try {
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'Personal Universe <onboarding@resend.dev>',
        to: [recipient],
        reply_to: senderEmail,
        subject: `Personal Universe message from ${senderName}`,
        text: `Name: ${senderName}\nEmail: ${senderEmail}\n\n${senderMessage}`
      })
    });

    if (!resendResponse.ok) {
      return new Response(JSON.stringify({ error: 'The message service rejected the submission.' }), {
        status: 502,
        headers: jsonHeaders
      });
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: jsonHeaders
    });
  } catch {
    return new Response(JSON.stringify({ error: 'The message service is temporarily unavailable.' }), {
      status: 502,
      headers: jsonHeaders
    });
  }
}
