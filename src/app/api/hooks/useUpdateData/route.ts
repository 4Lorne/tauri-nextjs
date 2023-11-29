import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

const updateData = async (req: NextResponse) => {
  try {
    let { filename, file_data, new_filename } = await req.json();

    new_filename = new_filename.length > 0 ? new_filename : filename;

    const res =
      await sql`UPDATE files SET file_data = ${file_data}, filename = ${new_filename} WHERE filename = ${filename}`;

    return new NextResponse(JSON.stringify(res), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    console.error("Error updating data:", err);
    throw err;
  }
};

export { updateData as PUT };
