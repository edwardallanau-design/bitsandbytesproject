import { NextStudio } from "next-sanity/studio";

import config from "../../../../sanity.config";

// Studio must never be statically rendered — it requires a live browser session
export const dynamic = "force-dynamic";

export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
