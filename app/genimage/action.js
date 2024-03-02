import axios from 'axios';

export default async function actionModelStableDiffusion(inputText) {
  try {
    const response = await axios.post(
      'https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5',
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
    return imageUrl; // ส่งกลับ URL ของรูปภาพ
  } catch (error) {
    throw new Error('Error fetching data:', error);
  }
}


