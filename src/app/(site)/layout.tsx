import { getSiteSettings } from "@/lib/payload/queries";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSiteSettings();

  return (
    <>
      <Header siteName={settings?.siteName} />
      <main>{children}</main>
      <Footer settings={settings} />
    </>
  );
}
