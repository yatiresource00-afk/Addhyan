import type { Metadata } from "next";
import { getSiteSettingsMap } from "@/lib/learning/queries";
import { SiteSettingsForm } from "@/components/admin/SettingsForm";

export const metadata: Metadata = {
  title: "Site settings · Administration",
  robots: { index: false, follow: false },
};

export default async function AdminSettingsPage() {
  const values = await getSiteSettingsMap();
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold">Site settings</h1>
        <p className="text-muted-foreground mt-2">
          Update public contact details and the announcement banner used across the site.
        </p>
      </div>
      <SiteSettingsForm values={values} />
    </div>
  );
}
