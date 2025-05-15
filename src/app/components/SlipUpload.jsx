// components/SlipUpload.tsx\
"use client";
import React, { useState } from 'react';

export default function SlipUpload() {
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append('slip', file); // ชื่อต้องตรงกับ model field ใน Django

    const res = await fetch('http://127.0.0.1:8000/api/upload-slip/', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
      <button type="submit">Upload</button>
    </form>
  );
}
