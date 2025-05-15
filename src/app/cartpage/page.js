"use client";
import { useCart } from "../ClientWrapper"; // ใช้ import จาก ClientWrapper
import { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { useRouter } from "next/navigation";
import generatePayload from "promptpay-qr";
import Link from "next/link";
import Image from "next/image";
import styles from './cart.style.css';
import SlipUpload from "../components/SlipUpload";






export default function CartPage() {
  
  const { cartItems, removeFromCart, clearCart } = useCart();
  const [slipFile, setSlipFile] = useState(null);
  const [isPaymentComplete, setIsPaymentComplete] = useState(false);
  const [email, setEmail] = useState(""); // Add email state
  
  

  const promptPayNumber = "0656206808"; // เบอร์ PromptPay

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);

  const promptPayQR = generatePayload(promptPayNumber, { amount: totalPrice });


  const handleSlipUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSlipFile(file); // เก็บไฟล์สลิปที่อัปโหลด
    }
  };

const handlePayment = async () => {
  if (!slipFile) {
    alert("กรุณาแนบสลิปก่อนทำการชำระเงิน");
    return;
  }

  const formData = new FormData();
  formData.append("email", email);
  formData.append("slip", slipFile);
  formData.append("items", JSON.stringify(cartItems));

  try {
    const res = await fetch("/api/send-email", {
      method: "POST",
      body: formData,
    });

    // ตรวจสอบว่า API ส่งข้อมูลกลับมาเป็น JSON หรือไม่
    const result = await res.json(); // รับข้อมูลในรูปแบบ JSON
    if (res.ok) {
      alert("📧 ส่งอีเมลยืนยันแล้ว!");
      setIsPaymentComplete(true);
    } else {
      alert(result.message || "❌ ส่งอีเมลไม่สำเร็จ");
    }
  } catch (err) {
    console.error("Error during payment:", err);
    alert("เกิดข้อผิดพลาดขณะส่งอีเมล");
  }
};

  return (
    <div className="pageContainer">
      <div className="contentContainer">

        <div className="cartLayout">
          <div className="itemsContainer">
            {cartItems.length === 0 ? (
              <div className="emptyCart">
                <p className="emptyCartText">Your cart is empty.</p>
                <Link href="/services" className="shopButton">
                  View all products
                </Link>
              </div>
            ) : (
              <div className="itemsList">
                <div className="itemsHeader">
                  <div className="headerItem">Products</div>
                  <div className="headerItem">Left in stock</div>
                  <div className="headerItem">Quantity</div>
                  <div className="headerItem">Price</div>
                  <div className="headerItem"></div>
                </div>

                {cartItems.map((item, index) => (
                  <div key={index} className="cartItem">
                    <div className="itemDetail">
                      <Image src={item.image} alt={item.name} width={80} height={80} />
                    </div>
                    <div>
                      <h3 className="itemName">{item.name}</h3>
                      <p className="itemPrice">{item.price} Baht</p>
                      
                    </div>
                    
                    <div className="itemQuantity">
                      <div className="quantityControl">
                        
                        <span className="quantityValue">1</span>
                        
                      </div>
                    </div>
                    <div className="itemTotal">
                      <span> {item.price} Baht</span>
                    </div>
                    <div className="itemRemove">
                      <button className="removeButton" onClick={() => removeFromCart(index)}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="summaryContainer">
            <div className="summaryCard">
              <h2 className="summaryTitle">Order Summary</h2>
              
              <div className="summaryDetails">
                <div className="summaryRow">
                  <span>Total product price</span>
                  <span>{totalPrice.toFixed(2)} Baht</span>
                </div>
                
                <div className="totalRow">
                  <span>Total price</span>
                  <span>{totalPrice.toFixed(2)} Baht</span>
                </div>
                <div className="qrSection">
        <QRCodeCanvas value={promptPayQR} size={200} />
        <p className="qrText">Scan to make a payment via PromptPay</p>
      </div>

      <div className="slipUploadSection">
        <input type="file" onChange={handleSlipUpload} />
        {slipFile && <p className="slipFileName">Attach a file.: {slipFile.name}</p>}
      </div>
      
              </div>
               {!isPaymentComplete && (
              <button className="checkoutButton"onClick={handlePayment}
          disabled={!slipFile}>
                Confirm order
              </button>)}
              
              <p className="continueShopping">
                or <Link href="/product" className="continueLink">Choose additional products</Link>
              </p>
            </div>
            
            <div className="policyCard">
              <h3 className="policyTitle">Order conveniently and confidently</h3>
              <ul className="policyList">
                <li className="policyItem">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Returns accepted if the product does not match the order</span>
                </li>
                <li className="policyItem">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Fast delivery service with our staff.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}