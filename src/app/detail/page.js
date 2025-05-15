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
  { id: 1, name: "FACIAL SPA", price: 1000,image: "/facial4.jpg", },
  
];

export default function Detail(){
    const router = useRouter()
    const massageDetail = () => {
      router.push('/detail2')
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
                <h1>FACIAL SPA</h1>
                <div className="detail">
                    <Gallery />
                    
                    <div className="detail-text">
                        <h2>Price : x,xxx baht</h2>
                        <h3>Detail</h3>
                        <p>Key benefits:</p>
                        <ul>
                            <li>- Deeply cleanses and detoxifies the skin</li>
                            <li>- Removes dead skin cells and promotes cell renewal</li>
                            <li>- Improves skin tone, texture, and hydration</li>
                            <li>- Reduces signs of aging, such as fine lines and wrinkles</li>
                            <li>- Helps treat acne, clogged pores, and dull complexion</li>
                            <li>- Provides relaxation and stress relief</li>
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
                            <h2 style={{fontSize: "20px"}}><u>Massage</u></h2>
                            <button onClick={massageDetail}>Detail</button>
                        </div>  
                        <img src={'/massage.jpg'}></img>
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
                    <img src={'/herbal.jpg'} style={{width: "500px"}}></img>
                    <div className="txt">
                        <h2>Herbal Detox Facial</h2>
                        <p>A gentle cleanse using Thai herbal extracts to remove impurities and<br></br>
                        detoxify your skin.Perfect for those exposed to pollution or daily stress.</p>
                    </div>    
                </div>
                <div className="l-content" style={{minHeight:"25vh", backgroundColor:"rgba(0, 0, 0, 0.05)"}}>
                    <div className="txt">
                        <h2>Deep Hydration Facial</h2>
                        <p>Infused with hyaluronic acid and aloe vera, this facial revives dry, <br></br>
                        tired skin, restoring moisture balance and leaving a glowing finish.</p>
                    </div>    
                    <img src={'/hydrate.jpg'} style={{width: "500px"}}></img>
                </div>
                <div className="l-content" style={{minHeight:"25vh"}}>
                <img src={'/age.jpg'} style={{width: "500px"}}></img>
                    <div className="txt">
                        <h2>Anti-Aging Gold Therapy</h2>
                        <p>A luxurious treatment featuring 24K gold-infused products to lift, <br></br>
                        tighten, and smooth fine lines. Ideal for mature skin seeking a youthful glow.</p>
                    </div>    
                </div>
            </section>
        </main>
    )
}