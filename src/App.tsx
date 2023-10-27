import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter as Router } from 'react-router-dom'

import { PatentProvider } from '~/context/PatentContext'
import { Layout } from '~/layout/Main'
import { Routings } from '~/router/Routings'
import { theme } from '~/styles/theme'

const App = () => {
  const searchParams = {
    searchTerm: '',
  }

  return (
    <ChakraProvider theme={theme}>
      <PatentProvider params={searchParams}>
        <Router>
          <Layout>
            <Routings />
          </Layout>
        </Router>
      </PatentProvider>
    </ChakraProvider>
  )
}

export default App
