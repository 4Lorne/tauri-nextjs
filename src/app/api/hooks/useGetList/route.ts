import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

const getList = async () => {
  try {
    // const result = await sql`SELECT id, filename, file_data from files`;
    //
    // return new NextResponse(JSON.stringify(result), {
    //   status: 200,
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });
  } catch (err) {
    console.error("Error retrieving data:", err);
    throw err;
  }
};

export { getList as GET };
