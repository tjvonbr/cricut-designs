'use client'

import { cn } from '@/lib/utils'
import { ChatPanel } from '@/components/chat-panel'
import { EmptyScreen } from '@/components/empty-screen'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

export interface ChatProps extends React.ComponentProps<'div'> {
  initialMessages?: any[]
  id?: string
  userId?: string
  missingKeys: string[]
}

export function Chat({ id, className, userId, missingKeys }: ChatProps) {
  const [imageUrl, setImageUrl] = useState('')
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    missingKeys.map(key => {
      toast.error(`Missing ${key} environment variable!`)
    })
  }, [missingKeys])

  async function generateImage() {
    setIsLoading(true)

    const response = await fetch('http://localhost:3000/api/image', {
      method: 'POST',
      body: JSON.stringify({
        prompt: input
      })
    })

    console.log(response)

    setIsLoading(false)

    if (!response.ok) {
      toast.error('Something went wrong.')
    }

    const json = await response.json()
    console.log(json)
  }

  return (
    <div className="group w-full overflow-auto pl-0 peer-[[data-state=open]]:lg:pl-[250px] peer-[[data-state=open]]:xl:pl-[300px]">
      <div className={cn('pb-[200px] pt-4 md:pt-10', className)}>
        {!imageUrl && !isLoading && <EmptyScreen />}
        {isLoading && <LoadingBlock />}
        <div className="h-px w-full" />
      </div>
      <ChatPanel
        input={input}
        setInput={setInput}
        generateImage={generateImage}
      />
    </div>
  )
}

function LoadingBlock() {
  return (
    <div className="w-[200px] rounded-md bg-muted text-black text-semibold">
      Loading...
    </div>
  )
}
