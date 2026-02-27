import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

type WebhookPayload = {
  _type: string;
  slug?: { current: string };
};

/**
 * On-demand ISR revalidation endpoint.
 *
 * Configure a Sanity webhook to POST to this endpoint on document
 * Create / Update / Delete events. Set the webhook secret to the value
 * of SANITY_REVALIDATE_SECRET in the Sanity dashboard.
 *
 * The handler validates the HMAC signature before calling revalidateTag,
 * preventing unauthorised cache invalidation.
 */
export async function POST(req: NextRequest) {
  try {
    const { isValidSignature, body } = await parseBody<WebhookPayload>(
      req,
      process.env.SANITY_REVALIDATE_SECRET
    );

    if (!isValidSignature) {
      return NextResponse.json(
        { message: "Invalid signature" },
        { status: 401 }
      );
    }

    if (!body?._type) {
      return NextResponse.json({ message: "Bad request" }, { status: 400 });
    }

    // Invalidate all documents of this type
    // Next.js 16: second arg is cache profile — empty object uses fetch-level cache settings
    revalidateTag(body._type, {});

    // Also invalidate the specific document by slug if available
    if (body.slug?.current) {
      revalidateTag(`${body._type}:${body.slug.current}`, {});
    }

    return NextResponse.json({
      revalidated: true,
      type: body._type,
      slug: body.slug?.current ?? null,
    });
  } catch (err) {
    console.error("[revalidate]", err);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
