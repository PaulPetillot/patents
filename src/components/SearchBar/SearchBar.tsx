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

interface ISearchBar {
  loading: boolean
  handleSubmit: (
    event: React.FormEvent<HTMLFormElement>,
    searchValue: string,
    fromDateFilter: string,
    toDateFilter: string
  ) => void
}

export const SearchBar = ({ loading, handleSubmit }: ISearchBar) => {
  const [searchValue, setSearchValue] = useState('')
  const [{ fromDate, toDate }, setTemporaryFilters] = useState({
    fromDate: '',
    toDate: '',
  })

  return (
    <form onSubmit={(e) => handleSubmit(e, searchValue, fromDate, toDate)}>
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
          <InputGroup alignItems="center" display="flex" width="sm" gap={2}>
            <Box>
              <FormLabel fontSize="small">From</FormLabel>
              <Input
                name="from-date-filter"
                placeholder="From"
                size="sm"
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
                size="sm"
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
        <Button colorScheme="blue" isLoading={loading} type="submit">
          Search
        </Button>
      </Flex>
    </form>
  )
}
