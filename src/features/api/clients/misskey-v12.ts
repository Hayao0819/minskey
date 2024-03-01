import MisskeyLatestClient from "./misskey-latest"


// // Misskey v12固有のコードを書くClass
export default class MisskeyV12Client extends MisskeyLatestClient  {
  async fetchEmojiUrl(name: string): Promise<string | null> {
    const { emojis } = await super.post("meta")
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return emojis?.find?.((e: any) => e.name == name)?.url ?? null
  }
}
