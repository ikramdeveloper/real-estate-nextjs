import { useState, useEffect } from "react";
import {
  Flex,
  Select,
  Box,
  Input,
  Spinner,
  Icon,
  Text,
  Button,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import Router from "next/router";
import { MdCancel } from "react-icons/md";
import Image from "next/image";
import { filterData, getFilterValues } from "../utils/filterData";
import { fetchApi } from "../utils/fetchApi";
import noresult from "../assets/images/noresult.svg";

const SearchFilters = () => {
  const router = useRouter();
  const [filters] = useState(filterData);
  const [searchTerm, setSearchTerm] = useState("");
  const [locationData, setLocationData] = useState(null);
  const [isShowLocation, setIsShowLocation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const searchProperties = (filterValues) => {
    const path = router.pathname;
    const { query } = router;
    const values = getFilterValues(filterValues);

    for (const item of values) {
      if (item.value && filterValues?.[item.name]) {
        query[item.name] = item.value;
      }
    }

    router.push({ pathname: path, query });
  };

  useEffect(() => {
    if (!searchTerm) return;

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await fetchApi(`/auto-complete?query=${searchTerm}`);
        setLocationData(data?.hits);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [searchTerm]);

  return (
    <Flex bg="gray.100" p="4" justifyContent="center" flexWrap="wrap">
      {filters.map((filter, index) => (
        <Box key={filter.queryName}>
          <Select
            placeholder={filter.placeholder}
            w="fit-content"
            p="2"
            onChange={(e) => {
              searchProperties({ [filter.queryName]: e.target.value });
            }}
          >
            {filter?.items?.map((item) => (
              <option value={item.value} key={item.value}>
                {item.name}
              </option>
            ))}
          </Select>
        </Box>
      ))}

      <Flex flexDir="column">
        <Button
          border="1px"
          borderColor="gray.200"
          marginTop="2"
          onClick={() => setIsShowLocation((prev) => !prev)}
        >
          Search Location
        </Button>

        {isShowLocation && (
          <Flex flexDir="column" pos="relative" paddingTop="2">
            <Input
              w="300px"
              focusBorderColor="gray.200"
              placeholder="Type here..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            {searchTerm && (
              <Icon
                as={MdCancel}
                pos="absolute"
                cursor="pointer"
                right="5"
                top="5"
                zIndex="100"
                onClick={() => setSearchTerm("")}
              />
            )}

            {isLoading && <Spinner margin="auto" marginTop="3" />}

            {isShowLocation && (
              <Box height="300px" overflow="auto">
                {locationData?.map((location) => (
                  <Box
                    key={location.id}
                    onClick={() => {
                      searchProperties({
                        locationExternalIDs: location.externalID,
                      });
                      setIsShowLocation(false);
                      setSearchTerm(location.name);
                    }}
                  >
                    <Text
                      cursor="pointer"
                      bg="gray.200"
                      p="2"
                      borderBottom="1px"
                      borderColor="gray.100"
                    >
                      {location.name}
                    </Text>
                  </Box>
                ))}

                {!isLoading && !locationData?.length && (
                  <Flex
                    justifyContent="center"
                    alignItems="center"
                    flexDir="column"
                    marginTop="5"
                    marginBottom="5"
                  >
                    <Image src={noresult} alt="no result" />
                    <Text fontSize="xl" marginTop="3">
                      Waiting to search!
                    </Text>
                  </Flex>
                )}
              </Box>
            )}
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};
export default SearchFilters;
