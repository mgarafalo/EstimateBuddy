import React, { useContext } from 'react';
import { Box, Image, SimpleGrid, Button, Center, Heading, List, ListItem, ListIcon } from '@chakra-ui/react';
import { CheckCircleIcon, MdCheckCircle, MdSettings, SettingsIcon } from '@chakra-ui/icons'
import { ShopContext } from '../Context/ShopContext';
import { NavLink } from 'react-router-dom';

export default function HomePage() {

  const Shop = useContext(ShopContext)
  console.log(Shop)

  return (
    <>
      <Center>
        <Box className='overlayContainerMain' width={'100%'} mt='40px' position='relative'>
          <Box className='overlayContainer' mt={10} position='absolute' w='100%'>
            <SimpleGrid columns={2} spacing={20}>
              <Box>
                <Heading className='overlayContent' as='h3' textAlign='center' w={'50%'} color='white' fontWeight='semibold' position='absolute'>
                  Estimate Buddy
                </Heading>
                <Box mt={16} className='overlayContent' as='p' fontSize='22' textAlign='center' color='white'>
                  We aim to produce well documented and accurate estimates in order to
                  increase your shop's productivity while reducing the stress of going back
                  and forth with the insurance company.
                </Box>
                <Box mt={8} className='overlayContent' as='p' fontSize='22' textAlign='center' color='white'>
                  Our team consists of experienced estimators with years of experience
                  working for a range of insurance companies. With our diverse background
                  we are ready to answer every question an insurance representative will have
                  regarding our estimate.
                </Box>
                <Box mt={8} className='overlayContent' as='p' fontSize='22' textAlign='center' color='white'>
                  The estimates written for your clients repair will meet all criteria required
                  by most insurance companies. Our proven process will ensure there is an
                  agreed price with little hassle from the insurance company.
                </Box>
              </Box>
              <Box>
                <Heading color={'white'} textAlign='center'>Get Started Today!</Heading>
                <Center mt={2}>
                  <List spacing={3}>
                    <ListItem color='white' mt={4} fontSize='16'>
                      <ListIcon as={CheckCircleIcon} color='#15FCEC' />
                      Well documented estimates catered to the insurance company's policies
                    </ListItem>
                    <ListItem color='white' mt={4} fontSize='16'>
                      <ListIcon as={CheckCircleIcon} color='#15FCEC' />
                      Only have one point of contact to handle all your shop's needs
                    </ListItem>
                    <ListItem color='white' mt={4} fontSize='16'>
                      <ListIcon as={CheckCircleIcon} color='#15FCEC' />
                      Gauranteed 48 hour estimate delivery
                    </ListItem>
                  </List>
                </Center>
                <Center mt={10}>
                  <Button as={NavLink} to='/signup' bgColor={'#15FCEC'} justifySelf='center'>Sign Up</Button>
                </Center>
              </Box>
            </SimpleGrid>
          </Box>
          <Image
            className='overlayImage'
            src='/crash.jpeg'
            zIndex={-1}
            maxHeight='650px'
            width={'100%'}
            opacity={0.3}
            position='absolute'
          />
        </Box>
      </Center>
    </>
  )
}