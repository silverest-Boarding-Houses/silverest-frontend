import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { slug } = req.query;

  // Ensure slug is an array
  if (!Array.isArray(slug)) {
    return res.status(400).json({ error: 'Invalid slug' });
  }

  const [path, id] = slug;
  const baseUrl = 'http://localhost:3000/agents'; // Your NestJS API URL
  const url = id ? `${baseUrl}/${id}` : baseUrl;

  try {
    if (req.method === 'GET') {
      const response = await axios.get(url);
      res.status(200).json(response.data);
    } else if (req.method === 'POST') {
      const response = await axios.post(url, req.body);
      res.status(201).json(response.data);
    } else if (req.method === 'PATCH') {
      const response = await axios.patch(url, req.body);
      res.status(200).json(response.data);
    } else if (req.method === 'DELETE') {
      await axios.delete(url);
      res.status(204).end();
    } else {
      res.setHeader('Allow', ['GET', 'POST', 'PATCH', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
