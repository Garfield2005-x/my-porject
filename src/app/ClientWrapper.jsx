"use client"
import { createContext, useContext, useState } from "react";
import { signOut } from "next-auth/react"; // นำเข้า signOut จาก next-auth
import { useRouter } from "next/navigation"; 
import Link from "next/link";
import { SessionProvider } from "next-auth/react";



// -------------------- Context --------------------
const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems((prev) => [...prev, product]);
  };

  const removeFromCart = (indexToRemove) => {
    setCartItems((prev) => prev.filter((_, i) => i !== indexToRemove));
  };

  const clearCart = () => {
    setCartItems([]);  // รีเซ็ตตะกร้าให้ว่าง
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

// -------------------- Client Wrapper --------------------
export default function ClientWrapper({ children }) {
  const [showPopup, setShowPopup] = useState(false);
  const router = useRouter(); // ใช้ Next.js Router สำหรับการนำทาง

  return (
    
    <CartProvider>
      <Navbar showPopup={showPopup} setShowPopup={setShowPopup} router={router} />
      {children}
    </CartProvider>
  );
}

// -------------------- Navbar with Cart --------------------
function Navbar({ showPopup, setShowPopup, router }) {
  const { cartItems } = useCart();

  const handleCheckout = () => {
    router.push("/cartpage"); // ไปที่หน้า checkout เมื่อคลิก
  };

  return (
   <div>
    <nav>
          <img src="/logo.png" className="logo" alt="Logo" />
          <ul>
            
            <ul className="icon">
             <li><button className="flex items-center hover:text-gray-200" onClick={() => setShowPopup(!showPopup)}
        style={{ marginLeft: "20px" }}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <span className="flex absolute -mt-5 ml-4">
                        <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-pink-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500">
                        </span>
                      </span>
                    </button></li>
              
                
                   
                    <li><Link  className="flex items-center hover:text-gray-200" href="/reg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hover:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </Link></li>
                
              
                 
                
            </ul>
          </ul>
          
        </nav>
      
               
                
          
      {showPopup && (
        <div
  style={{
    position: "absolute",
    top: "60px",
    right: "20px",
    background: "#F4F9E8",
    border: "1px solid #D4E7C5",
    borderRadius: "10px",
    padding: "15px 20px",
    zIndex: 1000,
    width: "320px",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.15)",
    fontFamily: "Raleway, sans-serif",
    color: "#2E4A21"
  }}
>
  <h4 style={{ marginBottom: "12px", fontSize: "18px", fontWeight: "600" }}>
    🛒 Items in your cart
  </h4>

  {cartItems.length === 0 ? (
    <p style={{ fontSize: "14px", color: "#6D8A4C" }}>
      No items in your cart.
    </p>
          ) : (
            <ul
  style={{
    paddingLeft: 0,
    listStyle: "none",
    marginTop: "10px",
  }}
>
  {cartItems.map((item, index) => (
    <li
      key={index}
      style={{
        borderBottom: "1px solid #E0E0E0",
        padding: "8px 0",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontSize: "14px",
        color: "#333",
      }}
    >
      <div style={{ fontWeight: "500" }}>{item.name}</div>
      <div style={{ color: "#5C8D3A" }}>{item.price.toLocaleString()} ฿</div>
    </li>
  ))}
</ul>
)}

{cartItems.length > 0 && (
  <button
    style={{
      marginTop: "15px",
      padding: "12px",
      backgroundColor: "#FE7F49",
      color: "#fff",
      border: "none",
      borderRadius: "5px",
      width: "100%",
      fontSize: "15px",
      fontWeight: "bold",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
    }}
    onClick={handleCheckout}
    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#FE7F49")}
    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#263401")}
  >
    Checkout
  </button>
)}

        </div>
      )}
      
    </div>
    
  );
}
