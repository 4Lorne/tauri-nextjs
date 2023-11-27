import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

const getList = async (res: NextResponse) => {
  try {
    const result = await sql`SELECT filename from files`;

    const filenames = result.rows.map((row) => row.filename);

    return new NextResponse(JSON.stringify(filenames), {
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

export { getList as POST };
