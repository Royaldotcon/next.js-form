import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  const data = await req.json();

  const filePath = path.join(process.cwd(), "responses.json");

  let existing = [];
  if (fs.existsSync(filePath)) {
    existing = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  }

  existing.push(data);

  fs.writeFileSync(filePath, JSON.stringify(existing, null, 2));

  return NextResponse.json({ message: "Saved" });
}
