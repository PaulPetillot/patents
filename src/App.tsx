import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter as Router } from 'react-router-dom'

import { Layout } from '~/layout/Main'
import { Routings } from '~/router/Routings'
import { theme } from '~/styles/theme'

const App = () => (
  <ChakraProvider theme={theme}>
    <Router>
      <Layout>
        <Routings />
      </Layout>
    </Router>
  </ChakraProvider>
)

export default App
