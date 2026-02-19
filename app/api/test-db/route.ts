import { NextResponse } from "next/server";
import { getDB } from "@/lib/db"; 

export async function GET() {
  const db = await getDB();

  const [rows] = await db.query("SHOW TABLES");

  return NextResponse.json({ tables: rows });
}
