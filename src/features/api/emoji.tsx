import { atom, useAtom } from "jotai"
import { use } from "react"

type EmojiCache = { [host: string]: { [name: string]: string | null } }
const cacheAtom = atom<EmojiCache>({})

// Hooks
export const useEmojiCache = () => {
  const [cache, setCache] = useAtom(cacheAtom)
  const addCache = (host: string, name: string, url: string | null) => {
    setCache({
      ...cache,
      [host]: { ...cache[host], [name]: url },
    })
  }
  const hasCache = (host: string, name: string) => {
    return host in cache && name in cache[host]
  }
  return { cache, addCache, hasCache }
}

// API
async function fetchUrl(name: string, host: string): Promise<string | null> {
  console.log("fetching emoji", name, host)
  const json = await fetch(`https://${host}/api/emoji?name=${name}`)
    .then(res => res.json())
    .catch(e => (console.warn(e), {}))

  if (!json.url) {
    console.log(`Emoji not found: ${name}`)
    return null
  }
  return json.url
}

// Components
export const EmojiImg = ({ name, url }: { name: string; url?: string }) =>
  !url ? `:${name}:` : <img src={url} alt={name} className="mfm-customEmoji" />

export function FetchEmoji({ name, host }: { name: string; host: string }) {
  const { cache, addCache, hasCache } = useEmojiCache()

  if (hasCache(host, name)) {
    const url = cache[host][name]

    return <EmojiImg name={name} url={url ?? undefined} />
  } else {
    const url = use(fetchUrl(name, host))
    addCache(host, name, url)
    return <EmojiImg name={name} url={url ?? undefined} />
  }
}
