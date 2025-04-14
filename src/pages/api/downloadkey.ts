import type { NextApiRequest, NextApiResponse } from "next";
import { pipeline } from 'stream';
import { promisify } from 'util';

const streamPipeline = promisify(pipeline);

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>,
) {
  const { gateway_name } = req.query;
  const filename =gateway_name as string
  if (!gateway_name) {
    return res.status(400).json({ error: 'Missing gateway_name' });
  }

  const remoteUrl = `http://98.84.138.196:3005/api/v1/download_key?gateway_name=${encodeURIComponent(filename)}`;

  try {
    const response:any= await fetch(remoteUrl);

    if (!response.ok) {
      return res.status(response.status).send('Failed to download file');
    }

    res.setHeader(
      'Content-Disposition',
      response.headers.get('content-disposition') || 'attachment; filename="Check-key.pem"'
    );
    res.setHeader('Content-Type', 'application/x-pem-file');

    await streamPipeline(response?.body, res);
  } catch (err:any) {
    console.error('Download proxy error:', err);
    res.status(500).json({ error: 'Download proxy failed', message: err.message });
  }
}
