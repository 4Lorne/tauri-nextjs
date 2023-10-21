import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

// const { Pool } = pg
// const pool = new Pool({
//   connectionString: process.env.POSTGRES_URL + '?sslmode=require',
// })

const getUser = async (): Promise<NextResponse> => {
  try {
    const res = await sql`SELECT * FROM users;`;
    const data = res.rows;
    console.log(data);
    return new NextResponse(JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export { getUser as GET };
