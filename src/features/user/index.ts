import { useAtom } from "jotai"
import { atomWithStorage } from "jotai/utils"
import { User } from "~/features/api/clients/entities"

interface UserCache {
  [host: string]: {
    [username: string]: User
  }
}

const userCacheAtom = atomWithStorage<UserCache>("minsk::user::cache", {})

export const useUserCache = () => {
  const [userCache, setUserCache] = useAtom(userCacheAtom)

  const updateUserCache = (user: User) => {
    if (!user.host) return
    setUserCache({
      ...userCache,
      [user.host]: {
        ...userCache[user.host],
        [user.username]: user,
      },
    })
  }

  return {
    userCache,
    updateUserCache,
  }
}
