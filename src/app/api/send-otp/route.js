// src/app/api/send-otp/route.js
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { connectToDatabase } from "lib/mongodb"; // ใช้ฟังก์ชันที่เชื่อมต่อกับ MongoDB
import bcrypt from "bcryptjs";

export async function POST(req) {
  const { email } = await req.json();  // รับ email จาก body ของ request

  if (!email) {
    return NextResponse.json({ success: false, message: "Email is required" }, { status: 400 });
  }

  try {
    const { db } = await connectToDatabase();  // เชื่อมต่อกับ MongoDB ในฝั่ง server

    const otp = Math.floor(100000 + Math.random() * 900000);  // สร้าง OTP 6 หลัก
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);  // หมดอายุใน 5 นาที
    const hashedOtp = await bcrypt.hash(otp.toString(), 10);  // แปลง OTP เป็น string ก่อนการแฮช



    // บันทึก OTP ลงใน MongoDB
    await db.collection("otps").updateOne(
      { email }, 
      { $set: { otp: hashedOtp, expiresAt }}, 
      { upsert: true }  // สร้างใหม่ถ้ายังไม่มี
    );

    // ตั้งค่า nodemailer ให้เชื่อมกับ Gmail SMTP หรือ Mail Server อื่นๆ
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,  // ใช้ Environment Variables
        pass: process.env.EMAIL_PASS   // ใช้ Environment Variables
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,  // ใช้ Environment Variables
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP code is: ${otp}`
    };

    // ส่งอีเมล
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: "OTP sent successfully" }, { status: 200 });

  } catch (error) {
    console.error("Email Error:", error);
    return NextResponse.json({ success: false, message: "Failed to send OTP" }, { status: 500 });
  }
}

// EMAIL_USER=tureseve.x@gmail.com
// EMAIL_PASS=zzhtxnenkbtdifpx