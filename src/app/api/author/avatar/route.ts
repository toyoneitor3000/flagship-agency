import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const author = await prisma.user.findFirst({
      where: {
        email: {
          in: ["camilotoloza1136@gmail.com", "purrpurrdev@gmail.com"],
        },
      },
      orderBy: {
        updatedAt: "desc",
      },
      select: { image: true },
    });

    if (author?.image) {
      // Direct high-resolution Google CDN avatar without static copies
      const liveGoogleUrl = author.image.replace(/=s\d+-c/, "=s800-c");
      return NextResponse.redirect(liveGoogleUrl, {
        status: 307,
        headers: {
          "Cache-Control": "public, max-age=60, stale-while-revalidate=300",
        },
      });
    }

    // Default live Google URL fallback
    return NextResponse.redirect(
      "https://lh3.googleusercontent.com/a/ACg8ocJ7VFeFsm3g4X8j9MU7Nt5cGrDkPSoY6ILfPMRKVac0NNvzz3d5WQ=s800-c",
      { status: 307 }
    );
  } catch (error) {
    console.error("Error fetching author live Google avatar:", error);
    return NextResponse.redirect(
      "https://lh3.googleusercontent.com/a/ACg8ocJ7VFeFsm3g4X8j9MU7Nt5cGrDkPSoY6ILfPMRKVac0NNvzz3d5WQ=s800-c",
      { status: 307 }
    );
  }
}
