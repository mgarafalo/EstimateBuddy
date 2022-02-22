import axios from 'axios';
import React, { useContext, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Label, Input, Button } from 'semantic-ui-react';
import { FormControl, FormHelperText } from '@chakra-ui/react';
import { url } from '../App';
import { ShopContext } from '../Context/ShopContext';



export default function Login() {
  const [error, setError] = useState()

  const { shop, setShop } = useContext(ShopContext)

  const loginUrl = url + '/login'
  const navigate = useNavigate()

  const shopUsername = useRef(null);
  const shopPassword = useRef(null);

  function handleClick() {
    setError(null)

    axios.get(loginUrl, {
      params: {
        username: shopUsername.current.inputRef.current.value,
        password: shopPassword.current.inputRef.current.value
      }
    })
      .then(res => {
        console.log(res)
        if (res.data.error) {
          setError(res.data.error)
        } else {
          setShop(res.data.shop)
          navigate('/portal')
        }
      })
  }

  return (
    <Form style={{ margin: 'auto', marginTop: 120, width: '30%' }}>
      {error && (
        <FormControl>
          <FormHelperText color='crimson' size='lg'>
            {error}
          </FormHelperText>
        </FormControl>
      )}
      <Form.Field>
        <Label style={{ color: 'white' }} content='Shop Name' />
        <Input ref={shopUsername} focus name='shopName' placeholder='Username' />
      </Form.Field>
      <Form.Field>
        <Label style={{ color: 'white' }} content='Password' />
        <Input ref={shopPassword} focus name='password' placeholder='Password' />
      </Form.Field>
      <Button onClick={handleClick} style={{ backgroundColor: '#15FCEC', marginTop: 8 }} type='submit' content='Login' />
    </Form>
  )
}