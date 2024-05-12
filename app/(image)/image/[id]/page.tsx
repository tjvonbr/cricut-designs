import { type Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'
import { auth } from '@clerk/nextjs/server'
import { getChat, getImage, getMissingKeys } from '@/app/actions'
import { Chat } from '@/components/chat'

export interface ChatPageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({
  params
}: ChatPageProps): Promise<Metadata> {
  const { userId } = auth()

  if (!userId) {
    return {}
  }

  const chat = await getChat(params.id, userId)
  return {
    title: chat?.title.toString().slice(0, 50) ?? 'Chat'
  }
}

export default async function ChatPage({ params }: ChatPageProps) {
  const { userId } = auth()
  const missingKeys = await getMissingKeys()

  if (!userId) {
    redirect(`/login?next=/chat/${params.id}`)
  }

  const image = await getImage(params.id, userId)

  if (!image) {
    redirect('/')
  }

  if (image?.userId !== userId) {
    notFound()
  }

  return (
    <Chat
      id={image.id}
      userId={userId}
      initialMessages={[]}
      missingKeys={missingKeys}
    />
  )
}
