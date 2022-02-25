import axios from 'axios';
import React, { useContext, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Label, Input, Button } from 'semantic-ui-react';
import { FormControl, FormHelperText } from '@chakra-ui/react';
import { url } from '../App';
import { ShopContext } from '../Context/ShopContext';



export default function Login() {
  const { setShop } = useContext(ShopContext)

  const [error, setError] = useState()
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const shopUsername = useRef(null);
  const shopPassword = useRef(null);

  const loginUrl = url + '/login'

  function handleClick() {
    setError(null)
    setLoading(true)

    axios.get(loginUrl, {
      params: {
        username: shopUsername.current.inputRef.current.value,
        password: shopPassword.current.inputRef.current.value
      }
    })
      .then(res => {
        // console.log(res)
        if (res.data.error) {
          setError(res.data.error)
          setLoading(false)
        } else {
          setTimeout(() => {
            setShop(res.data.shop)
            setLoading(false)
            navigate('/portal')
          }, 1000);
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
        <Label style={{ color: 'white' }} content='Username' />
        <Input ref={shopUsername} focus name='username' placeholder='Username' />
      </Form.Field>
      <Form.Field>
        <Label style={{ color: 'white' }} content='Password' />
        <Input ref={shopPassword} focus type='password' name='password' placeholder='Password' />
      </Form.Field>
      <Button onClick={handleClick} loading={loading} style={{ backgroundColor: '#15FCEC', marginTop: 8 }} type='submit' content='Login' />
    </Form>
  )
}