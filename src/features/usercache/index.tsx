import { useAtom } from "jotai"
import { atomWithStorage } from "jotai/utils"
import { User } from "misskey-js/built/entities"

export const userCacheAtom = atomWithStorage<User[]>("minsk::accounts::cache", [])

export function useUserCache() {
  const [userCache, setUserCache] = useAtom(userCacheAtom)

  const addUserCache = (user: User) => {
    setUserCache(prev => {
      if (prev.some(u => u.id === user.id)) return prev
      return [user, ...prev]
    })
  }

  return { userCache, addUserCache }
}
