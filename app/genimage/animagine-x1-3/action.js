"use client";
import axios from 'axios';

export  async function actionModelanimagine(inputText) {
  try {
    const response = await axios.post(
      'https://api-inference.huggingface.co/models/cagliostrolab/animagine-xl-3.0',
      { inputs: inputText },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer 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',
        },
        responseType: 'arraybuffer', // กำหนดให้ responseType เป็น 'arraybuffer'
      }
      
    );
    const imageUrl = URL.createObjectURL(new Blob([response.data], { type: 'image/jpeg' }));
    console.log(imageUrl)
    return imageUrl; // ส่งกลับ URL ของรูปภาพ
  } catch (error) {
    throw new Error('Error fetching data:Server', error);
  }
}



export async function UploadPost(inputTextModal ,inputDescription ){
  try {
    const response = await axios.post(`https://favorable-dawn-95d99e7a24.strapiapp.com/api/histories`,
    {
      data: {
        prompt : inputTextModal,
        description : inputDescription,
      }
    },{
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzA5NTM3MTc3LCJleHAiOjE3MTIxMjkxNzd9.VOUqjCDilfLOIIAP7U2OgrkA4LM0gWjtECaFo_UiJ3A',
      },
    }
  );
  console.log(response)
    return response
  } catch (error) {
    console.log(error)
    throw new Error('Error UploadPost Server', error);

  }
  
}

