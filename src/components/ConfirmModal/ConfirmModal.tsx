import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { Modal } from '../Modal'
import { Button, ButtonType } from '../Button/Button'

type ConfirmModalProps = {
  isVisible: boolean
  content?: string
  onClose?: () => void
  onConfirm: () => void
}

export function ConfirmModal({ isVisible, content, onClose, onConfirm }: ConfirmModalProps) {
  const onHanleClose = () => {
    onClose?.()
  }
  return (
    <Modal isShow={isVisible}>
      <div role='status' className='flex h-[240px] w-[400px] flex-col bg-white'>
        <div className='flex flex-1 flex-col p-[10px]'>
          <div
            onClick={onHanleClose}
            className='flex h-5 w-5 cursor-pointer items-center justify-center self-end border'
          >
            <FontAwesomeIcon fontSize={16} icon={faXmark} />
          </div>
          <div className='flex h-full flex-col items-center justify-center p-4'>{content}</div>
        </div>
        <div className='flex'>
          <Button onClick={onHanleClose} className='flex-1 items-center justify-center' buttonType={ButtonType.Secodnary} title='취소' />
          <Button onClick={onConfirm} className='flex-1 items-center justify-center' title='확인' />
        </div>
      </div>
    </Modal>
  )
}
