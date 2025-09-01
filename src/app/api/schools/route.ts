import { NextResponse } from "next/server";
import { pool } from "@/lib/db";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export const runtime = "nodejs";


export async function GET() {
  const { rows } = await pool.query(
    "SELECT id, name, address, city, state, contact, image, email_id FROM schools ORDER BY id DESC"
  );
  return NextResponse.json(rows);
}


export async function POST(req: Request) {
  try {
    const form = await req.formData();

    const name = String(form.get("name") ?? "");
    const address = String(form.get("address") ?? "");
    const city = String(form.get("city") ?? "");
    const state = String(form.get("state") ?? "");
    const contact = String(form.get("contact") ?? "");
    const email = String(form.get("email_id") ?? "");
    const imageFile = form.get("image") as File | null;

    if (!name || !address || !city || !state || !contact || !email || !imageFile) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    // Save image to /public/schoolImages
    const bytes = await imageFile.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const uploadDir = path.join(process.cwd(), "public", "schoolImages");
    await mkdir(uploadDir, { recursive: true });
    const safeName = imageFile.name.replace(/[^a-zA-Z0-9.\-_]/g, "_");
    const filename = `${Date.now()}-${safeName}`;
    await writeFile(path.join(uploadDir, filename), buffer);
    const imagePath = `/schoolImages/${filename}`;

    await pool.query(
      "INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES ($1,$2,$3,$4,$5,$6,$7)",
      [name, address, city, state, contact, imagePath, email]
    );

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message ?? "Server error" }, { status: 500 });
  }
}
