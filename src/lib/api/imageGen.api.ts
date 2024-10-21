import { Txt2imgInput,GenerationOutput } from "./types";
import axios, { AxiosResponse } from 'axios';

export class SDAPI {
    public async txt2img(prompt: string): Promise<GenerationOutput> {
        const url = 'https://dca-broadcaster-mainnet.livepeer.fun/text-to-image';
        const text= prompt?.length>0?prompt :'Livepeer AI'
        const body:Txt2imgInput = {
            model_id:process.env.NEXT_MODEL_ID as string,
            prompt:text,
            guidance_scale: 2,
            width: 1024 ,
            height: 512,
            safety_check:true,
            num_inference_steps: 6,
            num_images_per_prompt: 2,
          };
        try {
              const response = await axios.post(url,body, {
                headers: {
                  'Authorization': `Bearer <token>`, 
                  'Content-Type': 'application/json',
                },
                timeout: 40000
              });
              const data = response.data;     
              if (data && data.images) {
                return {
                  id: data.id,
                  status: data.status,
                  outputs: data.images.map((item: { url: string, nsfw: boolean, seed?: number }, index: number) => ({
                    id: `${data.id}:${index}`,
                    url: item.url,
                    nsfw: item.nsfw,
                    seed: item.seed
                  }))
                };
              } else {
                throw new Error('Empty data');
              }    
            }catch(error){
                let errorMessage = 'Unknown error';
                if (axios.isAxiosError(error) && error.response) {
                const data = error.response.data;
                errorMessage = data.error?.message || '';
                }
                throw new Error(`Provider Error: ${errorMessage}`);
        
           }
      
       }
 }