// /app/api/verify-otp/route.js
import bcrypt from 'bcryptjs';
import { connectToDatabase } from 'lib/mongodb';

export async function POST(req) {
  const { otp } = await req.json();

  try {
    // เชื่อมต่อ MongoDB
    const { db } = await connectToDatabase();

    // ดึงข้อมูล OTP ที่แฮชจากฐานข้อมูล
    const otpRecord = await db.collection("otps").findOne({}); // ค้นหา OTP ใดๆ

    if (!otpRecord) {
      return new Response(
        JSON.stringify({ success: false, message: "ไม่พบ OTP ในฐานข้อมูล" }),
        { status: 400 }
      );
    }

    // ตรวจสอบว่า OTP ตรงกับที่แฮชไว้ในฐานข้อมูลหรือไม่
    const isOtpValid = await bcrypt.compare(otp, otpRecord.otp);

    if (!isOtpValid) {
      return new Response(
        JSON.stringify({ success: false, message: "OTP ไม่ถูกต้อง" }),
        { status: 400 }
      );
    }

    // ตรวจสอบว่า OTP หมดอายุหรือไม่
    if (new Date() > new Date(otpRecord.expiresAt)) {
      return new Response(
        JSON.stringify({ success: false, message: "OTP หมดอายุแล้ว" }),
        { status: 400 }
      );
    }

    // OTP ถูกต้องและยังไม่หมดอายุ
    return new Response(
      JSON.stringify({ success: true, message: "OTP ยืนยันสำเร็จ" })
    );

  } catch (error) {
    console.error("Error verifying OTP:", error);
    return new Response(
      JSON.stringify({ success: false, message: "เกิดข้อผิดพลาดในการยืนยัน OTP" }),
      { status: 500 }
    );
  }
}
