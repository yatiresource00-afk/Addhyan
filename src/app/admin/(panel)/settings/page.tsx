import type { Metadata } from "next";
import { getSiteSettingsMap } from "@/lib/learning/queries";
import { SiteSettingsForm } from "@/components/admin/SettingsForm";
import { otpProviderStatus } from "@/lib/otp/providers";

export const metadata: Metadata = {
  title: "Site settings · Administration",
  robots: { index: false, follow: false },
};

export default async function AdminSettingsPage() {
  const values = await getSiteSettingsMap();
  const otp = otpProviderStatus();
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold">Site settings</h1>
        <p className="text-muted-foreground mt-2">
          Update public contact details and the announcement banner used across the site.
        </p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <StatusCard
          label="Email OTP"
          ready={otp.email}
          detail={
            otp.email
              ? "Resend is configured. Codes are emailed."
              : "Set RESEND_API_KEY on Railway. Mail is sent from enquiry@addhyanacademy.com."
          }
        />
        <StatusCard
          label="WhatsApp OTP"
          ready={otp.whatsapp}
          detail={
            otp.whatsapp
              ? otp.whatsappTemplate
                ? "Twilio template is configured."
                : "Twilio is configured. Add TWILIO_WHATSAPP_CONTENT_SID for a live WhatsApp template."
              : "Set TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN and TWILIO_WHATSAPP_FROM."
          }
        />
      </div>
      <SiteSettingsForm values={values} />
    </div>
  );
}

function StatusCard({
  label,
  ready,
  detail,
}: {
  label: string;
  ready: boolean;
  detail: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-white p-4">
      <p className="text-sm font-semibold text-navy">{label}</p>
      <p className={ready ? "text-green mt-1 text-sm font-medium" : "text-orange mt-1 text-sm font-medium"}>
        {ready ? "Ready" : "Not connected"}
      </p>
      <p className="text-muted-foreground mt-1 text-sm">{detail}</p>
    </div>
  );
}
