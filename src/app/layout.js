// ✅ ไม่ใส่ use client
import "./globals.css";
import ClientWrapper from "./ClientWrapper"; // ห่อทุกอย่างที่ใช้ client

export const metadata = {
  title: "E-Commerce App",
  description: "Simple E-Commerce Site",
};

export default function Layout({ children }) {
  return (
    <html lang="en">
      <body>
        <ClientWrapper>{children}</ClientWrapper>
      <div>
      <footer>
        <p>Tel : 08x-xxx-xxxx</p>
        <a href="#">Privacy Policy</a>
      </footer>
    </div></body>
      
    </html>
  );
}
