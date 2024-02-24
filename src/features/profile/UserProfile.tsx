"use client"

import * as Tooltip from "@radix-ui/react-tooltip"

import { UserDetailed } from "misskey-js/built/entities"
import { useEffect, useState } from "react"
import { useAPI } from "../api"

export default function UserProfile({ id }: { id?: string }) {
  // unko
  //const user = { avatarUrl: null, onlineStatus: null }

  const api = useAPI()
  const [detailed, setDetailed] = useState<UserDetailed | null>(null)
  //const onlineStatus = detailed?.onlineStatus || "unknown"

  console.log(detailed)

  /*  色々メモ
      - users/search-by-username-and-hostは型アサーション必須
      - なぜか自分のインスタンスのユーザー情報が取れない
      - detailed?.avatarUrlをそのままjsxで使うとハイドレーションエラー起こす(なんでかは知らん)
      - Todo: このへんのロジックは別のフックに切り出す
  */
  useEffect(() => {
    const userName = [id?.split("@")[1], id?.split("@")[2]]

    ;(async function () {
      if (!userName[0] || !userName[1]) return
      if (!api || !id) return
      const res: UserDetailed = (await api.request("users/search-by-username-and-host", {
        username: userName[0],
        host: userName[1],
      })) as UserDetailed
      setDetailed(res)
    })()
  }, [api, id])

  return (
    <>
      <p>{id}</p>
      <div className="relative h-fit w-fit rounded-full border-4 bg-white p-2">
        <div className="h-36 w-36 rounded-full border-4">{/*<UserIcon src={detailed?.avatarUrl} />*/}</div>
        <div className="absolute bottom-1.5 right-1.5 flex h-11 w-11 rounded-full border-4 bg-white">
          <Tooltip.Provider>
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <span className="m-auto cursor-default text-3xl leading-none">{/*statusEmoji(onlineStatus)*/}</span>
              </Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Content className="rounded-md border bg-white px-1 font-inter text-sm text-neutral-700 opacity-80 drop-shadow-sm">
                  {/*onlineStatus */}
                </Tooltip.Content>
              </Tooltip.Portal>
            </Tooltip.Root>
          </Tooltip.Provider>
        </div>
      </div>
    </>
  )
}
