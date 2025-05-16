'use client'

import { useEffect } from 'react'
import React from 'react'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import Image from "next/image"

function lopage({ children }) {

        const [username, setUsername] = React.useState('');
        const [password, setPassword] = React.useState('');
        const [error, setError] = React.useState('');
        const router = useRouter();
        
       const handleSubmit = async (e) => {
    e.preventDefault();
    

    try {
        const res = await signIn('credentials', {
            username,
            password,
            redirect: false,
            callbackUrl: '/l',
        });

        // แสดงข้อมูลข้อผิดพลาดจากผลลัพธ์การล็อกอิน
        if (res.error) {
            console.error("Login failed:", res.error); // แสดงข้อผิดพลาดใน console
            alert(`เกิดข้อผิดพลาดในการเข้าสู่ระบบ: ${res.error}`); // แสดงข้อผิดพลาดให้ผู้ใช้ทราบ
            return;
        }

        // หากเข้าสู่ระบบสำเร็จ
        router.push('/l'); // เปลี่ยนหน้าไปที่ /l

    } catch (error) {
        console.log("Error occurred during login:", error);  // แสดงข้อผิดพลาดที่เกิดจาก network หรือ server
        alert("เกิดข้อผิดพลาดระหว่างการล็อกอิน"); // แสดงข้อผิดพลาดให้ผู้ใช้ทราบ
    }
};



  
  useEffect(() => {
    import('./login.css'); // ✅ โหลดเฉพาะหน้านี้แบบ global
  }, []);
  return (
    <div>
      <main>
            <section className="regis">
                <div className="register-card">
                    <div className="register-header">
                        <h1>Welcome to Rub Sa Baii</h1>
                        <p>Connect your account for exclusive spa benefits</p>
                    </div>

                    <form className="register-form" id="registrationForm"  onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="email">Username</label>
                            <input type="text" id="email" name="email" placeholder="Username" onChange={(e) => setUsername(e.target.value)}/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" name="password" placeholder="••••••••" onChange={(e) => setPassword(e.target.value)}/>
                        </div>

                        <div className="sub">
                            <button type="submit" className="submit-btn" style={{marginBottom: "1vh"}}>
                                Log In
                            </button>
                            <a href="/reg">First time? Create your account.</a>
                        </div>    
                    </form>
                </div>
            </section>
        </main>
    </div>
  )
}

export default lopage
