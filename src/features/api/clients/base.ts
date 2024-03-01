export default abstract class BaseClient {
  host: string
  token?: string

  constructor(host: string, token?: string) {
    this.host = host
    this.token = token
  }

  get(path: string, opts?: RequestInit) {
    return fetch(this.host + "/api/" + path, opts).then(res => res.json())
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  post(path: string, opts?: RequestInit, body?: Object) {
    return fetch(this.host + "/api/" + path, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: body ? JSON.stringify(body) : "{}",
      ...opts,
    }).then(res => res.json())
  }

  abstract fetchEmojiUrl(name: string): Promise<string | null>
}
