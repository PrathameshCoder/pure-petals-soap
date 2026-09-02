type ContactRequest = {
  name?: unknown;
  email?: unknown;
  intent?: unknown;
  message?: unknown;
  company?: unknown;
};

const RESEND_API_URL = "https://api.resend.com";

function text(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

async function resend(path: string, apiKey: string, body: Record<string, unknown>) {
  return fetch(`${RESEND_API_URL}${path}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "User-Agent": "pure-petals-contact-form/1.0",
    },
    body: JSON.stringify(body),
  });
}

export async function POST(request: Request) {
  let raw: ContactRequest;

  try {
    raw = await request.json() as ContactRequest;
  } catch {
    return Response.json({ message: "Invalid form submission." }, { status: 400 });
  }

  const name = text(raw.name);
  const email = text(raw.email).toLowerCase();
  const intent = text(raw.intent);
  const message = text(raw.message);
  const company = text(raw.company);

  // Quietly accept bot-filled submissions without sending anything.
  if (company) return Response.json({ ok: true });

  if (name.length < 2 || name.length > 80) {
    return Response.json({ message: "Please enter your name." }, { status: 400 });
  }
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ message: "Please enter a valid email address." }, { status: 400 });
  }
  if (intent !== "newsletter" && intent !== "query") {
    return Response.json({ message: "Please choose newsletter or query." }, { status: 400 });
  }
  if (message.length > 2000 || (intent === "query" && message.length < 3)) {
    return Response.json({ message: "Please add a short message to your query." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return Response.json({ message: "The contact form is not configured yet." }, { status: 503 });
  }
  const to = process.env.RESEND_CONTACT_TO;
  const from = process.env.RESEND_FROM_EMAIL;
  if (!to || !from) {
    return Response.json({ message: "The contact email is not configured yet." }, { status: 503 });
  }

  if (intent === "newsletter") {
    const segmentId = process.env.RESEND_NEWSLETTER_SEGMENT_ID;
    const [firstName, ...remainingNames] = name.split(/\s+/);
    const lastName = remainingNames.join(" ");
    const contactBody: Record<string, unknown> = {
      email,
      first_name: firstName,
      unsubscribed: false,
    };
    if (lastName) contactBody.last_name = lastName;
    if (segmentId) contactBody.segments = [{ id: segmentId }];

    const response = await resend("/contacts", apiKey, contactBody);
    if (!response.ok && response.status !== 409) {
      const error = await response.text();
      console.error("Resend contact creation failed", response.status, error);
      return Response.json({ message: "We couldn’t add you just now. Please try again." }, { status: 502 });
    }

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const notification = await resend("/emails", apiKey, {
      from,
      to: [to],
      reply_to: email,
      subject: `New Pure Petals newsletter signup — ${name}`,
      html: `<div style="font-family:Arial,sans-serif;line-height:1.6;color:#26301f"><h2>New newsletter signup</h2><p><strong>Name:</strong> ${safeName}<br /><strong>Email:</strong> ${safeEmail}</p><p>This contact has also been added to your Resend contacts.</p></div>`,
      text: `New newsletter signup\n\nName: ${name}\nEmail: ${email}\n\nThis contact has also been added to your Resend contacts.`,
    });

    if (!notification.ok) {
      const error = await notification.text();
      console.error("Newsletter notification delivery failed", notification.status, error);
      return Response.json({ message: "You joined the list, but the notification email could not be sent." }, { status: 502 });
    }

    return Response.json({ ok: true, message: "You’re on the list." });
  }

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message).replaceAll("\n", "<br />");
  const response = await resend("/emails", apiKey, {
    from,
    to: [to],
    reply_to: email,
    subject: `Pure Petals website query from ${name}`,
    html: `<div style="font-family:Arial,sans-serif;line-height:1.6;color:#26301f"><h2>New website query</h2><p><strong>From:</strong> ${safeName}<br /><strong>Email:</strong> ${safeEmail}</p><p><strong>Message:</strong><br />${safeMessage}</p></div>`,
    text: `New website query\n\nFrom: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
  });

  if (!response.ok) {
    console.error("Resend email delivery failed with status", response.status);
    return Response.json({ message: "Your note couldn’t be sent. Please try again." }, { status: 502 });
  }

  return Response.json({ ok: true, message: "Your note has been sent." });
}
