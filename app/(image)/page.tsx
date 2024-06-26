import { nanoid } from '@/lib/utils'
import { Chat } from '@/components/chat'
import { auth } from '@clerk/nextjs/server'
import { getMissingKeys } from '@/app/actions'
import { redirect } from 'next/navigation'

export default async function IndexPage() {
  const id = nanoid()
  const { userId } = auth()

  if (!userId) {
    redirect('/sign-in')
  }

  const missingKeys = await getMissingKeys()

  return <Chat id={id} userId={userId} missingKeys={missingKeys} />
}
