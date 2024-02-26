"use client"

import { Suspense, createContext, useContext } from "react"
import { CustomEmojiProps } from "react-mfm"
import { EmojiImg, FetchEmoji, useEmojiCache } from "../api/emoji"

export const CustomEmojiCtx = createContext<{ host: string | null }>({ host: null })

export default function CustomEmoji({ name }: CustomEmojiProps) {
  const { cache } = useEmojiCache()

  const { host } = useContext(CustomEmojiCtx)
  if (!host) return <EmojiImg name={name} />
  return (
    <Suspense fallback={<EmojiImg name={name} url={cache[host]?.[name] ?? undefined} />}>
      <FetchEmoji name={name} host={host} />
    </Suspense>
  )
}
