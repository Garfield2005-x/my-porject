// src/app/api/send-email/route.js
import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const formData = await req.formData();

    const email = formData.get("email");
    const slipFile = formData.get("slip");
    const items = JSON.parse(formData.get("items") || "[]");

    // อ่านไฟล์สลิปเป็น Buffer
    const fileBuffer = await slipFile.arrayBuffer();
    const fileName = slipFile.name;

    // Nodemailer setup
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "tureseve.x@gmail.com",
        pass: "zzhtxnenkbtdifpx",
      },
    });

    const mailOptions = {
  from: "your-email@gmail.com",
  to: "boxx3345@gmail.com", // ส่งถึงตัวคุณเอง
  subject: "📦 มีออเดอร์ใหม่จากร้านของคุณ",
  html: `
    <div style="font-family: Arial, sans-serif; padding: 20px;">
      <h2 style="color: #4CAF50;">📬 คำสั่งซื้อใหม่เข้ามาแล้ว!</h2>

      <h3 style="margin-bottom: 8px;">📄 รายการสินค้า:</h3>
      <table style="border-collapse: collapse; width: 100%; margin-bottom: 20px;">
        <thead>
          <tr>
            <th style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2;">รายการคำสั่งซื้อ</th>
            <th style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2;">ราคา</th>
          </tr>
        </thead>
        <tbody>
          ${items.map(item => `
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px;">${item.name}</td>
              <td style="border: 1px solid #ddd; padding: 8px;">${item.price} บาท</td>
            </tr>
          `).join("")}
        </tbody>
      </table>

      <p style="margin-top: 20px;">📎 ไฟล์สลิปถูกแนบไว้ในอีเมลนี้</p>
    </div>
  `,
  attachments: [
    {
      filename: fileName,
      content: Buffer.from(fileBuffer),
    },
  ],
};


    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: "ส่งอีเมลสำเร็จ!" }, { status: 200 });
  } catch (error) {
    console.error("ส่งเมลล้มเหลว:", error);
    return NextResponse.json(
      { message: "❌ การส่งอีเมลล้มเหลว" },
      { status: 500 }
    );
  }
}
