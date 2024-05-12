'use client'

import { AnimatePresence, motion } from 'framer-motion'

import { removeChat, shareChat } from '@/app/actions'

import { SidebarActions } from '@/components/sidebar-actions'
import { SidebarItem } from '@/components/sidebar-item'
import { Image } from '@prisma/client'

interface SidebarItemsProps {
  images?: Image[]
}

export function SidebarItems({ images }: SidebarItemsProps) {
  if (!images?.length) return null

  return (
    <AnimatePresence>
      {images.map(
        (image, index) =>
          image && (
            <motion.div
              key={image?.id}
              exit={{
                opacity: 0,
                height: 0
              }}
            >
              <SidebarItem index={index} image={image}>
                <SidebarActions
                  image={image}
                  removeChat={removeChat}
                  shareChat={shareChat}
                />
              </SidebarItem>
            </motion.div>
          )
      )}
    </AnimatePresence>
  )
}
