type UserLite = {
  id: string
  name: string
  username: string
  host: string | null
  avatarUrl: string
  avatarBlurhash: string
  onlineStatus: "online" | "active" | "offline" | "unknown"
  emojis: {
    name: string
    url: string
  }[]
}

type UserDetail = UserLite & {
  isAdmin: boolean
  isModerator: boolean
  isBot: boolean
  isCat: boolean
}

export type User = UserLite | UserDetail
export type UserStatus = UserLite["onlineStatus"]
