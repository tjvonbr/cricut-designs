import { auth } from '@clerk/nextjs/server'
import { SignUp } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

export const metadata = {
  title: 'Create an account',
  description: 'Create an account to get started.'
}

export default async function SignupPage() {
  const { userId } = auth()

  if (userId) {
    redirect('/')
  }

  return (
    <div className="container grid size-screen flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="hidden h-full bg-muted lg:block" />
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <SignUp path="/sign-up" />
        </div>
      </div>
    </div>
  )
}
