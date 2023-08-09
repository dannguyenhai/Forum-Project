import { FC, PropsWithChildren } from 'react'

type ModalProps = {
  isShow?: boolean
  onClose?: () => void
}

export const Modal: FC<ModalProps & PropsWithChildren> = ({ isShow, children, onClose }) => {
  if (isShow)
    return (
      <div
        className='fixed inset-0 left-0 top-0 z-[1000] flex h-full w-full items-center justify-center scale-1  overflow-hidden bg-black bg-opacity-25 '
        tabIndex={-1}
        role='dialog'
        aria-hidden='true'
        onClick={() => {
          onClose?.()
        }}
      >
        <div
          onClick={(e) => {
            e.stopPropagation() 
          }}
        >
          {children}
        </div>
      </div>
    )
  return null
}
