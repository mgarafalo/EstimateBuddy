import React, {  } from 'react';
import { Box, Image, SimpleGrid, Button, Center } from '@chakra-ui/react';

export default function HomePage() {
    return (
        <>
            <Center>
                <SimpleGrid mt={20} w='98%' minChildWidth='500px' spacing={5}>
                    <Box>
                        <Box as='h3' textAlign='center' color='white' fontWeight='semibold'>
                            Estimate Buddy
                        </Box>
                        <Box mt={8} as='p' textAlign='center' color='white'>
                            We aim to produce well documented and accurate estimates in order to 
                            increase your shop's productivity while reducing the stress of going back 
                            and forth with the insurance company. 
                        </Box>
                        <Box mt={8} as='p' textAlign='center' color='white'>
                            Our team consists of experienced estimators with years of experience
                            working for a range of insurance companies. With our diverse background
                            we are ready to answer every question an insurance representative will have
                            regarding our estimate. 
                        </Box>
                        <Box mt={8} as='p' textAlign='center' color='white'>
                            The estimates written for your clients repair will meet all criteria required 
                            by most insurance companies. Our proven process will ensure there is an  
                            agreed price with little hassle from the insurance company. 
                        </Box>
                        <Center mt={8}>
                            <Button bgColor='#15FCEC'>Sign Up</Button>
                        </Center>
                    </Box>
                    <Image src='/crash.jpeg' />
                </SimpleGrid>
            </Center>
        </>
    )
}