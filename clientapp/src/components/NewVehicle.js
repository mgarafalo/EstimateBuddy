import { Box, Heading } from "@chakra-ui/react";
import PhotoDropzone from "./Dropzone";

export default function NewVehicle({ vehicle }) {
  console.log(vehicle)
  return (
    <>
      <Heading mt='20' size='xl' color='white'>
        {vehicle.year} {vehicle.make} {vehicle.model}
      </Heading>
      <Heading mt='1' size='lg' color='white'>
        {vehicle.vin}
      </Heading>

      <Box mt='20'>
        <Heading size ='md' color='white'>
          Please upload all photos taken of the vehicle 
          including clear photos of the VIN and all damage related to the loss
        </Heading>
        <Box mt='10' w='50%' bgColor='#989C94' borderRadius={10} opacity={0.6} style={{boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'}}>
          <PhotoDropzone />
        </Box>
      </Box>
    </>
  )
}