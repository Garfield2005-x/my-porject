import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectMongodb } from "../../../../../lib/mongodb";
import User from "../../../../../models/user";
import bcrypt from "bcryptjs";

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        const { username, password, email } = credentials;

        try {
          // เชื่อมต่อกับ MongoDB
          await connectMongodb();
          
          // ค้นหาผู้ใช้จากชื่อผู้ใช้ (username)
          const user = await User.findOne({ username });

          // หากไม่พบผู้ใช้หรือรหัสผ่านไม่ตรงกัน ให้ส่งกลับ null
          if (!user) {
            return null;
          }

          const isPasswordMatch = await bcrypt.compare(password, user.password);
          if (!isPasswordMatch) {
            return null;
          }

          // ส่งข้อมูลผู้ใช้เมื่อผ่านการตรวจสอบ
          return {
            id: user._id.toString(),
            username: user.username,
            email: user.email,
          };
        } catch (error) {
          console.log("Error during authorization:", error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    // เพิ่มข้อมูลจากผู้ใช้ใน token
    async jwt({ token, user }) {
      if (user) {
        token.username = user.username;
        token.email = user.email;
      }
      return token;
    },
    // เพิ่มข้อมูลจาก token ใน session
    async session({ session, token }) {
      session.user.username = token.username;
      session.user.email = token.email;
      return session;
    },
  },
};

const handler = async (req, res) => {
  // ตรวจสอบว่าเป็นการร้องขอแบบ GET และ URL เริ่มต้นด้วย /api/auth/check-email หรือไม่
  if (req.method === "GET" && req.url.startsWith("/api/auth/check-email")) {
    // 📌 เช็คว่า URL มีพารามิเตอร์ email หรือไม่
    const url = new URL(req.url, `http://${req.headers.host}`);
    const email = url.searchParams.get("email");

    if (!email) {
      return res.status(400).json({ error: "กรุณาระบุอีเมล" });
    }

    try {
      await connectMongodb();
      const user = await User.findOne({ email });

      if (user) {
        return res.status(200).json({ exists: true, email });
      } else {
        return res.status(200).json({ exists: false });
      }
    } catch (error) {
      console.error("Error checking email:", error);  // เพิ่มการแสดงข้อผิดพลาด
      return res.status(500).json({ error: "เกิดข้อผิดพลาดในการตรวจสอบอีเมล" });
    }
  }

  // การทำงานของ NextAuth
  return NextAuth(req, res, authOptions);
};

export { handler as GET, handler as POST };
