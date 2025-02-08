// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import axios from 'axios'



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
    console.log(req.body)
    const url=req.body.url
      try{
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Basic " + btoa("admin:admin"),
            },
        });
        const data = await response.json();
  
        res.status(200).json(data);

      }catch(e){
        console.log(e)
      }
}
