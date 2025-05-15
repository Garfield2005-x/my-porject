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
    <div className="paymentPage">
  {cartItems.length > 0 ? (
    <>
      {/* 🛒 รายการสินค้าในตะกร้า */}
      <ul className="cartItemList">
        {cartItems.map((item, index) => (
          <li key={index} className="cartItem">
            <span className="itemName">{item.name}</span> - 
            <span className="itemPrice">{item.price}฿</span>
            <button className="removeButton" onClick={() => removeFromCart(index)}>ลบ</button>
          </li>
        ))}
      </ul>

      {/* 💰 ยอดรวม */}
      <h3 className="totalPrice">ราคารวม: {totalPrice.toFixed(2)}฿</h3>

      {/* 📱 QR Code PromptPay */}
      <div className="qrSection">
        <QRCodeCanvas value={promptPayQR} size={200} />
        <p className="qrText">สแกนเพื่อชำระเงินผ่าน PromptPay</p>
      </div>

      {/* 📎 อัปโหลดสลิป */}
      <div className="slipUploadSection">
        <input type="file" onChange={handleSlipUpload} />
        {slipFile && <p className="slipFileName">คุณแนบไฟล์: {slipFile.name}</p>}
      </div>

      {/* ✅ ปุ่มจ่ายเงิน */}
      {!isPaymentComplete && (
        <button
          className="payButton"
          onClick={handlePayment}
          disabled={!slipFile}
        >
          จ่ายเงิน
        </button>
      )}

      {/* 🎉 แจ้งชำระเงินสำเร็จ */}
      {isPaymentComplete && (
        <p className="successMessage">✅ ชำระเงินสำเร็จ! ขอบคุณที่ซื้อสินค้ากับเรา.</p>
      )}
    </>
  ) : (
    <p className="emptyCartMessage">ไม่มีสินค้าในตะกร้า</p>
  )}
</div>


  );
}
