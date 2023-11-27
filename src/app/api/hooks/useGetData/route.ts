import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

const getData = async (req: NextResponse) => {
  try {
    const { filename } = await req.json();
    const res =
      await sql`SELECT file_data FROM files WHERE filename = ${filename}`;

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
