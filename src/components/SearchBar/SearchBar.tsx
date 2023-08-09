import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useRef } from 'react'
import { Button } from '../Button/Button'

interface SearchBarProps {
  placeholder?: string
  onSearch?: (value: string) => void
  searchValue: string;
  disabled?:boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({ placeholder = '', onSearch, searchValue, disabled }) => {
  const searchRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    if (searchRef.current) {
      searchRef.current.value = searchValue
    }
  }, [searchValue])

  const onSubmit = () => {
    if (searchRef.current && onSearch) {
      onSearch(searchRef.current.value)
    }
  }

  return (
    <div className='flex items-center'>
      <div className='lg:w-[360px] border-0 flex-1'>
      <input
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            onSubmit()
          }
        }}
        ref={searchRef}
        className='h-10 rounded-none border border-grey-border-dark  p-[10px] w-full text-[14px] '
        placeholder={placeholder}
      />
      </div>
      <Button
        disabled={disabled}
        onClick={onSubmit}
        title='검색'
        className='h-10'
        icon={<FontAwesomeIcon icon={faSearch} color='white' />}
      />
    </div>
  )
}
