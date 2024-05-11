import { auth } from '@/auth'
import SignupForm from '@/components/signup-form'
import { IconLogo } from '@/components/ui/icons'
import { Session } from '@/lib/types'
import { redirect } from 'next/navigation'

export const metadata = {
  title: 'Create an account',
  description: 'Create an account to get started.'
}

export default async function SignupPage() {
  const session = (await auth()) as Session

  if (session) {
    redirect('/')
  }

  return (
    <div className="container grid h-screen w-screen flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="hidden h-full bg-muted lg:block" />
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <IconLogo className="mx-auto size-6" />
            <h1 className="text-2xl font-semibold tracking-tight">
              Create an account
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your email and password below to create your account
            </p>
          </div>
          <SignupForm />
        </div>
      </div>
    </div>
  )
}
