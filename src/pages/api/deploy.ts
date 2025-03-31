// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { axiosConfig } from "@/lib/api/axios.config";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const response = await axiosConfig.post("/deploy_instance", req.body);
    return res.status(response.status).json(response.data);
  } catch (error: any) {
    console.error("Proxy Error:", error?.response?.data || error?.message);

    return res.status(error?.response?.status || 500).json({
      error: error?.response?.data || "Internal Server Error",
    });
  }
}
