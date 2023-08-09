import { Modal } from '@/components/Modal'
import { CommandType, FacilityData } from '@/models/Facility.model'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useWebSocket } from 'react-use-websocket/dist/lib/use-websocket'

type DataType = {
  depart?: string
  garbage?: number
  manpower?: 7
  returntime?: string
  spotname?: string
  username?: string
  usingtime?: string
  state?: boolean
}

type ModalDetailProps = {
  showDetail?: boolean
  onClose: () => void
  selectedItem: (FacilityData & { index: number }) | null
}

export function ModalDetail({ showDetail, onClose, selectedItem }: ModalDetailProps) {
  const [data, setData] = useState<DataType[]>([])
  console.log("data123", data);
  const [loading, setLoading] = useState(false)
  const { VITE_SOCKET_FACILITY_ENDPOINT } = import.meta.env
  const { t } = useTranslation()
  const { readyState, sendJsonMessage } = useWebSocket(VITE_SOCKET_FACILITY_ENDPOINT, {
    onOpen: () => {
      console.log('Connect successfully 1234!')
    },
    onClose: () => {
      console.log('Close!1234')
    },
    onMessage: (e) => {
      const res: { data: DataType[] } = JSON.parse(e.data)
      if (res.data.some((item) => item.state === false)) {
        setData([])
      } else {
        setData(res.data)
        console.log("data123",res.data);
      }
      setLoading(false)
    },
    onError: () => {
      setLoading(false)
    },
    filter: () => false
  })

  useEffect(() => {
    if (readyState === 1 && selectedItem?.spotname) {
      setLoading(true)
      sendJsonMessage(
        {
          head: 'monitoring',
          command: CommandType.using,
          data: {
            spotname: selectedItem?.spotname
          }
        },
        true
      )
    }
  }, [readyState, selectedItem])

  const prefix = (val: number) => {
    if (val < 10) {
      return `0${val}`
    }
    return val
  }

  const calUsingTime = (start?: string, end?: string) => {
    if (!start || !end) {
      return 0
    }
    const endTime = dayjs(end)
    const times = endTime.diff(start, 'minute', true)
    const h = Math.floor(times / 60)
    const m = times - h * 60
    return `${prefix(h)}시간 ${prefix(parseFloat(m.toFixed(0)))}분`
  }

  return (
    <Modal isShow={showDetail} onClose={onClose}>
      <div className='w-[100vw] flex justify-center items-center'>
        <div
          className={`mx-[30px] bg-white  px-[5px] py-9 shadow-lg xs:w-[85vw] xs:px-10 lg:h-[300px] lg:w-[850px] ${
            showDetail && 'animate-slide-up'
          }`}
        >
          <div className='text-[20px] font-bold max-xs:text-center'>{selectedItem?.spotname} 쓰레기 수거 정보</div>
          <div className='mt-5 flex gap-5 max-lg:flex-col'>
            {selectedItem?.img ? (
              <img
                src={`data:image/png;base64, ${selectedItem?.img}`}
                alt='thumnail'
                className='h-[182px] w-full xs:w-[273px] '
              />
            ) : (
              <div className='h-[182px] w-[273px]' />
            )}
            <div className='max-h-[182px] w-full flex-grow overflow-auto '>
              <table className='border-border w-full min-w-[273px] table-auto border '>
                <thead className='sticky top-[-1px] bg-primary-lighter'>
                  <tr className='h-10 '>
                    <th className='text-[14px] font-bold '>
                      <div className='leading-[30px]'>수거일자</div>
                    </th>
                    <th className='text-[14px] font-bold '>
                      <div className='leading-[30px]'>수거시간</div>
                    </th>
                    <th className='text-[14px] font-bold '>
                      <div className='leading-[30px]'>수거량</div>
                    </th>
                    <th className='text-[14px] font-bold'>
                      <div className='leading-[30px]'>투입인력</div>
                    </th>
                  </tr>
                </thead>

                <tbody className='h-[140px] overflow-y-auto'>
                  {data &&
                    data.map((item, index) => {
                      return (
                        <tr key={index} className='h-[40px]'>
                          <td className='text-center text-[14px]'>{dayjs(item.usingtime).format('YYYY.MM.DD')}</td>
                          <td className='text-center text-[14px]'>{calUsingTime(item.usingtime, item.returntime)}</td>
                          <td className=' text-center text-[14px] '>
                            {' '}
                            {typeof item.garbage === 'number' ? Math.round((item.garbage / 1000) * 10) / 10 : 0} T
                          </td>
                          <td className='text-center text-[14px]'>{item.manpower}명</td>
                        </tr>
                      )
                    })}
                  {!data?.length && !loading && (
                    <tr>
                      <td colSpan={4}>
                        <div className=' flex justify-center p-4 text-center'>{t('common.noData')}</div>
                      </td>
                    </tr>
                  )}
                  {loading && (
                    <tr>
                      <td colSpan={4}>
                        <div className='flex items-center justify-center'>
                          <svg
                            aria-hidden='true'
                            className='mr-2 h-10 w-10 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600'
                            viewBox='0 0 100 101'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <path
                              d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                              fill='currentColor'
                            />
                            <path
                              d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                              fill='currentFill'
                            />
                          </svg>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}
