"use server";
import axios from "axios";
export async function upload(prompt, model) {
  // try {
  //   console.log("prompt", prompt);
  //   console.log("model", model);
  //   let response;
  //   if (model === "1") {
  //     response = await axios.post(
  //       "https://api-inference.huggingface.co/models/cagliostrolab/animagine-xl-3.0",
  //       { inputs: prompt },
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: "Bearer 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",
  //         },
  //         responseType: "arraybuffer",
  //       }
  //     );
  //   } else {
  //     response = await axios.post(
  //       "https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5",
  //       { inputs: prompt },
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: "Bearer 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",
  //         },
  //         responseType: "arraybuffer",
  //       }
  //     );
  //   }
  //   const imageUrl = URL.createObjectURL(
  //     new Blob([response.data], { type: "image/jpeg" })
  //   );
  //   return imageUrl;
  // } catch (error) {
  //   console.log(error);
  // }
}
