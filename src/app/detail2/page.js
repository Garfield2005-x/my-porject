"use client";

import dynamic from "next/dynamic"
import {useRouter} from 'next/navigation'
import ProductCard from "../components/ProductCard";
import ClientWrapper from "../ClientWrapper";

const Gallery = dynamic(
    () => import('./components/gallery.client'),
    {
        ssr: false,
        loading: () => <p>Loading gallery...</p>
    }
)
const products = [
  { id: 1, name: "Massge", price: 1000,image: "/massage.jpg", },
  
];

export default function detail(){
    const router = useRouter()
    const facialDetail = () => {
      router.push('/detail')
    }
    const chiropracticDetail = () => {
      router.push('/detail3')
    }
    const physiotherapyDetail = () => {
      router.push('/detail4')
    }

    return(
        <main>
            <section className="hero" style={{height: "20vh"}}></section>

            <section className="info">
                <h1>Massage</h1>
                <div className="detail">
                    <Gallery />
                    
                    <div className="detail-text">
                        <h2>Price : x,xxx baht</h2>
                        <h3>Detail</h3>
                        <p>Key benefits:</p>
                        <ul>
                            <li>- Stress Relief & Mental Clarity</li>
                            <li>- Muscle Pain & Tension Release</li>
                            <li>- Better Sleep Quality</li>
                            <li>- Skin Nourishment & Glow</li>
                            <li>- Improved Circulation</li>
                            <li>- Support for Pregnancy & Recovery</li>
                        </ul>
                        {products.map((p) => (
                                  <ProductCard key={p.id} product={p} />
                                ))}
                    </div>
                </div>
            </section>

            <section className="similar" style={{minHeight: "20vh"}}>
                <hr style={{width: "80%",margin: "0 auto 0.7vh", border: "1px solid #263401"}} />
                <div className="grid" style={{gap:"1.5vw",minWidth: "80vw", margin: "3vh 0"}}>
                    <div className="card1">
                        <div className="overlay">
                            <h2 style={{fontSize: "20px"}}><u>Facial</u></h2>
                            <button onClick={facialDetail}>Detail</button>
                        </div>  
                        <img src={'/Facial.jpg'}></img>
                    </div>
                    <div className="card1">
                        <div className="overlay">
                            <h2 style={{fontSize: "20px"}}><u>Physiotherapy</u></h2>
                            <button onClick={physiotherapyDetail}>Detail</button>
                        </div>  
                        <img src={'/physiotherapy.jpg'}></img>
                    </div>     
                    <div className="card1" style={{marginRight: "3vw"}}>
                        <div className="overlay">
                            <h2 style={{fontSize: "20px"}}><u>Chiropractic</u></h2>
                            <button onClick={chiropracticDetail}>Detail</button>
                        </div>  
                        <img src={'/chiropractic.jpg'}></img>
                    </div> 
                    <h1>YOU<br></br>MAY<br></br>LIKE</h1>         
                </div>          
                <hr style={{width: "80%",margin: "0 auto 0.7vh", border: "1px solid #263401"}} />
            </section>

            <section className="more-detail" style={{minHeight:"75vh"}}>
                <div className="l-content" style={{minHeight:"25vh"}}>
                    <img src={'/thai.jpg'} style={{width: "500px"}}></img>
                    <div className="txt">
                        <h2>Traditional Thai Massage</h2>
                        <p>A time-honored healing technique using acupressure, gentle stretching,<br></br>
                        and rhythmic compressions. Perfect for improving flexibility and energy flow</p>
                    </div>    
                </div>
                <div className="l-content" style={{minHeight:"25vh", backgroundColor:"rgba(0, 0, 0, 0.05)"}}>
                    <div className="txt">
                        <h2>Aroma Oil Massage</h2>
                        <p>Relaxing strokes blended with pure essential oils to soothe the senses<br></br>
                        and melt away stress. Ideal for those seeking deep relaxation and emotional calm.</p>
                    </div>    
                    <img src={'/aroma.jpg'} style={{width: "500px"}}></img>
                </div>
                <div className="l-content" style={{minHeight:"25vh"}}>
                <img src={'/head.jpg'} style={{width: "500px"}}></img>
                    <div className="txt">
                        <h2>Sleep-Inducing Head & Shoulder Massage</h2>
                        <p>A gentle massage focused on the scalp, neck, and shoulders <br></br>
                        to release built-up tension and calm the nervous system — perfect before bedtime.</p>
                    </div>    
                </div>
            </section>
        </main>
    )
}