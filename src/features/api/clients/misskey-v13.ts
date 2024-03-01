import MisskeyLatestClient from "./misskey-latest"

// Misskey v13固有のコードを書くClass
export default class MisskeyV13Client extends MisskeyLatestClient {
  async fetchEmojiUrl(name: string): Promise<string | null> {
    const { emojis } = await super.get("emojis")

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return emojis?.find?.((e: any) => e.name == name)?.url ?? null
  }
}
