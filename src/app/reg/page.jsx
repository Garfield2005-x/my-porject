'use client';

import { useEffect } from 'react';
import React, { useState } from 'react'
import Link from 'next/link'


function regpage() {
        const [username, setUsername] = useState('');
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [confirmPassword, setConfirmPassword] = useState('');
        const [error, setError] = useState('');
        const [success, setSuccess] = useState('');
       
        
    
        const handleSubmit = async (e) => {
            e.preventDefault();
    
    
            if (!username || !email || !password || !confirmPassword) {
                alert('Please fill in all fields');
                return;
            }
            if (password !== confirmPassword) {
                alert('Passwords do not match');
                return;
            }
    
            try{
    
                const resCheckUser = await fetch('http://localhost:3000/api/checkUser', {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email })
                })
    
                const { user } = await resCheckUser.json();
    
                if (user) {
                    alert('User already exists');
                    return;
                }
    
                const res = await fetch('http://localhost:3000/api/register', {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ 
                        username, email, password 
                    })
                })
                
                if (res.ok){
                    const form = e.target;
                    alert('');
                    alert('User registration successful');
                    form.reset();
                } else {
                    console.log("User registration failed");
                }   
    
            } catch (error) {
                alert('An error occurred', error);
            }
        }



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
                        <p>Create your account for exclusive spa benefits</p>
                    </div>

                    <form className="register-form" id="registrationForm" onSubmit={handleSubmit}>
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="lastName">Username</label>
                                <input type="text" id="firstName" name="firstName" placeholder="Spa" onChange={(e) => setUsername(e.target.value)}/>
                            </div>
                            {/* <div className="form-group">
                                <label htmlFor="lastName">Last Name</label>
                                <input type="text" id="lastName" name="lastName" placeholder="Lover"/>
                            </div> */}
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email Address</label>
                            <input type="email" id="email" name="email" placeholder="relax@example.com" onChange={(e) => setEmail(e.target.value)}/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="phone">Phone Number</label>
                            <input type="tel" id="phone" name="phone" placeholder="081-234-5678"/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" name="password" placeholder="••••••••" onChange={(e) => setPassword(e.target.value)}/>
                            <p className="password-hint">At least 8 characters</p>
                        </div>

                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input type="password" id="confirmPassword" name="confirmPassword" placeholder="••••••••" onChange={(e) => setConfirmPassword(e.target.value)}/>
                        </div>

                        <div className="terms-group">
                            <input type="checkbox" id="terms" name="terms" required/>
                            <label htmlFor="terms">
                            I agree to Rub Sa Baii's <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
                            </label>
                        </div>
                        <div className="sub">
                            <button type="submit" className="submit-btn" style={{marginBottom: "1vh"}}>
                                Create Account
                            </button>
                            <a href="/lop">Already have account? Go back to login.</a>
                        </div>    
                    </form>
                </div>
            </section>
        </main>
    </div>
  )
}

export default regpage
