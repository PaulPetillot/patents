import { useContext } from 'react'

import { PatentContext } from '~/context/PatentContext'

// This hook allows us to access all the properties of the patent context
export const usePatents = () => {
  const context = useContext(PatentContext)
  if (!context) {
    throw new Error('usePatentSearch must be used within a PatentProvider')
  }
  return context
}
