import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

const getData = async (req: NextRequest) => {
  try {
    const url = new URL(req.url);
    const filename: string | null = url.searchParams.get("filename");
    const id: string | null = url.searchParams.get("id");

    const res =
      await sql`SELECT file_data FROM files WHERE filename = ${filename} AND id = ${id}`;
    return new NextResponse(JSON.stringify(res), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    console.error("Error retrieving data:", err);
    throw err;
  }
};

export { getData as POST };
