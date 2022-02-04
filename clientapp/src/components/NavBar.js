import React from 'react';
import { Container, Menu, MenuItem, MenuMenu } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom';
import { Button } from '@chakra-ui/react';

export default function NavBar() {
    return (
        <>
            <Menu className='Nav' style={{zIndez: 1000, height: 40}} fixed='top'>
                <Container>
                    <MenuItem as={NavLink} style={{color: 'white'}} to='/' exact='true' header>
                        EstimateBuddy
                    </MenuItem>
                    <MenuItem as={NavLink} style={{color: 'white'}} to='/howto' exact='true'>
                        How It Works
                    </MenuItem>
                
                    <MenuMenu position='right'>
                        <MenuItem as={NavLink} to='/signup' exact='true'>
                            <Button bgColor='#989C94' mr={2} color={'white'}>
                                Login
                            </Button>
                            <Button bgColor='#15FCEC'>
                                Sign Up
                            </Button>
                        </MenuItem>
                    </MenuMenu>
                </Container>
            </Menu>
        </>
    )
}