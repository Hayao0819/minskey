import { entities } from "misskey-js"
import Image from "next/image"

// Todo: まともなTLのデザイン
export default function NotePreview({ note, renote }: { note: entities.Note; renote?: entities.Note }) {
  if (!note.text) {
    if (note.renote) {
      //return Note({ note: note.renote, renote: note })
      return <NotePreview note={note.renote} renote={note} />
    }
  }

  return (
    <div className="m-4 p-2">
      {renote ? <p className="text-sm">Renoted by {renote.user.name} </p> : <></>}
      <div className="flex items-center">
        <Image src={note.user.avatarUrl} width={48} height={48} alt="Icon" />
        <p className="pl-5">{note.user.name}</p>
      </div>
      <p className="">{note.text}</p>
      {note.files.length != 0 ? (
        <div className="flex ">
          {note.files.map(item => {
            if (item.type.startsWith("image/")) {
              return <Image src={item.url} width={125} height={125} alt="File" key={item.id} />
            } else {
              return (
                <>
                  {item.url}({item.type})
                </>
              )
            }
          })}
        </div>
      ) : (
        <></>
      )}
    </div>
  )
}
