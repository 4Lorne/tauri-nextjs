import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

const updateData = async (req: NextResponse) => {
  try {
    const { filename, file_data } = await req.json();
    const res =
      await sql`UPDATE files SET file_data = ${file_data} WHERE filename = ${filename}`;
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

export { updateData as POST };
