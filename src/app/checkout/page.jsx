"use client";
import { useCart } from "../ClientWrapper"; // ใช้ import จาก ClientWrapper
import { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { useRouter } from "next/navigation";
import generatePayload from "promptpay-qr";

export default function CheckoutPage() {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const [slipFile, setSlipFile] = useState(null);
  const [isPaymentComplete, setIsPaymentComplete] = useState(false);
  const router = useRouter();

  const promptPayNumber = "0656206808"; // เบอร์ PromptPay

  // คำนวณราคารวม
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);

  // ใช้ promptpay-qr สร้าง payload ตามมาตรฐาน
  const promptPayQR = generatePayload(promptPayNumber, { amount: totalPrice });

  const handleSlipUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSlipFile(file);
    }
  };

  const handlePayment = async () => {
    if (!slipFile) {
      alert("กรุณาแนบสลิปก่อนทำการชำระเงิน");
      return;
    }

    const formData = new FormData();
    formData.append("email", "boxx3345@gmail.com"); // ใส่อีเมลลูกค้า
    formData.append("slip", slipFile);
    formData.append("items", JSON.stringify(cartItems));

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        alert("📧 ส่งอีเมลยืนยันแล้ว!");
      } else {
        alert("❌ ส่งอีเมลไม่สำเร็จ");
      }
    } catch (err) {
      console.error(err);
      alert("เกิดข้อผิดพลาดขณะส่งอีเมล");
    }

    clearCart();
    setIsPaymentComplete(true);
    router.push("/");
  };

  return (
    <div>
      <h1>หน้าชำระเงิน</h1>
      {cartItems.length > 0 ? (
        <>
          <ul>
            {cartItems.map((item, index) => (
              <li key={index}>
                {item.name} - {item.price}฿
                <button onClick={() => removeFromCart(index)}>ลบ</button>
              </li>
            ))}
          </ul>
          <h3>ราคารวม: {totalPrice.toFixed(2)}฿</h3>
          <QRCodeCanvas value={promptPayQR} size={200} />
          <p>สแกนเพื่อชำระเงินผ่าน PromptPay</p>
          <input type="file" onChange={handleSlipUpload} />
          {slipFile && <p>คุณแนบไฟล์: {slipFile.name}</p>}
          {!isPaymentComplete && (
            <button onClick={handlePayment} disabled={!slipFile}>
              จ่ายเงิน
            </button>
          )}
          {isPaymentComplete && <p>✅ ชำระเงินสำเร็จ! ขอบคุณที่ซื้อสินค้ากับเรา.</p>}
        </>
      ) : (
        <p>ไม่มีสินค้าในตะกร้า</p>
      )}
    </div>
  );
}
