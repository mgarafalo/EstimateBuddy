import { Center, List, ListItem, Box } from '@chakra-ui/react';
import React from 'react';

export default function HowTo() {
    return (
        <Center color='white' mt='24'>
            <Box w='50%'>
                <List spacing={3}>
                    <ListItem fontSize='2xl'>
                        Create an account by clicking signup - you will be brought to your portal once successful
                    </ListItem>
                    <ListItem fontSize='2xl'>
                        You can request a new estimate & enter a vin from the site randomvin.com
                    </ListItem>
                    <ListItem fontSize='2xl'>
                        Feel free to email any bugs to matt9194@gmail.com
                    </ListItem>
                </List>
            </Box>
        </Center>
    )
}