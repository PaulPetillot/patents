import type { ReactNode } from 'react'
import { createContext, useMemo, useState } from 'react'

import { useSearch } from '~/utils/hooks/useSearch'
import type { IUseSearch, IPatent } from '~/utils/types'

// Create a context with an empty default value
export const PatentContext = createContext<{
  patents: IPatent[]
  loading: boolean
  hasMore: boolean
  recordAmount: number
  loadMore: () => void
  searchParams: IUseSearch
  updateValues: (newSearchParams: IUseSearch) => void
  searchResultClickedIndex: number
  setSearchResultClickedIndex: React.Dispatch<React.SetStateAction<number>>
} | null>(null)

interface IPatentProvider {
  children: ReactNode
  params: IUseSearch
}

// The context will allow us to preserve the values when navigating between pages.
export const PatentProvider = ({ children, params }: IPatentProvider) => {
  const [searchParams, setSearchParams] = useState(params)
  const [searchResultClickedIndex, setSearchResultClickedIndex] = useState(0)
  const { patents, loading, hasMore, recordAmount, loadMore } =
    useSearch(searchParams)

  const value = useMemo(() => {
    const updateValues = (newSearchParams: IUseSearch) => {
      setSearchParams(newSearchParams)
      setSearchResultClickedIndex(0)
    }

    return {
      patents,
      loading,
      hasMore,
      recordAmount,
      loadMore,
      updateValues,
      searchParams,
      searchResultClickedIndex,
      setSearchResultClickedIndex,
    }
  }, [
    patents,
    loading,
    hasMore,
    recordAmount,
    loadMore,
    searchParams,
    searchResultClickedIndex,
    setSearchResultClickedIndex,
  ])

  return (
    <PatentContext.Provider value={value}>{children}</PatentContext.Provider>
  )
}
