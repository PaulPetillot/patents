/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import dayjs from 'dayjs'
import { useState, useEffect } from 'react'

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
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [recordAmount, setRecordAmount] = useState(0)
  const [start, setStart] = useState(0)
  const [rowAmount, setRowAmount] = useState(25)
  const [initialLoad, setInitialLoad] = useState(true)

  const loadMore = () => {
    if (loading || !hasMore) return

    if (recordAmount && patents.length + rowAmount > recordAmount) {
      setRowAmount(recordAmount - patents.length)
      setHasMore(false)
    } else {
      setStart(start + rowAmount)
    }
    if (initialLoad) {
      setInitialLoad(false)
    }
  }

  const resetSearch = () => {
    setHasMore(true)
    setPatents([])
    setRecordAmount(0)
    setStart(0)
    setRowAmount(25)
  }

  useEffect(() => {
    const fetchPatent = async () => {
      if (!searchTerm) return

      const apiUrl = buildRequest(
        searchTerm,
        fromDate,
        toDate,
        start,
        rowAmount
      )
      try {
        setLoading(true)
        const response = await fetch(apiUrl)
        const { results, recordTotalQuantity } = await response.json()

        setPatents((prev) => [...prev, results].flat())
        setRecordAmount(recordTotalQuantity)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchPatent()
  }, [fromDate, searchTerm, start, toDate, rowAmount])

  useEffect(() => {
    resetSearch()
  }, [fromDate, toDate, searchTerm])

  return {
    patents,
    loading,
    hasMore,
    recordAmount,
    loadMore,
    initialLoad,
  }
}
