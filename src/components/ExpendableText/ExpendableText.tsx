import { Text, useColorMode } from '@chakra-ui/react'
import { useState } from 'react'

export const ExpendableText = ({
  title,
  text,
}: {
  title: string
  text: string
}) => {
  const [expend, setExpend] = useState(false)
  const { colorMode } = useColorMode()

  return (
    <Text
      onClick={() => {
        setExpend(!expend)
      }}
      _hover={{
        backgroundColor: colorMode === 'light' ? 'gray.100' : 'gray.700',
      }}
      borderRadius={5}
      cursor="pointer"
      noOfLines={expend ? undefined : 3}
      mt="4"
      p={1}
    >
      <strong>{title}:</strong> {text}
    </Text>
  )
}
