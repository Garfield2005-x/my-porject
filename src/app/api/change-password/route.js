import { connectMongodb } from 'lib/mongodb';
import bcrypt from 'bcryptjs'; // ใช้ bcrypt สำหรับการแฮชรหัสผ่าน
import { getSession } from 'next-auth/react'; // ใช้เพื่อตรวจสอบ session ผู้ใช้

export async function POST(req) {
    const { newPassword } = await req.json();

    if (!newPassword) {
        return new Response(JSON.stringify({ success: false, message: 'กรุณากรอกรหัสผ่านใหม่' }), { status: 400 });
    }

    // ตรวจสอบการเข้าสู่ระบบของผู้ใช้ (โดยการตรวจสอบ session)
    const session = await getSession({ req });
    if (!session) {
        return new Response(JSON.stringify({ success: false, message: 'คุณต้องเข้าสู่ระบบก่อน' }), { status: 401 });
    }

    try {
        // เชื่อมต่อ MongoDB
        const client = await connectMongodb();
        const db = client.db();

        // แฮชรหัสผ่านใหม่ก่อนที่จะบันทึกลงในฐานข้อมูล
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // อัปเดตรหัสผ่านใน MongoDB
        const updatedUser = await db.collection('users').updateOne(
            { _id: session.user.id }, // ค้นหาผู้ใช้จาก session user.id
            { $set: { password: hashedPassword } } // อัปเดตรหัสผ่านใหม่
        );

        if (updatedUser.modifiedCount === 0) {
            return new Response(JSON.stringify({ success: false, message: 'ไม่พบผู้ใช้ หรือ รหัสผ่านไม่เปลี่ยนแปลง' }), { status: 400 });
        }

        return new Response(JSON.stringify({ success: true, message: 'เปลี่ยนรหัสผ่านสำเร็จ' }), { status: 200 });

    } catch (error) {
        console.error('เกิดข้อผิดพลาดในการเปลี่ยนรหัสผ่าน:', error);
        return new Response(JSON.stringify({ success: false, message: 'เกิดข้อผิดพลาดในการเปลี่ยนรหัสผ่าน' }), { status: 500 });
    }
}
