import { NextApiResponse } from 'next'
import { NextRequest } from 'next/server'
const DALL_E = 'https://api.openai.com/v1/images/generations'

export async function POST(req: NextRequest, res: NextApiResponse) {
  const body = await req.json()

  try {
    const response = await fetch(DALL_E, {
      method: 'POST',
      headers: {
        Authorization: (`Bearer ` + process.env.OPENAI_API_KEY) as string,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        prompt: body.prompt,
        n: 1,
        size: '1024x1024',
        response_format: 'b64_json'
      })
    })

    const json = await response.json()
    return res.status(202).json({ id: json.messageId })
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: error.message, type: 'Internal server error' })
  }
}
