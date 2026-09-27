export default async function handler(request, response) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return response.status(405).json({ error: 'Method not allowed.' });
  }

  const { name, email, message } = request.body || {};

  if (!email || !message) {
    return response.status(400).json({ error: 'Email and message are required.' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const recipient = process.env.CONTACT_TO_EMAIL;

  if (!apiKey || !recipient) {
    return response.status(503).json({
      error: 'The contact service is not configured yet.'
    });
  }

  const senderName = typeof name === 'string' && name.trim() ? name.trim() : 'Anonymous';
  const senderEmail = String(email).trim();
  const senderMessage = String(message).trim();

  if (senderEmail.length > 320 || senderMessage.length > 10000) {
    return response.status(400).json({ error: 'Message is too long.' });
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
      return response.status(502).json({ error: 'The message service rejected the submission.' });
    }

    return response.status(200).json({ ok: true });
  } catch {
    return response.status(502).json({ error: 'The message service is temporarily unavailable.' });
  }
}
