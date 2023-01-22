import { entities } from "misskey-js"

export function statusEmoji(status: entities.UserLite["onlineStatus"]) {
  switch (status) {
    case "online":
      return "🟢"
    case "active":
      return "🟡"
    case "offline":
      return "💤"
    case "unknown":
      return "❓"
  }
}
