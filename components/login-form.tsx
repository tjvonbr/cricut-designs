'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { authenticate } from '@/app/sign-in/actions'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { IconSpinner } from './ui/icons'
import { cn, getMessageFromCode } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { buttonVariants } from './ui/button'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { userAuthSchema } from '@/lib/validations/auth'
import { z } from 'zod'

interface LoginFormProps extends React.HTMLAttributes<HTMLDivElement> {}

type FormData = z.infer<typeof userAuthSchema>

export default function LoginForm({ className, ...props }: LoginFormProps) {
  const {
    register,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(userAuthSchema)
  })
  const router = useRouter()

  const [result, dispatch] = useFormState(authenticate, undefined)

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
          <button className={cn(buttonVariants())}>Sign In</button>
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
    </div>
  )
}
