import { Text } from '@chakra-ui/react'

export const TruncatedParagraph = ({
  title,
  text,
}: {
  title: string
  text: string
}) => {
  return (
    <Text borderRadius={5} cursor="pointer" noOfLines={3} mt="4" p={1}>
      <strong>{title}:</strong> {text}
    </Text>
  )
}
