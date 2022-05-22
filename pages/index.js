import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { Flex, Box, Text, Button}  from '@chakra-ui/react';
import { Link } from '@chakra-ui/react';

import { baseUrl, fetchApi } from  '../utils/fetchApi';

import Property from './components/Property';

const Banner = ({ purpose, imageUrl, title1, title2, desc1, desc2, linkName, buttonName })  => (

    <Flex flexWrap="wrap" justifyContent="center"  alignItems="center" m="10">
     <Image src={imageUrl}  width={500} height={300} alt="banner" />

     <Box p="5">
     <Text color="gray.500" fontSize="sm" fontWeight="medium">{purpose}</Text>
     <Text  fontSize="3xl" fontWeight="bold">{title1} <br /> {title2}</Text>
       <Text color="gray.700" fontSize="lg" paddingTop="3"  paddingBottom="3">{desc1} <br /> {desc2}</Text>

       <Button fontSize="x1 ">

         <Link href={linkName}>{buttonName}</Link>
       </Button>


     </Box>
    </Flex>
)

export default function Home({propertiesForSale, propertiesForRent}) {
 

  
  return (
    <Box>
      <Banner 
      purpose= "RENT A HOME"
      title1="Rental Homes for"
      title2="Everyone"
      desc1="Explore Apartments, Villas, Homes"
      desc2="and more"
      buttonName="Explore Renting"
      linkName="/search?purpose=for-rent"
      imageUrl="https://bayut-production.s3.eu-central-1.amazonaws.com/image/110993385/6a070e8e1bae4f7d8c1429bc303d2008"    
          
      />

      <Flex flexWrap="wrap">

        {propertiesForRent.map((property) => <Property property={property} key={property.id} />)}

      </Flex>
      
      
      <Banner
      purpose= "BUY A HOME"
      title1="Find, Buy & Own Your"
      title2="Dream Home"
      desc1="Explore Apartments, Villas, Homes"
      desc2="and more"
      buttonName="Explore Buying"
      linkName="/search?purpose=for-rent"
      imageUrl="https://bayut-production.s3.eu-central-1.amazonaws.com/image/110993385/6a070e8e1bae4f7d8c1429bc303d2008"    
      
      />
  <Flex flexWrap="wrap">
{propertiesForSale.map((property) => <Property property={property} key={property.id} />)}
</Flex>
    </Box>
  )
}

export async function getStaticProps() {
  const propertyForSale = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=6`)
  const propertyForRent = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-rent&hitsPerPage=6`)

return{

  props: {

    propertiesForSale: propertyForSale?.hits,
    propertiesForRent: propertyForRent?.hits

  }
}


}