'use client'

import { useFormState } from 'react-dom'
import { signup } from '@/app/sign-up/[[...sign-up]]/actions'
import { useEffect } from 'react'
import { toast } from 'sonner'
import { cn, getMessageFromCode } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { userAuthSchema } from '@/lib/validations/auth'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { buttonVariants } from './ui/button'
import { IconGoogle } from './ui/icons'

interface SignupFormProps extends React.HTMLAttributes<HTMLDivElement> {}

type FormData = z.infer<typeof userAuthSchema>

export default function SignupForm({ className, ...props }: SignupFormProps) {
  const {
    register,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(userAuthSchema)
  })
  const router = useRouter()

  const [result, dispatch] = useFormState(signup, undefined)

  useEffect(() => {
    if (result) {
      if (result.type === 'error') {
        toast.error(getMessageFromCode(result.resultCode))
      } else {
        toast.success(getMessageFromCode(result.resultCode))
        router.refresh()
      }
    }
  }, [result, router])

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <form action={dispatch}>
        <div className="grid gap-4">
          <div className="grid gap-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="name@example.com"
                type="email"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                {...register('email')}
              />
              {errors?.email && (
                <p className="px-1 text-xs text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="email">Password</Label>
              <Input
                id="password"
                type="password"
                autoCapitalize="none"
                autoComplete="password"
                autoCorrect="off"
                {...register('password')}
              />
              {errors?.password && (
                <p className="px-1 text-xs text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>
          <button className={cn(buttonVariants())}>Sign up</button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <button
        type="button"
        className={cn(buttonVariants({ variant: 'outline' }))}
      >
        <IconGoogle className="mr-2 size-4" />
        Google
      </button>
    </div>
  )
}
