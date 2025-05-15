import { NextResponse } from "next/server";
import { connectMongodb } from "../../../../lib/mongodb";
import User from "../../../../models/user";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const { username, email, password, phone } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 10);
    if (!phone) {
  return NextResponse.json({ message: "Phone number is required" }, { status: 400 });
}

    await connectMongodb();
   await User.create({ username, email, phone, password: hashedPassword });


    return NextResponse.json({ message: "Success" }, { status: 200 });

  } catch (error) {
    console.error("Registration error:", error); // เพิ่ม log ดู error
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}
