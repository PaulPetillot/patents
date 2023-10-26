import type { PathRouteProps } from 'react-router-dom'

import { Home } from '~/pages/home/Home'

export const routes: Array<PathRouteProps> = [
  {
    path: '/',
    element: <Home />,
  },
]
