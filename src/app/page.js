'use client'
import React, { useState } from 'react';
import {useRouter} from 'next/navigation'
import ProductCard from "./components/ProductCard";
import ClientWrapper from "./ClientWrapper";


export default function Home() {
  const products = [
  { id: 1, name: "skincare", price: 359,image: "/skincare.jpg", },
  { id: 2, name: "perfume", price: 199,image: "/perfume.jpg", },
  { id: 3, name: "candle", price: 452,image: "/candle.jpg", },
  { id: 4, name: "other", price: 337,image: "/other.jpg", },
  
];
const [isOpen, setIsOpen] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const router = useRouter()
  const product = () => {
    router.push('/product')
  }
  const facialDetail = () => {
    router.push('/detail')
  }
  const massageDetail = () => {
    router.push('/detail2')
  }
  const chiropracticDetail = () => {
    router.push('/detail3')
  }
  const physiotherapyDetail = () => {
    router.push('/detail4')
  }
  const skincare = () => {
    router.push('/detail5')
  }
  const perfume = () => {
    router.push('/detail6')
  }
  const candle = () => {
    router.push('/detail7')
  }
  const other = () => {
    router.push('/detail8')
  }

  return (
  <main>
      <section className="hero">
        <div className="hero-content">
          <h1 style={{fontFamily: "Sacramento", fontSize: "clamp(64px,8vw,150px)", letterSpacing: "2px", lineHeight: "1"}}>
            Rub Sa Baii</h1>
          <hr style={{width: "40vw",margin: "0 auto 0.7vh", border: "1px solid #FE7F49"}} />
          <p style = {{fontSize: "clamp(6px,3vw,50px)"}}>100% Natural for your health</p>
          <div className="btn">
            <button onClick={() => document.getElementById('1')?.scrollIntoView({ behavior: 'smooth' })}>Reserve Now</button>
            <button onClick={() => document.getElementById('2')?.scrollIntoView({ behavior: 'smooth' })}>View all Products</button>
          </div>
        </div>
      </section>

      <section id="1" className="why">
        <div className="text" style={{marginRight:"5vw"}}>
          <h1 style={{fontSize: "2.5vh", fontFamily: '"Raleway", sans-serif'}}>Why Rub-Sa-Baii ?</h1>
          <p style={{fontSize: "1.2vh"}}>Our spa stands out as a premier wellness center,<br></br>
          offering a unique blend of relaxation, rejuvenation <br></br>
          healing techniques. Here’s why you should choose </p>
        </div>
        <div className="grid-res">
          <div className="content" style={{backgroundImage: "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('/therapist.jpg')"}}>
            <h2 style={{fontSize:"1.5vh", marginTop:"5px"}}>Expert Therapists</h2>
          </div>
          <div className="content" style={{backgroundImage: "linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('/product.jpg')"}}>
            <h2 style={{fontSize:"1.5vh", marginTop:"5px"}}>Premium Quality<br></br>Products</h2>
          </div>
          <div className="content" style={{backgroundImage: "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('/afford.jpg')"}}>
            <h2 style={{fontSize:"1.5vh", marginTop:"5px"}}>Affordable Luxury</h2>
          </div>
        </div>
      </section>

      <section className="services">
        <h1 style={{fontSize:"2vh", letterSpacing:"1vh", fontFamily: '"Raleway", sans-serif', marginBottom: "0.5vh"}}>Our hot services</h1>
        <div className="grid">
          <div className="card1">
            <div className="overlay">
              <h2 style={{fontSize: "20px"}}><u>Facial</u></h2>
              <p>helps improve blood circulation, promote lymphatic drainage, relax facial muscles, and enhance the overall appearance of the skin.</p>
              <button onClick={facialDetail}>Detail</button>
            </div>  
            <img src={'/Facial.jpg'}></img>
          </div>
          <div className="card1">
           <div className="overlay">
              <h2 style={{fontSize: "20px"}}><u>Massage</u></h2>
              <p>a therapeutic technique that involves the manipulation of muscles , tendons , and soft tissues of the body</p>
              <button onClick={massageDetail}>Detail</button>
            </div>  
            <img src={'/massage.jpg'}></img>
          </div>
          <div className="card1">
            <div className="overlay">
              <h2 style={{fontSize: "20px"}}><u>Chiropractic</u></h2>
              <p>focused on diagnosing, treating, and preventing mechanical disorders of the musculoskeletal system—especially the spine. It emphasizes </p>
              <button onClick={chiropracticDetail}>Detail</button>
            </div>  
            <img src={'/chiropractic.jpg'}></img>
          </div>
          <div className="card1">
            <div className="overlay">
              <h2 style={{fontSize: "20px"}}><u>Physiotherapy</u></h2>
              <p>aka physical therapy, is a healthcare profession focused on restoring movement and function when someone is affected by injury, illness, or disability.</p>
              <button onClick={physiotherapyDetail}>Detail</button>
            </div>  
            <img src={'/physiotherapy.jpg'}></img>
          </div>
        </div>
      </section>
  
      <section id="2" className="product">
        <h1 style={{fontSize:"2vh", letterSpacing:"1vh", fontFamily: '"Raleway", sans-serif', marginBottom: "0.5vh"}}><b>Products Recommend</b></h1>
        <div className="product-grid">
          <div className="box" style={{gridArea: "skincare"}}>
            <h1 className="h" style={{ lineHeight: "3vh"}}><b>Skincare</b></h1>
           <button className="p-btn" onClick={skincare}>Buy now</button>
            
            <img src={'/skincare.jpg'}></img>
          </div>
          <div className="box" style={{gridArea: "perfume"}}>
            <h1 className="h" style={{lineHeight: "3vh"}}><b>Perfume</b></h1>
            <button className="p-btn" onClick={perfume}>Buy now</button>
            <img src={'/perfume.png'}></img>
          </div>
          <div className="box" style={{gridArea: "candle"}}>
            <h1 className="h" style={{lineHeight: "3vh"}}><b>Scented<br></br>Candle</b></h1>
            <button className="p-btn" onClick={candle}>Buy now</button>
            <img src={'/candle.jpg'}></img>
          </div>
          <div className="box" style={{gridArea: "other"}}>
            <h1 className="h" style={{lineHeight: "3vh"}}><b>Other</b></h1>
            <button className="p-btn" onClick={other}>Buy now</button>
            <img src={'/other.jpg'}></img>
          </div>
        </div>
      </section>

  </main>
  );
}
