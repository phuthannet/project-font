"use client";
import { useState } from "react";
import {actionModelStableDiffusion} from './action';
import { Button, Input, Image, Spin } from "antd";
import './page.css'

export default function Page() {
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [imageUrl, setImageData] = useState(null); // เปลี่ยน imageData เป็น imageUrl

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await actionModelStableDiffusion(inputText);
      setImageData(data);
    } catch (error) {
      console.error('Error fetching data: client', error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleSubmit = () => {
    fetchData();
  };

  const handleSaveImageToDevice = () => {
    if (imageUrl) { // ตรวจสอบว่ามี URL ของรูปภาพหรือไม่
      const link = document.createElement('a');
      link.href = imageUrl;
      link.download = 'result_image.jpg';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleShareImageUrl = () => {
    if (imageUrl) { // ตรวจสอบว่ามี URL ของรูปภาพหรือไม่
      alert('Share URL: ' + imageUrl);
    }
  };

  return (
    <div className="card">
      <header >
        <h1>stable-diffusion-v1-5 </h1>
        <div className="card-text">
          <Input type="text" value={inputText} onChange={handleInputChange} placeholder="Enter text" />
          <Button onClick={handleSubmit}>Submit</Button>
        </div>
        <div className="gen-image">
          {loading && <Spin></Spin>}
          {error && <p>Error: {error.message}</p>}
          {imageUrl && <Image src={imageUrl} width={"max-width"} height={"max-height"} />} {/* ใช้ <img> แทน Image จาก Next.js */}
        </div>
        <div className="Button-saveimage">
          <Button onClick={handleSaveImageToDevice}>Save Image</Button>
          <Button onClick={handleShareImageUrl}>Share Image URL</Button>
        </div>
      </header>
    </div>
  );
}
