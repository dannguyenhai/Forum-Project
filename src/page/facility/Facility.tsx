import { UserType } from '@/models/User.model'
import { useCallback, useEffect, useState } from 'react'
import { useWebSocket } from 'react-use-websocket/dist/lib/use-websocket'
import { CommandType, FacilityData } from '@/models/Facility.model'
import { useSelector } from 'react-redux'
import { NormalFacility } from './NormalFacility'
import { AdminFacility } from './AdminFacility'

export type FacilityProps = {
  loading: boolean
  data: Array<FacilityData>
  totalCount?: number
}

export const Facility = () => {
  const role = useSelector((state: any) => state.auth.role)
  const [, updateState] = useState<any>()
  const forceUpdate = useCallback(() => updateState({}), [])
  const [request, setRequest] = useState(0)
  const [totalCount, setTotalCount] = useState(0)
  const [data] = useState<Array<FacilityData>>([])
  const [loading, setLoading] = useState(false)
  const {VITE_SOCKET_FACILITY_ENDPOINT} = import.meta.env
  const { readyState, sendJsonMessage } = useWebSocket(VITE_SOCKET_FACILITY_ENDPOINT, {
    onOpen: () => {
      console.log('Connect successfully!')
    },
    onClose: () => {
      console.log('Close!')
    },
    onMessage: (e) => {
      const res = JSON.parse(e.data)
      if (typeof res?.data?.number === 'number' && request === 0) {
        setTotalCount(res?.data?.number)
        setRequest(1)
        return
      }
      if (res.data && request === 1) {

        data.push(res.data)
        if (data.length % 10 === 0 || data.length === totalCount) {
          // rerender batch
          forceUpdate()
        }
        if (data.length === totalCount - 1) {
          setLoading(false)
        }
      }
    },
    onError: (e) => {
      console.log('error', e)
    },
    filter: () => false
  })

  useEffect(() => {
    if (readyState === 1) {
      // 1 - open
      setLoading(true)
      sendJsonMessage({
        head: 'monitoring',
        command: CommandType.spot,
        data: {
          request
        }
      })
    }
  }, [readyState, request])
  if (role === UserType.Admin) return <AdminFacility totalCount={totalCount} loading={loading} data={data} />
  return <NormalFacility loading={loading} data={data} />
}
