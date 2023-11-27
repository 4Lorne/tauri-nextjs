import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

const uploadData = async (req: NextResponse): Promise<NextResponse> => {
  try {
    const { Filename, File_data } = await req.json();

    await sql`
        INSERT INTO files (filename, file_data)
        VALUES (${Filename}, ${File_data})`;
    return new NextResponse(JSON.stringify(req), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export { uploadData as POST };
