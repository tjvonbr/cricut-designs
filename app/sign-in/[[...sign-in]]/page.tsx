import { auth } from '@clerk/nextjs/server'
import { IconLogo } from '@/components/ui/icons'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { SignIn } from '@clerk/nextjs'

export default async function LoginPage() {
  const { userId } = auth()

  if (userId) {
    redirect('/')
  }

  return (
    <div className="flex flex-col h-screen w-screen items-center justify-center">
      <SignIn path="/sign-in" />
    </div>
  )
}
