import { Box, Flex } from "@chakra-ui/react";
import { Banner, Property } from "../components";
import { fetchApi } from "../utils/fetchApi";

const Home = ({ propertiesForSale, propertiesForRent }) => {
  // console.log("properties for sale", propertiesForSale);
  // console.log("properties for rent", propertiesForRent);

  return (
    <Box>
      <Banner
        purpose="RENT A HOME"
        title1="Rental Homes For"
        title2="Everyone"
        desc1="Explore Apartments, Villas, Homes"
        desc2="and more"
        buttonText="Explore Renting"
        linkName="/search?purpose=for-rent"
        imageUrl="https://bayut-production.s3.eu-central-1.amazonaws.com/image/145426814/33973352624c48628e41f2ec460faba4"
      />

      <Flex flexWrap="wrap">
        {propertiesForRent?.map((property) => (
          <Property property={property} key={property.id} />
        ))}
      </Flex>

      <Banner
        purpose="BUY A HOME"
        title1="Find, Buy &amp; Own Your"
        title2="Dream Home"
        desc1="Explore Apartments, Villas, Homes"
        desc2="and more"
        buttonText="Explore Purchasing"
        linkName="/search?purpose=for-sale"
        imageUrl="https://bayut-production.s3.eu-central-1.amazonaws.com/image/110993385/6a070e8e1bae4f7d8c1429bc303d2008"
      />

      <Flex flexWrap="wrap">
        {propertiesForSale?.map((property) => (
          <Property property={property} key={property.id} />
        ))}
      </Flex>
    </Box>
  );
};

export const getStaticProps = async () => {
  const propertyForSale = await fetchApi(
    `/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=6`
  );
  const propertyForRent = await fetchApi(
    `/properties/list?locationExternalIDs=5002&purpose=for-rent&hitsPerPage=6`
  );

  return {
    props: {
      propertiesForSale: propertyForSale?.hits,
      propertiesForRent: propertyForRent?.hits,
    },
  };
};

export default Home;
