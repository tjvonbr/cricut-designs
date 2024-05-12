import * as React from 'react'
import Link from 'next/link'

import { auth } from '@clerk/nextjs/server'
import { Button } from '@/components/ui/button'
import { IconLogo, IconNextChat } from '@/components/ui/icons'
import { SidebarMobile } from './sidebar-mobile'
import { SidebarToggle } from './sidebar-toggle'
import { ChatHistory } from './chat-history'
import { UserButton } from '@clerk/nextjs'

async function UserOrLogin() {
  const { userId } = auth()

  return (
    <div className="w-full flex justify-between items-center">
      {userId ? (
        <>
          <SidebarMobile>
            <ChatHistory userId={userId} />
          </SidebarMobile>
          <SidebarToggle />
        </>
      ) : (
        <Link href="/new" rel="nofollow">
          <IconLogo className="size-6 mr-2 dark:hidden" />
          <IconNextChat className="hidden size-6 mr-2 dark:block" />
        </Link>
      )}
      <div className="flex items-center">
        {userId ? (
          <UserButton />
        ) : (
          <Button variant="link" asChild className="-ml-2">
            <Link href="/sign-in">Login</Link>
          </Button>
        )}
      </div>
    </div>
  )
}

export function Header() {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between w-full h-16 px-4 border-b shrink-0 bg-gradient-to-b from-background/10 via-background/50 to-background/80 backdrop-blur-xl">
      <div className="w-full flex items-center">
        <React.Suspense fallback={<div className="flex-1 overflow-auto" />}>
          <UserOrLogin />
        </React.Suspense>
      </div>
    </header>
  )
}
