import Link from "next/link";
import Image from "next/image";
import styles from './cart.style.css';

export default function CartPage() {
  const cartItems = [
    {
      id: 1,
      name: "RSB scented candle (rose)",
      price: 799,
      left: 14,
      image: "/candle.jpg",
      quantity: 1,
    },
    {
      id: 2,
      name: "Rub Sa Baii perfume (Aquatic)",
      price: 1599,
      left: 20,
      image: "/perfume.png",
      quantity: 1,
    },
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

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

                {cartItems.map((item) => (
                  <div key={item.id} className="cartItem">
                    <div className="itemDetail">
                      <Image src={item.image} alt={item.name} width={80} height={80} />
                    </div>
                    <div>
                      <h3 className="itemName">{item.name}</h3>
                      <p className="itemPrice">{item.price.toLocaleString()} Baht</p>
                    </div>
                    <div className="itemLeft">
                      <span>{item.left} pcs</span>
                    </div>
                    <div className="itemQuantity">
                      <div className="quantityControl">
                        <button className="quantityButton">-</button>
                        <span className="quantityValue">{item.quantity}</span>
                        <button className="quantityButton">+</button>
                      </div>
                    </div>
                    <div className="itemTotal">
                      <span>{(item.price * item.quantity).toLocaleString()} Baht</span>
                    </div>
                    <div className="itemRemove">
                      <button className="removeButton">
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
                  <span>{subtotal.toLocaleString()} Baht</span>
                </div>
                
                {/* <div className="summaryRow">
                  <span>Discount</span>
                  <span className={styles.discount}>0 Baht</span>
                </div> */}
                
                <div className="totalRow">
                  <span>Total price</span>
                  <span>{subtotal.toLocaleString()} Baht</span>
                </div>
              </div>
              
              <button className="checkoutButton">
                Confirm order
              </button>
              
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