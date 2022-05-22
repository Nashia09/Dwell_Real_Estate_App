import { Box, Flex, Spacer, Text, Avatar }  from '@chakra-ui/react'
import { FaBath, FaBed} from 'react-icons/fa';
import  { GoVerified} from 'react-icons/go';
import { BsGridFill } from 'react-icons/bs';
import millify from 'millify';
import {baseUrl, fetchApi} from '../../utils/fetchApi';
import ImageScrollbar from '../components/ImageScroller';



const PropertyDetails = ( {propertyDetails: { price, rentFrequency,rooms, baths, title,externalID, area, agency, isVerified, description, type, purpose, amenities, furnishingStatus,photos }}) => (

    <Box maxWidth="1000px"  margin="auto" p="4">
       {photos && <ImageScrollbar  data={photos}/>}

       <Box w="full" p="6">
       <Flex paddingTop='2' alignItems='center' justifyContent='space-between'>
          <Flex alignItems='center'>
            <Box paddingRight='3' color='green.400'>{isVerified && <GoVerified />}</Box>
            <Text fontWeight='bold' fontSize='lg'>AED {price}{rentFrequency && `/${rentFrequency}`}</Text>
          </Flex>
          <Box>
            <Avatar size='sm' src={agency?.logo?.url}></Avatar>
          </Box>
        </Flex>
        <Flex alignItems='center' p='1' justifyContent='space-between' w='250px' color='blue.400'>
          {rooms}
          <FaBed /> | {baths} <FaBath /> | {millify(area)} sqft <BsGridFill />
        </Flex>
        <Box marginTop="2"></Box>
        <Text fontSize='lg' color="dark-gray" marginBottom="2" fontWeight="bold">
          {title}
        </Text>
        <Text  lineHeight="2" color="gray.600"  fontWeight="bold">
            {description}
        </Text>
       </Box>

       <Flex flexWrap="wrap" textTransform="uppercase" justifyContent="space-between">

           <Flex justifyContent="space-between" w="400px" borderBottom="1px" borderColor="gray.100" p="3">

               <Text>Type</Text>
               <Text fontWeight="bold">{type}</Text>
           </Flex>

           <Flex justifyContent="space-between" w="400px" borderBottom="1px" borderColor="gray.100" p="3">

<Text>Purpose</Text>
<Text fontWeight="bold">{purpose}</Text>
</Flex>

        {furnishingStatus && (
              <Flex justifyContent="space-between" w="400px" borderBottom="1px" borderColor="gray.100" p="3">

              <Text>Furnishing Status</Text>
              <Text fontWeight="bold">{furnishingStatus}</Text>
          </Flex>
        )}
       </Flex>

       <Box>
           {amenities.length && <Text fontSize="2xl" fontWeight="black" marginTop="5">Amenities</Text>}
       
         <Flex flexWrap="wrap">
           {amenities.map((item) => (
               item.amenities.map((amenity)  => (
                   <Text 
                   fontWeight="bold"
                   color="blue.400"
                   fontSize="75%"
                   p="2"
                   bg="gray.200"
                   m="1"
                   borderRadius="5"
                   key={amenity.text}>{amenity.text}</Text>
               ))
           ))}

         </Flex>
       </Box>
    </Box>
);

export default PropertyDetails;

export async function getServerSideProps({ params: { id }})
{
    const data = await fetchApi(`${baseUrl}/properties/detail?externalID=${ id }`);
        console.log(data);
    

 
     
        return {
            props: {
              propertyDetails: data,
            },
          };
        }

