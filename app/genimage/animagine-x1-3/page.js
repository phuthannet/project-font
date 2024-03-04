"use client";
import { useState } from "react";
import {actionModelanimagine , UploadPost} from './action';
import { Button, Input, Image, Spin,Modal } from "antd";
import axios from "axios";
import './page.css'


export default function Page() {
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [imageUrl, setImageData] = useState(null); // เปลี่ยน imageData เป็น imageUrl

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await actionModelanimagine(inputText);
      setImageData(data);
    } catch (error) {
      console.error('Error fetching data: Client', error);
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

  const [visible, setVisible] = useState(false);
  const [inputTextModal, setInputTextModal] = useState('');
  const [inputDescription, setInputDescription] = useState('');


  const handleOk = async () => {
    // ทำอะไรก็ตามที่คุณต้องการเมื่อคลิกปุ่ม OK
    const data = await UploadPost(inputTextModal , inputDescription)
    setInputTextModal(data)
    setVisible(false);
  };

  const handleCancel = () => {
    // ทำอะไรก็ตามที่คุณต้องการเมื่อคลิกปุ่ม Cancel
    console.log('Clicked Cancel');
    setVisible(false);
  };

    const [image, setImage] = useState(null);
  
    const handleImageChange = (e) => {
      const file = e.target.files[0];
      setImage(file);
    };
    const handleSubmittest = async (e) => {
      e.preventDefault();
    
      const formData = new FormData();
      formData.append('files.image', image);
      formData.append('data',JSON.stringify({
        prompt:inputTextModal,
        description: inputDescription
      }));
      console.log(image)

    
      try {
        const response = await axios.post('https://favorable-dawn-95d99e7a24.strapiapp.com/api/histories', formData, {
          headers: {
            'Content-Type': 'multipart/form-data', // Specify content type as multipart/form-data
          },
        });
    
        if (response.status === 200) {
          alert('Image uploaded successfully!');
        } else {
          alert('Failed to upload image!');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Failed to upload imagecatch!');
      }
    };

  return (
    <div className="card">
      <header >
        <h1>ANIMAGINE XL 3.0</h1>
        <div className="card-text">
          <Input type="text" value={inputText} onChange={handleInputChange} placeholder="Enter text" />
          <Button onClick={handleSubmit}>Submit</Button>
        </div>
        <div className="gen-image">
          {loading && <Spin></Spin>}
          {error && <p>Error: {error.message}</p>}
          {!loading && !imageUrl && !error && <p>Please enter some text and click submit.</p>}
          {imageUrl && <Image src={imageUrl} width={"max-width"} height={"max-height"} />} {/* ใช้ <img> แทน Image จาก Next.js */}
        </div>
        <div className="Button-saveimage">
          <Button onClick={handleSaveImageToDevice}>Save Image</Button>
          <Button onClick={handleShareImageUrl}>Share Image URL</Button>
        </div>     
      </header>
      
      <Button type="primary" onClick={() => setVisible(true)}>
        post
      </Button>
      <Modal
        title="My Modal"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Enter your text:</p>
      </Modal>
      <div>
      <h2>Upload Image</h2>
      <Input value={inputTextModal} onChange={(e) => setInputTextModal(e.target.value)} />
        <Input value={inputDescription} onChange={(e) => setInputDescription(e.target.value)} />
      <form onSubmit={handleSubmittest}>
        <input type="file" onChange={handleImageChange} accept="image/*" required />
        {/* <input type="text" value={username} onChange={handleUsernameChange} placeholder="Enter username" required /> */}
        <button type="submit">Upload</button>
      </form>
    </div>
    
    </div>
    
  );
}
