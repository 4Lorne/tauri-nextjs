"use server";

import { put } from "@vercel/blob";
import { NextRequest, NextResponse } from "next/server";

const upload = async (request: NextRequest): Promise<NextResponse> => {
  try {
    const { searchParams } = new URL(request.url);

    const filename = searchParams.get("filename");

    if (filename !== null && request.body !== null) {
      const blob = await put(filename, request.body, {
        access: "public",
      });

      console.log("URL HERE: " + blob);

      return NextResponse.json(blob);
    } else {
      return new NextResponse("filename and body are required", {
        status: 400,
      });
    }
  } catch (error) {
    console.error(error);
    return new NextResponse("An error occurred while processing the request", {
      status: 500,
    });
  }
};

export { upload as POST };
