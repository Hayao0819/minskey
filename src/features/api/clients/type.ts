import { entities as v12, Endpoints as v12Endpoints } from "misskey-js-12"
import { entities as latest, Endpoints as latestEndpoints } from "misskey-js-latest"

export type User = v12.User & latest.User

export type Endpoints = v12Endpoints & latestEndpoints
