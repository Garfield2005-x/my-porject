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
  { id: 1, name: "FACIAL SPA", price: 1000 },
  
];

export default function detail(){
    const router = useRouter()
    const massageDetail = () => {
      router.push('/detail2')
    }
    const facialDetail = () => {
      router.push('/detail')
    }
    const physiotherapyDetail = () => {
      router.push('/detail4')
    }

    return(
        <main>
            <section className="hero" style={{height: "20vh"}}></section>

            <section className="info">
                <h1>Chiropractic</h1>
                <div className="detail">
                    <Gallery />
                    
                    <div className="detail-text">
                        <h2>Price : x,xxx baht</h2>
                        <h3>Detail</h3>
                        <p>Key benefits:</p>
                        <ul>
                            <li>- Spinal Alignment & Posture Correction</li>
                            <li>- Pain Relief Without Medication</li>
                            <li>- Improved Nervous System Function</li>
                            <li>- Increased Range of Motion & Flexibility</li>
                            <li>- Relief from Headaches & Migraines</li>
                            <li>- Better Balance & Body Awareness</li>
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
                            <h2 style={{fontSize: "20px"}}><u>Massage</u></h2>
                            <button onClick={massageDetail}>Detail</button>
                        </div>  
                        <img src={'/massage.jpg'}></img>
                    </div> 
                    <h1>YOU<br></br>MAY<br></br>LIKE</h1>         
                </div>          
                <hr style={{width: "80%",margin: "0 auto 0.7vh", border: "1px solid #263401"}} />
            </section>

            <section className="more-detail" style={{minHeight:"75vh"}}>
                <div className="l-content" style={{minHeight:"25vh"}}>
                    <img src={'/spinal.jpg'} style={{width: "500px"}}></img>
                    <div className="txt">
                        <h2>Spinal Adjustment Therapy</h2>
                        <p>A time-honored healing technique using acupressure, gentle stretching,<br></br>
                        and rhythmic compressions. Perfect for improving flexibility and energy flow</p>
                    </div>    
                </div>
                <div className="l-content" style={{minHeight:"25vh", backgroundColor:"rgba(0, 0, 0, 0.05)"}}>
                    <div className="txt">
                        <h2>Joint Mobilization & Alignment</h2>
                        <p>Beyond the spine, we also work with shoulder, hip, and knee joints<br></br>
                        to restore smooth movement and reduce chronic tension or misalignment.</p>
                    </div>    
                    <img src={'/chiropractic3.jpg'} style={{width: "500px"}}></img>
                </div>
                <div className="l-content" style={{minHeight:"25vh"}}>
                <img src={'/chiropractic5.jpg'} style={{width: "500px"}}></img>
                    <div className="txt">
                        <h2>Neck & Cervical Care</h2>
                        <p>Targeted adjustments and soft tissue work to reduce tension, ease stiffness,<br></br>
                        and help with headaches, tech neck, and neck strain.</p>
                    </div>    
                </div>
            </section>
        </main>
    )
}