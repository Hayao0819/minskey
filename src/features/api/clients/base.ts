import { Endpoints } from "./type"

export default class BaseClient {
  host: string
  token?: string

  constructor(host: string, token?: string) {
    this.host = host
    this.token = token
  }

  get(path: keyof Endpoints, opts?: Endpoints[typeof path]) {
    return fetch(this.host + "/api/" + path + new URLSearchParams(opts["req"]).toString()).then(
      res => res.json(),
    )
  }

  post(path: string, opts?: RequestInit, body?: Object) {
    return fetch(this.host + "/api/" + path, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: body ? JSON.stringify(body) : "{}",
      ...opts,
    }).then(res => res.json())
  }
}
