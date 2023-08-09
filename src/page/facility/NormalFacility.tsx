import { Map } from '@/components/Map'
import { useMemo, useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { FacilityItem } from './components/FacilityItem'
import { ModalDetail } from './components/ModalDetail'
import { FacilityProps } from './Facility'
import { Button } from '@/components/Button/Button'
import { Select } from '@/components/Select'
import { FacilityData } from '@/models/Facility.model'
import { DISTRICT } from '@/utils/constants'

const BUSAN = '부산'

export const NormalFacility = ({ loading, data }: FacilityProps) => {
  const { t } = useTranslation()

  const [showDetail, setShowDetail] = useState(false)
  const [location, setLocation] = useState<string>(BUSAN)
  const [selectedItem, setSelectedItem] = useState<(FacilityData & { index: number }) | null>(null)

  const onDetail = (selectedItem: FacilityData & { index: number }) => {
    setSelectedItem(selectedItem)
    setShowDetail(true)
  }

  const onSelectLocation = (district: string) => {
    if (district === location) {
      setLocation(BUSAN)
    } else {
      setLocation(district)
    }
  }

  const districtSelect = useMemo(() => {
    return Object.values(DISTRICT).map((item, index) => ({ label: index === 0 ? '부산전체' : item, value: item }))
  }, [])

  const selectedValue = useMemo(() => {
    return districtSelect.find((item) => item.value === location)
  }, [location])

  const renderedData = location !== BUSAN ? data.filter((item) => item.district === location) : data
  return (
    <div className="md:w-[1240px] min-w-[360px] mx-auto p-[24px] md:p-0 mt-[100px]">
      <div className='w-full'>
      <h2 className="text-primary mt-10 text-2xl font-bold pl-5 md:pl-0">
          {t("nav.facilityStatus")}
        </h2>
      </div>
      <div className='flex w-full flex-1  flex-col'>
        <div className='mt-10 flex flex-1 items-start justify-between  max-lg:flex-col'>
          <div className='relative flex h-[640px] flex-1 items-start justify-end self-stretch lg:pr-[70px]'>
            <Button
              onClick={() => {
                setLocation(BUSAN)
              }}
              title='부산 전체보기'
              className={`group absolute left-[38px] top-[30px] rounded-[10px] !px-[10px] !py-[10px] max-lg:hidden  ${
                location !== BUSAN &&
                '!background-white hover:!bg-inactive border border-primary hover:border hover:border-primary'
              }`}
              titleClassName={`text-[15px]  ${
                location !== BUSAN &&
                '!text-primary font-extrabold group-hover:text-primary  group-hover:font-extrabold'
              }`}
            />
            <Map onSelect={onSelectLocation} activeDistrict={location} />
          </div>
          <Select
            placeholder={t('announce.selectPlaceholder')}
            value={selectedValue}
            defaultValue={districtSelect[0]}
            classNames={{
              container: () => 'w-full mt-[14px] mb-5 lg:hidden',
              control: () => '!border-primary text-[14px] !rounded-none min-w-[90px] h-[50px]',
              placeholder: () => '!text-primary font-extrabold',
              menuList: () => 'text-4 font-extrabold !border-primary',
              input: () => '!text-primary font-extrabold',
              singleValue: () => '!text-primary font-extrabold'
            }}
            styles={{
              option: (provided, state) => {
                let style = {
                  ...provided,
                  height: '50px',
                  paddingTop: 0,
                  paddingBottom: 0,
                  display: 'flex',
                  justifyItems: 'center',
                  alignItems: 'center',
                }
                if (state.isSelected) {
                  style = { ...style, backgroundColor: '#B7DCFF', color: '#0069C3' }
                }
                return style
              },
              menuList: (provided) => {
                return ({...provided, borderColor:'#0069C3', borderWidth:1, marginTop:0})
              }
            }}
            options={districtSelect}
            onChange={(option: any) => {
              setLocation(option?.value)
            }}
          />
          <div className='relative flex flex-col justify-start self-stretch overflow-hidden font-medium  lg:min-w-[440px]'>
            <p className='mb-4 text-[18px] font-bold text-[#202020] max-lg:hidden'>
              <Trans
                i18nKey={'facility.collectionBlindSpot'}
                values={{ name: location }}
                components={{ 1: <span className='text-primary' /> }}
              />
            </p>
            <div className='scrollbar h-[597px] self-stretch overflow-scroll overflow-x-hidden  border'>
              {renderedData.map((item, index) => (
                <FacilityItem
                  key={`${item.spotname} + ${index}`}
                  item={item}
                  onDetail={onDetail}
                  index={index}
                  active={index === selectedItem?.index}
                />
              ))}
              {!renderedData?.length && !loading && <div className='p-[20px] text-center'>{t('common.noData')}</div>}
              {loading}
            </div>
          </div>
        </div>
      </div>
      <ModalDetail
        showDetail={showDetail}
        selectedItem={selectedItem}
        onClose={() => {
          setShowDetail(false)
          setSelectedItem(null)
        }}
      />
    </div>
  )
}
