import { useLocation } from 'react-router-dom'

import type { IPatent } from '~/utils/types'

import { FullPatent } from './components/FullPatent'

export const PatentDetails = () => {
  const location = useLocation()
  const { patent } = location.state as { patent: IPatent }

  return patent ? <FullPatent patent={patent} /> : null
}
