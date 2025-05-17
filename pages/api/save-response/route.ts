// src/app/api/save-response/route.ts
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(request: Request) {
  const body = await request.json();

  const filePath = path.join(process.cwd(), "responses.json");

  // Read existing responses
  let responses = [];
  if (fs.existsSync(filePath)) {
    const fileData = fs.readFileSync(filePath, "utf-8");
    responses = JSON.parse(fileData);
  }

  // Add new response
  responses.push(body);

  // Save updated responses
  fs.writeFileSync(filePath, JSON.stringify(responses, null, 2));

  return NextResponse.json({ message: "Response saved!" });
}
