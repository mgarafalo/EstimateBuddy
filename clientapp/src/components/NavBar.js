import React, { useContext } from 'react';
import { Container, Menu, MenuItem, MenuMenu } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom';
import { Button, Heading } from '@chakra-ui/react';
import { ShopContext } from '../Context/ShopContext';

export default function NavBar() {
  
  const { shop, setShop } = useContext(ShopContext)

  function handleClick() {
    setShop(null)
  }

  return (
    <>
      <Menu className='Nav' style={{ zIndez: 1000, height: 40 }} fixed='top'>
        <Container>
          <MenuItem as={NavLink} style={{ color: 'white' }} to='/' exact='true' header>
            EstimateBuddy
          </MenuItem>
          <MenuItem as={NavLink} style={{ color: 'white' }} to='/howto' exact='true'>
            How It Works
          </MenuItem>

          <MenuMenu position='right'>
            {shop && (
              <>
                <MenuItem>
                  <Heading as='h6' size='md' color='white'>
                    {shop}
                  </Heading>
                </MenuItem>

                <MenuItem as={NavLink} to='/' exact='true'>
                  <Button bgColor='#989C94' mr={2} color={'white'} onClick={handleClick}>
                    Logout
                  </Button>
                </MenuItem>
              </>
            )}
            {!shop && (
              <>
                <MenuItem as={NavLink} to='/login' exact='true'>
                  <Button bgColor='#989C94' mr={2} color={'white'}>
                    Login
                  </Button>
                </MenuItem>

                <MenuItem as={NavLink} to='/signup' exact='true'>
                  <Button bgColor='#15FCEC'>
                    Sign Up
                  </Button>
                </MenuItem>
              </>
            )}
          </MenuMenu>
        </Container>
      </Menu>
    </>
  )
}