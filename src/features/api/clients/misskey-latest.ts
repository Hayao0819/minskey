import BaseClient from "./base"

// 最新のMisskeyのコードを書くClass
export default class MisskeyLatestClient extends BaseClient {
  //type: "misskey" = "misskey"

  async fetchEmojiUrl(name: string): Promise<string | null> {
    const json = await this.get(`emoji?name=${name}`)
    return json.url ?? null
  }
}
