import {
  InputGroup,
  Input,
  InputRightElement,
  Button,
  Flex,
  FormLabel,
  Box,
  Text,
} from '@chakra-ui/react'
import { useState } from 'react'
import { RiSearch2Line as SearchIcon } from 'react-icons/ri'

import { usePatents } from '~/utils/hooks/usePatents'

interface ISearchBar {
  loading: boolean
}

export const SearchBar = ({ loading }: ISearchBar) => {
  const { searchParams, updateValues } = usePatents()
  const [searchValue, setSearchValue] = useState(searchParams.searchTerm || '')
  const [{ fromDate, toDate }, setTemporaryFilters] = useState({
    fromDate: searchParams.fromDate || '',
    toDate: searchParams.toDate || '',
  })

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>,
    fromDateFilter: string,
    toDateFilter: string
  ) => {
    event.preventDefault()
    updateValues({
      searchTerm: searchValue,
      fromDate: fromDateFilter,
      toDate: toDateFilter,
    })
  }

  return (
    <form onSubmit={(e) => handleSubmit(e, fromDate, toDate)}>
      <Flex flexDirection={['column', 'row']} gap={2}>
        <Flex
          justifyContent="center"
          alignContent="center"
          gap={4}
          width="full"
          flexDirection="column"
        >
          <InputGroup>
            <Input
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search for patent"
            />
            <InputRightElement pointerEvents="none">
              <SearchIcon />
            </InputRightElement>
          </InputGroup>
          <InputGroup
            alignItems="center"
            justifyContent={['center', 'flex-start']}
            display="flex"
            maxW="sm"
            gap={2}
          >
            <Box>
              <FormLabel fontSize="small">From</FormLabel>
              <Input
                name="from-date-filter"
                placeholder="From"
                size={['xs', 'sm']}
                type="date"
                value={fromDate}
                onChange={(e) =>
                  setTemporaryFilters({
                    fromDate: e.target.value,
                    toDate,
                  })
                }
              />
            </Box>
            <Text mt="5">-</Text>
            <Box>
              <FormLabel fontSize="small">To</FormLabel>
              <Input
                name="to-date-filter"
                placeholder="To"
                size={['xs', 'sm']}
                type="date"
                value={toDate}
                onChange={(e) =>
                  setTemporaryFilters({
                    fromDate,
                    toDate: e.target.value,
                  })
                }
              />
            </Box>
          </InputGroup>
        </Flex>
        <Button
          mt={[4, 0]}
          colorScheme="blue"
          isLoading={loading}
          type="submit"
        >
          Search
        </Button>
      </Flex>
    </form>
  )
}
