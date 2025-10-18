import axios from "axios";
import { config } from "../config/env";



export const sendByEmailJs = async (email: string, options: Record<string, any>, templateId: string) => {
  const dataToSend = {
    service_id: config.emailJsServiceId,
    template_id: templateId,
    user_id: config.emailJsPublicKey,
    accessToken: config.emailJsPrivateKey,
    template_params: {
      email,
      ...options
    },
  }

  console.log(dataToSend)
  
  try {
    const response = await axios.post(config.emailJsUrl, dataToSend)
    // console.log('Email sent successfully:', response.data);
  } catch(error){
    console.error('Failed to send email:', error)
  }
}