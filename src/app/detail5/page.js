"use client";

import dynamic from "next/dynamic"
import {useRouter} from 'next/navigation'
import ProductCard from "../components/ProductCard";
import ClientWrapper from "../ClientWrapper";
import Image from "next/image";

const Gallery = dynamic(
    () => import('./components/gallery.client'),
    {
        ssr: false,
        loading: () => <p>Loading gallery...</p>
    }
)
const products = [
  { id: 1, name: "Skincare", price: 1290,image: "/Skincare.jpg", },
  
];

export default function Detail(){
    const router = useRouter()
    const massageDetail = () => {
      router.push('/detail2')
    }
    const facialDetail = () => {
      router.push('/detail')
    }
    const chiropracticDetail = () => {
      router.push('/detail3')
    }

    return(
        <main>
            <section className="hero" style={{height: "20vh"}}></section>

            <section className="info">
                <h1>Skincare</h1>
                <div className="detail">
                    <Gallery />
                    
                    <div className="detail-text">
                        <h2>Price : 1,290 baht</h2>
<h3>Detail</h3>
<p>Key benefits:</p>
<ul>
    <li>- Deep Hydration & Skin Nourishment</li>
    <li>- Brightening & Even Skin Tone</li>
    <li>- Acne & Blemish Reduction</li>
    <li>- Anti-Aging & Fine Line Treatment</li>
    <li>- Improved Skin Texture & Radiance</li>
    <li>- Soothing & Rejuvenating Experience</li>
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
                        <Image src="/Facial.jpg" alt="Perfume" width={400} height={267} style={{width: "100%", height: "auto"}} />
                    </div>
                    <div className="card1">
                        <div className="overlay">
                            <h2 style={{fontSize: "20px"}}><u>Chiropractic</u></h2>
                            <button onClick={chiropracticDetail}>Detail</button>
                        </div>  
                        <Image src="/chiropractic.jpg" alt="Chiropractic" width={400} height={267} style={{width: "100%", height: "auto"}} />
                    </div>     
                    <div className="card1" style={{marginRight: "3vw"}}>
                        <div className="overlay">
                            <h2 style={{fontSize: "20px"}}><u>Massage</u></h2>
                            <button onClick={massageDetail}>Detail</button>
                        </div>  
                        <Image src="/massage.jpg" alt="Massage" width={400} height={267} style={{width: "100%", height: "auto"}} />
                    </div> 
                    <h1>YOU<br></br>MAY<br></br>LIKE</h1>         
                </div>          
                <hr style={{width: "80%",margin: "0 auto 0.7vh", border: "1px solid #263401"}} />
            </section>

            <section className="more-detail" style={{minHeight:"75vh"}}>
                <div className="l-content" style={{minHeight:"25vh"}}>
                    <Image src="/thai.jpg" width={500} height={333} alt="Thai massage" style={{width: "500px", height: "auto"}} />
                    <div className="txt">
                        <h2>Post-Injury Rehabilitation</h2>
                        <p>Personalized treatment plans for recovery from muscle strains,<br></br>
                        joint injuries, or surgery — restoring strength, movement, and confidence.</p>
                    </div>    
                </div>
                <div className="l-content" style={{minHeight:"25vh", backgroundColor:"rgba(0, 0, 0, 0.05)"}}>
                    <div className="txt">
                        <h2>Posture & Movement Correction</h2>
                        <p>Detailed assessment of your body’s movement patterns<br></br>
                        to identify imbalances and improve posture — helping prevent future injuries.</p>
                        <Image src="/aroma.jpg" width={500} height={333} alt="Aroma therapy" style={{width: "500px", height: "auto"}} />
                        <Image src="/aroma.jpg" width={500} height={333} alt="Aroma therapy" style={{width: "500px", height: "auto"}} />
                    </div>
                </div>
                <div className="l-content" style={{minHeight:"25vh"}}>
                <Image src="/head.jpg" width={500} height={333} alt="Head massage" style={{width: "500px", height: "auto"}} />
                    <div className="txt">
                        <h2>Therapeutic Exercise Programs</h2>
                        <p>Guided stretching and strengthening exercises tailored to your needs,<br></br>
                        improving flexibility, balance, and core stability over time.</p>
                    </div>    
                </div>
            </section>
        </main>
    )
}