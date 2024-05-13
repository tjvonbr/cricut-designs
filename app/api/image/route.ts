import { auth } from '@clerk/nextjs/server'
import { nanoid } from 'ai'
import { NextApiResponse } from 'next'
import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/server/prisma'
import { PutObjectCommand } from '@aws-sdk/client-s3'
import { s3 } from '@/server/s3'
const DALL_E = 'https://api.openai.com/v1/images/generations'

export async function POST(req: NextRequest, res: NextApiResponse) {
  const { userId } = auth()
  console.log(userId)

  if (!userId) {
    return NextResponse.json(
      { error: 'User is not authenticated.' },
      { status: 401 }
    )
  }

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

    const id = nanoid()
    const buffer = Buffer.from(json.data[0].b64_json, 'base64')
    const params = {
      Bucket: 'cricut-designs',
      Key: `${userId}:${id}`,
      Body: buffer,
      ContentType: 'image/jpeg'
    }

    const command = new PutObjectCommand(params)
    const s3obj = await s3.send(command)

    console.log(s3obj)

    const newImage = await prisma.image.create({
      data: {
        id,
        prompt: body.prompt,
        url: `https://cricut-designs.s3.us-east-2.amazonaws.com/${userId}:${id}`,
        path: `/image/${id}`,
        sharePath: `/share/${id}`,
        userId: userId
      }
    })

    if (!newImage) {
      return NextResponse.json(
        { error: 'Could not create a new image.' },
        { status: 400 }
      )
    }

    return NextResponse.json({ url: newImage.url }, { status: 200 })
  } catch (error: any) {
    console.log(error)
    return NextResponse.json(
      { message: error.message, type: 'Internal server error' },
      { status: 500 }
    )
  }
}
