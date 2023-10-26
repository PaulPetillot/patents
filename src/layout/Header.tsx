import { Box, Flex, Text } from '@chakra-ui/react'

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
      <Text fontWeight="bold">USPTO Search</Text>
      <Box marginLeft="auto">
        <ThemeToggle />
      </Box>
    </Flex>
  )
}

export default Header
