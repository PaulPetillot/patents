import type { PathRouteProps } from 'react-router-dom'

import { Home } from '~/pages/home/Home'
import { PatentDetails } from '~/pages/PatentDetails/PatentDetails'

export const ROUTES = {
  HOME: '/',
  PATENT_DETAILS: '/patent/:id',
}

export const routes: Array<PathRouteProps> = [
  {
    path: ROUTES.HOME,
    element: <Home />,
  },
  {
    path: ROUTES.PATENT_DETAILS,
    element: <PatentDetails />,
  },
]
