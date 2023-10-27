import { Box, Flex, Link } from '@chakra-ui/react'
import { Link as ReactRouterLink } from 'react-router-dom'

import { ROUTES } from '~/router/routes'

import ThemeToggle from './ThemeToggle'

const Header = () => {
  return (
    <Flex
      as="header"
      width="full"
      align="center"
      alignSelf="flex-start"
      justifyContent="center"
      gridGap={2}
    >
      <Link
        as={ReactRouterLink}
        to={ROUTES.HOME}
        _hover={{
          textDecoration: 'none',
        }}
        fontWeight="bold"
      >
        USPTO Search
      </Link>
      <Box marginLeft="auto">
        <ThemeToggle />
      </Box>
    </Flex>
  )
}

export default Header
