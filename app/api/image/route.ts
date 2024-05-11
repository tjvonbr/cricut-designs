import { NextApiRequest, NextApiResponse } from 'next'
const QSTASH = `https://qstash.upstash.io/v1/publish/`
const DALL_E = 'https://api.openai.com/v1/images/generations'
const VERCEL_URL = 'https://dalle-2-jade.vercel.app'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { prompt } = req.query
  try {
    const response = await fetch(`${DALL_E}`, {
      method: 'POST',
      headers: {
        Authorization: (`Bearer ` + process.env.OPENAI_API_KEY) as string,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        prompt,
        n: 1,
        size: '1024x1024',
        response_format: 'b64_json'
      })
    })
    const json = await response.json()
    console.log(json)
    return res.status(202).json({ id: json.messageId })
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: error.message, type: 'Internal server error' })
  }
}
