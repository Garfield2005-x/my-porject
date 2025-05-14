"use client";
import { useState } from "react";

export default function UploadSlip({ onUpload }) {
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    const selected = e.target.files[0];
    setFile(selected);
    onUpload(selected);
  };

  return (
    <div style={{ marginTop: "10px" }}>
      <label>
        แนบสลิปการโอน:
        <input type="file" accept="image/*" onChange={handleChange} required />
      </label>
    </div>
  );
}
