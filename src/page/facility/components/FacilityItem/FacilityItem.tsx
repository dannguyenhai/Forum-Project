import { FacilityData } from "@/models/Facility.model"

type FacilityItemProps = {
  item: FacilityData
  onDetail: (item: FacilityData & { index: number }) => void
  index: number
  active: boolean
}

export function FacilityItem({ item, onDetail, index, active }: FacilityItemProps) {
  return (
    <div
      className={` cursor-pointer  px-[20px] max-lg:my-3  lg:pt-3 hover:bg-[#E6F3FF] ${active && 'bg-[#E6F3FF]'}`}
      onClick={() => onDetail?.({ ...item, index })}
    >
      <h3 className='text-[16px] font-bold'>{item.spotname}</h3>
      <div className='mt-[10px] flex border-b pb-3'>
        {item?.img ? (
          <img src={`data:image/png;base64, ${item.img}`} alt='thumnail' className='xs:h-[100px] xs:w-[150px] w-[99px] h-[66px]' />
        ) : (
          <div className='flex h-[100px] w-[150px] items-center justify-center rounded bg-gray-300 dark:bg-gray-700 '>
            <svg
              className='h-[100px] w-[150px] text-gray-200'
              xmlns='http://www.w3.org/2000/svg'
              aria-hidden='true'
              fill='currentColor'
              viewBox='0 0 640 512'
            >
              <path d='M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z' />
            </svg>
          </div>
        )}
        <div className='ml-5 max-lg:w-[300px] '>
          <div className='flex items-center gap-[6px]'>
            <span className='block h-[6px] w-[6px] bg-primary' />{' '}
            <p className='text-[14px] text-[#202020] max-xs:font-light'>{`위치 : ${item.address}`}</p>
          </div>
          <div className='flex items-center gap-[6px]'>
            <span className='h-[6px] w-[6px] bg-primary' />
            <p className='text-[14px] max-xs:font-light'>{` 길이 : ${item.length}m`}</p>
          </div>
          <div className='flex items-center gap-[6px]'>
            <span className='h-[6px] w-[6px] bg-primary' />
            <p className='text-[14px] max-xs:font-light'>{` 폭 : ${item.breadth}m`}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
