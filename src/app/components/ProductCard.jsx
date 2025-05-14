"use client";
import { useCart } from "../ClientWrapper";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    
       
      <button onClick={() => addToCart(product)}>Reserve Now</button>
      
    
     
    
  );
}
