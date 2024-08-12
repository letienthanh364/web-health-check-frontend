import DialogPopup from '../DialogPopup'

interface Props {
  message: string
  isOpen: boolean
  handleClose: () => void
  closeButton?: boolean
}

export default function ErrorDialog({ message, isOpen, handleClose, closeButton = false }: Props) {
  return (
    <DialogPopup isOpen={isOpen} handleClose={handleClose} closeButton={closeButton}>
      <p className='font-medium text-red-600 text-lg'>{message}</p>
      <button onClick={handleClose} className='mt-6 py-1 px-4 rounded-xl bg-blue-400 hover:bg-blue-500'>
        OK
      </button>
    </DialogPopup>
  )
}
