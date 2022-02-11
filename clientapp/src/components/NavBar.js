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
            {shop ? (
              <>
                <MenuItem mr={2}>
                  <Heading as='h6' size='md' color='white' style={{ padding: 0 }}>
                    {shop}
                  </Heading>
                </MenuItem>

                <MenuItem as={NavLink} to='/portal' exact='true' style={{ padding: 0 }}>
                  <Button bgColor='#15FCEC' color={'black'} mr={2}>
                    Portal
                  </Button>
                </MenuItem>
                <MenuItem as={NavLink} to='/' exact='true' style={{ padding: 0 }}>
                  <Button bgColor='#989C94' color={'white'} onClick={handleClick}>
                    Logout
                  </Button>
                </MenuItem>
              </>
            ) : (
              <>
                <MenuItem as={NavLink} to='/login' exact='true' style={{ padding: 0 }}>
                  <Button bgColor='#989C94' color={'white'} mr={2}>
                    Login
                  </Button>
                </MenuItem>

                <MenuItem as={NavLink} to='/signup' exact='true' style={{ padding: 0 }}>
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