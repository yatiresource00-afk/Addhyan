type SendResult =
  | { ok: true; mode: "live" | "dev" }
  | { ok: false; error: string };

export async function sendEmailOtp(to: string, code: string): Promise<SendResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM || "Addhyan Academy <onboarding@resend.dev>";

  if (!apiKey) {
    console.info(`[OTP:email:dev] ${to} → ${code}`);
    return { ok: true, mode: "dev" };
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        subject: "Your Addhyan Academy login code",
        text: `Your Addhyan Academy verification code is ${code}. It expires in 10 minutes. If you did not request this, ignore this email.`,
      }),
    });
    if (!response.ok) {
      const body = await response.text();
      console.error("[OTP:email] provider error", response.status, body);
      return { ok: false, error: "Could not send email OTP. Try again shortly." };
    }
    return { ok: true, mode: "live" };
  } catch (error) {
    console.error("[OTP:email] network error", error);
    return { ok: false, error: "Could not send email OTP. Try again shortly." };
  }
}

export async function sendWhatsAppOtp(to: string, code: string): Promise<SendResult> {
  const sid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_WHATSAPP_FROM; // e.g. whatsapp:+14155238886

  if (!sid || !token || !from) {
    console.info(`[OTP:whatsapp:dev] ${to} → ${code}`);
    return { ok: true, mode: "dev" };
  }

  const body = new URLSearchParams({
    To: to.startsWith("whatsapp:") ? to : `whatsapp:${to}`,
    From: from.startsWith("whatsapp:") ? from : `whatsapp:${from}`,
    Body: `Your Addhyan Academy verification code is ${code}. It expires in 10 minutes.`,
  });

  try {
    const response = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`,
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${Buffer.from(`${sid}:${token}`).toString("base64")}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body,
      }
    );
    if (!response.ok) {
      const text = await response.text();
      console.error("[OTP:whatsapp] provider error", response.status, text);
      return { ok: false, error: "Could not send WhatsApp OTP. Try again shortly." };
    }
    return { ok: true, mode: "live" };
  } catch (error) {
    console.error("[OTP:whatsapp] network error", error);
    return { ok: false, error: "Could not send WhatsApp OTP. Try again shortly." };
  }
}
