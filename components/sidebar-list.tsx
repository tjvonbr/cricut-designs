import { clearChats, getImages } from '@/app/actions'
import { ClearHistory } from '@/components/clear-history'
import { SidebarItems } from '@/components/sidebar-items'
import { ThemeToggle } from '@/components/theme-toggle'
import { cache } from 'react'

interface SidebarListProps {
  userId?: string
  children?: React.ReactNode
}

const loadImages = cache(async (userId?: string) => {
  return await getImages(userId)
})

export async function SidebarList({ userId }: SidebarListProps) {
  const images = await loadImages(userId)

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="flex-1 overflow-auto">
        {images?.length ? (
          <div className="space-y-2 px-2">
            <SidebarItems images={images} />
          </div>
        ) : (
          <div className="p-8 text-center">
            <p className="text-sm text-muted-foreground">No image history</p>
          </div>
        )}
      </div>
      <div className="flex items-center justify-between p-4">
        <ThemeToggle />
        <ClearHistory clearChats={clearChats} isEnabled={images?.length > 0} />
      </div>
    </div>
  )
}
