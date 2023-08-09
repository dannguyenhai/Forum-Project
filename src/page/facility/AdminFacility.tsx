import { LoadingView } from '@/components/Loading'
import { Pagination } from '@/components/Pagination'
import { SearchBar } from '@/components/SearchBar'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FacilityProps } from './Facility'
const PAGE_SIZE = 10
export function AdminFacility({ loading, data, totalCount }: FacilityProps) {
  const [filter, setFilter] = useState({ searchValue: '', page: 0, pageSize: PAGE_SIZE })
  const { t } = useTranslation()

  return (
    <div className='px-[30px] pb-[124px] pt-[60px] xs:px-[17.7vw] mt-[100px]'>
      <div className='mb-10 md:flex items-center justify-between max-lg:flex-col max-lg:items-start '>
      <h2 className="text-primary  text-2xl font-bold">
          {t("nav.facilityStatus")}
        </h2>
        <div className='flex flex-1 items-center gap-[10px] pt-5 md:pt-0  max-lg:w-full max-sm:flex-col max-sm:items-start lg:justify-end '>
          <SearchBar
            searchValue={filter.searchValue}
            onSearch={(value) => setFilter({ ...filter, page: 0, searchValue: value })}
            placeholder={t('facility.searchInput')}
            disabled={loading}
          />
        </div>
      </div>
      <div className='max-w-[calc(100vw-40px)] overflow-x-scroll md:overflow-x-auto'>
        <table className='w-[1200px] table-auto md:w-full'>
          <thead className='bg-primary-lighter'>
            <tr>
              <th className='ld:w-[80px] text-[14px] font-bold'>
                <div className='my-[10px] min-h-[30px] border-r border-[#7DA7CC] leading-[30px]'>번호</div>
              </th>
              <th className='text-[14px] font-bold lg:w-[12vw]'>
                <div className='minh-[30px] my-[10px] border-r border-[#7DA7CC] leading-[30px]'>행정구역</div>
              </th>
              <th className='] text-[14px] font-bold lg:w-[12vw]'>
                <div className='my-[10px] min-h-[30px] border-r border-[#7DA7CC] leading-[30px]'>지대종류</div>
              </th>
              <th className='text-[14px] font-bold lg:w-[12vw]'>
                <div className='my-[10px] min-h-[30px] border-r border-[#7DA7CC] leading-[30px]'>시설명</div>
              </th>
              <th className='text-[14px] font-bold lg:w-[12vw]'>
                <div className='my-[10px] min-h-[30px] border-r border-[#7DA7CC] leading-[30px]'>시설규모</div>
              </th>
              <th className='text-[14px] font-bold '>
                <div className='my-[10px] min-h-[30px] leading-[30px]'>이미지</div>
              </th>
            </tr>
          </thead>
          <tbody>
            {!!data?.length &&
              data.slice(0 + filter.page * 10, 10 + filter.page * 10).map((item, index) => {
                return (
                  <tr key={`${index}${Math.random()}`} className=' cursor-pointer border-b py-3'>
                    <td className=' text-center text-[14px]'>
                      {totalCount && totalCount - filter.page * PAGE_SIZE - index}
                    </td>
                    <td className=' text-center text-[14px]'>{item.district}</td>
                    <td className=' text-center text-[14px]'>{item.kinds}</td>
                    <td className=' text-center text-[14px]'>{item.spotname}</td>
                    <td className=' text-center text-[14px]'>{`길이 ${item.length}m / 폭 ${item.breadth}m`}</td>
                    <td className=' flex h-[110px] items-center justify-center'>
                      {item.img ? (
                        <img src={`data:image/png;base64, ${item.img}`} alt='thumnail' className='h-[94px] w-[139px]' />
                      ) : (
                        <div className='h-[94px] w-[139px]' />
                      )}
                    </td>
                  </tr>
                )
              })}

            {!data?.length && !loading && (
              <tr>
                <td colSpan={6}>
                  <div className='flex h-[45vh] justify-center py-4'>{t('common.noData')}</div>
                </td>
              </tr>
            )}
            {loading && data.slice(0 + filter.page * 10, 10 + filter.page * 10).length < 10 && (
              <tr>
                <td colSpan={6}>
                  <div className='flex items-start max-xs:ml-[30vw] justify-start xs:items-center xs:justify-center py-[20px]'>
                    <LoadingView />
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {!!totalCount && (
        <div className='mt-[60px] flex w-full items-center justify-center'>
          <Pagination
            currentPage={filter.page + 1}
            totalCount={totalCount}
            pageSize={PAGE_SIZE}
            onPageChange={(page) => {
              setFilter({ ...filter, page: page - 1 })
            }}
          />
        </div>
      )}
    </div>
  )
}
