/* eslint-disable no-console */
import dayjs from 'dayjs'
import { useEffect, useState, useCallback } from 'react'

import type { IPatent, IUseSearch } from '../types'

const USPTO_API =
  'https://developer.uspto.gov/ibd-api/v1/application/publications'

const DATE_FORMAT = 'YYYY-MM-DD'

// Build the params where start and end dates are optionnal, start will increase with infinite loading by the row amount asked for
// Requesting 25 rows by default for performances as the API is pretty slow
const buildRequest = (
  searchTerm: string,
  fromDate?: string,
  toDate?: string,
  start: number = 0,
  rowsAmount: number = 25
): URL => {
  const apiUrl = new URL(USPTO_API)
  const params = new URLSearchParams({
    searchText: searchTerm,
    start: start.toString(),
    rows: rowsAmount.toString(),
    ...(fromDate && {
      publicationFromDate: dayjs(fromDate).format(DATE_FORMAT),
    }),
    ...(toDate && { publicationToDate: dayjs(toDate).format(DATE_FORMAT) }),
  })
  apiUrl.search = params.toString()
  return apiUrl
}

export const useSearch = ({ searchTerm, fromDate, toDate }: IUseSearch) => {
  const [patents, setPatents] = useState<IPatent[]>([])
  const [recordAmount, setRecordAmount] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [start, setStart] = useState(0)
  const [hasMore, setHasMore] = useState(true)
  const [rowsAmount, setRowsAmount] = useState(25)

  const fetchPatents = useCallback(async () => {
    if (!searchTerm) return
    try {
      setLoading(true)
      const response = await fetch(
        buildRequest(searchTerm, fromDate, toDate, start, rowsAmount)
      )
      const { results, recordTotalQuantity } = await response.json()

      // If the current start index + the rows amount is over the total results available, set that there are no more patents
      if (start + rowsAmount > recordTotalQuantity) setHasMore(false)

      // Add the new patents to the patents array
      if (results && Array.isArray(results)) {
        setPatents((prev) => [...prev, ...results])
        setRecordAmount(recordTotalQuantity)
      } else {
        setError('Unexpected data format from API.')
      }
    } catch (err) {
      setError(`Error fetching data: ${err}`)
    } finally {
      setLoading(false)
    }
  }, [searchTerm, fromDate, toDate, start, rowsAmount])

  // If reaching the end, only fetch the amount of rows needed
  const loadMore = () => {
    if (start + rowsAmount < recordAmount) {
      setStart((prevStart) => prevStart + rowsAmount)
    } else {
      setRowsAmount(recordAmount - start)
      fetchPatents()
    }
  }

  useEffect(() => {
    if (hasMore) {
      fetchPatents()
    }
  }, [fetchPatents, hasMore])

  // Reset the search if the params changed
  useEffect(() => {
    setPatents([])
    setHasMore(true)
    setStart(0)
    setRowsAmount(25)
  }, [searchTerm, fromDate, toDate])

  return {
    patents,
    recordAmount,
    loading,
    error,
    loadMore,
    hasMore,
  }
}
