import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import ReactSelect, { DropdownIndicatorProps, components } from 'react-select'
import { StateManagerProps } from 'react-select/dist/declarations/src/useStateManager'

const DropdownIndicator = (props: DropdownIndicatorProps) => (
  <components.DropdownIndicator {...props}>
    <FontAwesomeIcon fontSize={15} icon={faCaretDown} color={'black'} />
  </components.DropdownIndicator>
)

export const Select: FC<StateManagerProps> = (props) => {
  const { t } = useTranslation()
  return (
    <ReactSelect
      noOptionsMessage={() => t('common.noOption')}
      components={{ DropdownIndicator, IndicatorSeparator: null }}
      classNames={{
        control: () => '!border-grey-border-dark text-[14px] !rounded-none min-w-[90px]',
        placeholder: () => '!text-grey-lighter',
        ...props.classNames
      }}
      {...props}
    />
  )
}
