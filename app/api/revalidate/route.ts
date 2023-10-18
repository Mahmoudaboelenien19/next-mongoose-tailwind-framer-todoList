import { NextRequest } from "next/server";
import { revalidateTag } from "next/cache";

export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");
  const tag = request.nextUrl.searchParams.get("tag");

  if (secret !== process.env.NEXT_PUBLIC_REVALIDIATE_SECRET) {
    return Response.json({ message: "Invalid secret" }, { status: 401 });
  }

  if (!tag) {
    return Response.json({ message: "Missing tag param" }, { status: 400 });
  }

  revalidateTag(tag);

  return Response.json({ revalidated: true, now: Date.now() });
}
