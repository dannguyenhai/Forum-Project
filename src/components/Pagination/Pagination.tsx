import { faAngleLeft, faAngleRight, faAnglesLeft, faAnglesRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'
import { FC, useMemo } from 'react'

const range = (start: number, end: number) => {
  const length = end - start + 1
  return Array.from({ length }, (_, idx) => idx + start)
}

interface PaginationProps {
  totalCount: number
  onPageChange: (page: number) => void
  siblingCount?: number
  currentPage: number
  pageSize: number
  className?: string
}

export const Pagination: FC<PaginationProps> = ({
  totalCount,
  siblingCount = 1,
  className = '',
  pageSize,
  onPageChange,
  currentPage
}) => {
  const DOTS = -1

  const paginationRange = useMemo(() => {
    const totalPageCount = Math.ceil(totalCount / pageSize)

    // Pages count is determined as siblingCount + firstPage + lastPage + currentPage + (-2)*DOTS
    const totalPageNumbers = siblingCount + 5

    /*
      If the number of pages is less than the page numbers we want to show in our
      paginationComponent, we return the range [1..totalPageCount]
    */
    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount)
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1)
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPageCount)

    /*
      We do not want to show dots if there is only one position left 
      after/before the left/right page count as that would lead to a change if our Pagination
      component size which we do not want
    */
    const shouldShowLeftDots = leftSiblingIndex > 2
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2

    const firstPageIndex = 1
    const lastPageIndex = totalPageCount

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount
      const leftRange = range(1, leftItemCount)

      return [...leftRange, DOTS, totalPageCount]
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount
      const rightRange = range(totalPageCount - rightItemCount + 1, totalPageCount)
      return [firstPageIndex, DOTS, ...rightRange]
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex)
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex]
    }

    return []
  }, [totalCount, pageSize, siblingCount, currentPage, DOTS])

  if (currentPage === 0) {
    return null
  }

  const onNext = () => {
    onPageChange(currentPage + 1)
  }

  const onSelectLastPage = () => {
    onPageChange(Math.ceil(totalCount / pageSize))
  }

  const onSelectFirstPage = () => {
    onPageChange(1)
  }

  const onPrevious = () => {
    onPageChange(currentPage - 1)
  }

  const lastPage = paginationRange[paginationRange.length - 1]

  return lastPage ? (
    <ul className={classNames('flex items-center justify-center mt-16 list-none flex-wrap gap-[6px]', { [className]: className })}>
      <li
        className={classNames(
          'flex h-8 w-8 cursor-pointer items-center justify-center border border-grey-border bg-grey-lightest',
          {
            'pointer-events-none': currentPage === 1
          }
        )}
        onClick={() => onSelectFirstPage()}
      >
        <FontAwesomeIcon fontSize={15} icon={faAnglesLeft} />
      </li>
      <li
        className={classNames(
          'flex h-8 w-8 cursor-pointer items-center justify-center border border-grey-border bg-grey-lightest',
          {
            'pointer-events-none': currentPage === 1
          }
        )}
        onClick={() => onPrevious()}
      >
        <FontAwesomeIcon fontSize={15} icon={faAngleLeft} />
      </li>
      {paginationRange.map((pageNumber, index) => {
        if (pageNumber === DOTS) {
          return (
            <li
              key={index}
              className='pointer-events-none flex h-8 w-8 cursor-pointer items-center justify-center border border-grey-border text-[15px]'
            >
              &#8230;
            </li>
          )
        }

        return (
          <li
            key={index}
            className={classNames(
              'flex h-8 w-8 cursor-pointer items-center justify-center border border-grey-border bg-white text-[15px] text-black',
              {
                '!cursor-default !bg-primary !text-white': pageNumber === currentPage
              }
            )}
            onClick={() => {
              if (pageNumber !== currentPage) onPageChange(pageNumber)
            }}
          >
            {pageNumber}
          </li>
        )
      })}
      <li
        className={classNames(
          'flex h-8 w-8 cursor-pointer items-center justify-center border border-grey-border bg-grey-lightest',
          {
            'pointer-events-none': currentPage === lastPage
          }
        )}
        onClick={onNext}
      >
        <FontAwesomeIcon fontSize={15} icon={faAngleRight} />
      </li>
      <li
        className={classNames(
          'flex h-8 w-8 cursor-pointer items-center justify-center border border-grey-border bg-grey-lightest',
          {
            'pointer-events-none': currentPage === lastPage
          }
        )}
        onClick={onSelectLastPage}
      >
        <FontAwesomeIcon fontSize={15} icon={faAnglesRight} />
      </li>
    </ul>
  ) : null
}
