import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

const deleteData = async (req: NextRequest) => {
  try {
    const url = new URL(req.url);
    const id: string | null = url.searchParams.get("id");
    const res = await sql`DELETE FROM files WHERE id = ${id}`;

    return new NextResponse(JSON.stringify(res), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    console.error("Error deleting data:", err);
    throw err;
  }
};

export { deleteData as DELETE };
