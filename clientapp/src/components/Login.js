import axios from 'axios';
import React, { useContext, useRef } from 'react';
import { Form, Label, Input, Button } from 'semantic-ui-react';
import { url } from '../App';
import { ShopContext } from '../Context/ShopContext';



export default function Login() {

  const loginUrl = url + '/login'

  const shopUsername = useRef(null);
  const shopPassword = useRef(null);

  const { shop, setShop } = useContext(ShopContext)
  console.log(shop)

  function handleClick() {
    axios.get(loginUrl, {
      params: {
        username: shopUsername.current.inputRef.current.value,
        password: shopPassword.current.inputRef.current.value
      }
    })
      .then(res => {
        console.log(res)
        if (res.data.error) {
          console.log('worked')
        } else {
          setShop(res.data.shopName)
        }
      })
  }

  return (
    <Form style={{ margin: 'auto', marginTop: 120, width: '30%' }}>
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