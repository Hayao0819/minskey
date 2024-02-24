import { atom, useAtom, useAtomValue } from "jotai"
import { atomWithStorage } from "jotai/utils"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

import { useClient } from "~/features/common"
import { useAPI } from "../api"
import { useUserCache } from "../usercache"

type ArrElement<ArrType> = ArrType extends readonly (infer ElementType)[] ? ElementType : never

////////////////////////////////////////////////////////////////
//  atoms
////////////////////////////////////////////////////////////////

type Account = {
  proto: string
  host: string
  token: string
}

// ログインしているアカウントの一覧
export const accountsAtom = atomWithStorage<Account[] | null>("minsk::accounts", null)

// 現在のアカウントのindex
export const currentAccountIndexAtom = atomWithStorage<number | null>("minsk::accounts::currentAccount", null)

type AuthSession = {
  id: string
  proto: string
  host: string
}

export const authSessionAtom = atomWithStorage<AuthSession | null>("minsk::auth::session", null)

export const authErrorAtom = atom<string | null>(null)

////////////////////////////////////////////////////////////////
//  hooks
////////////////////////////////////////////////////////////////

export function useAuth() {
  const [currentAccount, setCurrentAccount] = useAtom(currentAccountIndexAtom)
  const [authSession, setAuthSession] = useAtom(authSessionAtom)
  const [authError, setAuthError] = useAtom(authErrorAtom)
  const { accounts, removeAccount } = useAccounts()
  const api = useAPI()
  const { addUserCache } = useUserCache()

  const setAuth = ({
    account,
    session,
    error,
  }: {
    account?: typeof currentAccount
    session?: typeof authSession
    error?: typeof authError
  }) => {
    // 各値を更新
    if (account !== undefined) setCurrentAccount(account)
    if (session !== undefined) setAuthSession(session)
    if (error !== undefined) setAuthError(error)

    api?.request("i").then(res => {
      addUserCache(res)
    })
  }

  const logout = () => {
    if (currentAccount !== null) {
      removeAccount(currentAccount)
    }
    if (accounts && accounts.length >= 1) {
      console.log("複垢logout")

      setAuth({ account: 0, session: null, error: null })
    } else {
      console.log("単垢logout")
      setCurrentAccount(null)
      setAuth({ account: null, session: null, error: null })
    }
  }

  return {
    account: accounts ? accounts[currentAccount ?? 0] : null,
    session: authSession,
    error: authError,
    setAuth,
    logout,
  }
}

export function useAccounts(login?: boolean) {
  const [accounts, setAccounts] = useAtom(accountsAtom)

  const router = useRouter()
  const client = useClient()

  useEffect(() => {
    if (login && client && !accounts) router.push("/")
  }, [login, client, accounts, router])

  const addAccount = (account: ArrElement<NonNullable<typeof accounts>>) => {
    if (accounts) setAccounts([...accounts, account])
    else setAccounts([account])
  }

  const removeAccount = (index: number) => {
    if (accounts) {
      const newAccounts = accounts.filter((_, i) => i !== index)
      setAccounts(newAccounts)
    }
  }

  return {
    accounts,
    addAccount,
    removeAccount,
  }
}

// 現在のアカウントを取得する
export const useLogin = (login?: boolean) => {
  const currentAccount = useAtomValue(currentAccountIndexAtom)
  const accounts = useAtomValue(accountsAtom)
  const client = useClient()
  const router = useRouter()
  useEffect(() => {
    if (login && client && (!accounts || currentAccount == null)) router.push("/")
  }, [login, client, currentAccount, router, accounts])
  return accounts ? accounts[currentAccount ?? 0] : null
}
