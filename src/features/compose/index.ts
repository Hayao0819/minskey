import { atom, useAtom } from "jotai"
import { atomWithStorage } from "jotai/utils"
import { Endpoints } from "misskey-js"

type Visibility = Endpoints["notes/create"]["req"]["visibility"]

const noteDialogAtom = atom(false)
const noteLastVisibilityAtom = atomWithStorage<Visibility>("minsk::note::visibility", "public")

export function useComposeNoteDialog() {
  return useAtom(noteDialogAtom)
}

export function useComposeNoteLastVisibility() {
  return useAtom(noteLastVisibilityAtom)
}
