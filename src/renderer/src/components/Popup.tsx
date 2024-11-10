import { ReactNode } from 'react'

interface ChildProps {
  id: string
  children: ReactNode
}

function Popup({ id, children }: ChildProps) {
  return (
    <dialog className="modal" id={id}>
      <div className="modal-box  p-0 m-0 bg-transparent">
        <div className="modal-action m-6">{children}</div>
      </div>
    </dialog>
  )
}

export { Popup }
