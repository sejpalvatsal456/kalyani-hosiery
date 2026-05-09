import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/connectDB";
import { Media } from "@/lib/models";

/* =========================================================
   GET /api/media
========================================================= */
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);

    const type = searchParams.get("type");

    /**
     * ─────────────────────────────
     * REELS
     * ─────────────────────────────
     */
    if (type === "reel") {
      const reels = await Media.find({
        category: "reel",
      }).sort({ createdAt: -1 });

      return NextResponse.json(reels);
    }

    /**
     * ─────────────────────────────
     * BANNERS
     * ─────────────────────────────
     */
    if (type === "banner") {
      const banners = await Media.find({
        category: "banner",
      }).sort({
        order: 1,
        createdAt: -1,
      });

      const grouped: Record<
        string,
        {
          variant: string;
          items: any[];
        }
      > = {};

      banners.forEach((item) => {
        if (!grouped[item.slot]) {
          grouped[item.slot] = {
            variant: item.variant,
            items: [],
          };
        }

        grouped[item.slot].items.push(item);
      });

      return NextResponse.json(grouped);
    }

    /**
     * ─────────────────────────────
     * DEFAULT MEDIA
     * ─────────────────────────────
     */
    const media = await Media.find({
      category: "media",
    }).sort({ createdAt: -1 });

    return NextResponse.json(media);
  } catch (error) {
    console.error("Error fetching media:", error);

    return NextResponse.json(
      {
        error: "Failed to fetch media",
      },
      {
        status: 500,
      }
    );
  }
}