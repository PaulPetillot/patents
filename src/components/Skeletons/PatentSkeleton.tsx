import { Skeleton, Flex, SkeletonText, Box } from '@chakra-ui/react'

export const PatentSkeleton = () => {
  return (
    <Flex
      flexDirection="column"
      justifyContent="space-around"
      height="800px"
      borderWidth="1px"
      borderRadius="lg"
      padding="6"
      boxShadow="lg"
    >
      <Skeleton height="40px" mb="4" />
      <SkeletonText mb="2" noOfLines={1} />
      <SkeletonText mb="2" noOfLines={1} />
      <SkeletonText mb="2" noOfLines={1} />
      <SkeletonText mb="2" noOfLines={1} />
      <Box my="4">
        <Skeleton height="40px" mb="4" />
        <Skeleton height="20px" width="50%" mb="2" />
        <Skeleton height="20px" width="70%" mb="2" />
      </Box>
      <SkeletonText mb="2" noOfLines={4} />
      <SkeletonText mb="2" noOfLines={4} />
      <SkeletonText mb="2" noOfLines={4} />
      <Flex mt="4">
        <Skeleton height="40px" width="200px" mr="2" />
        <Skeleton height="40px" width="200px" />
      </Flex>
    </Flex>
  )
}
