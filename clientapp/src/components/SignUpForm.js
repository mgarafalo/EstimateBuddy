import React, { useRef } from 'react';
import { Form, Button, Checkbox, Input, Label } from 'semantic-ui-react';
import axios from 'axios';
import { url } from '../App';

export default function SignUpForm() {

  const newShopUrl = url + '/signup';
  const shopNameInput = useRef(null)
  const shopUsernameInput = useRef(null)
  const shopPasswordInput = useRef(null)
  const shopEmailInput = useRef(null)
  const shopPhoneNumberInput = useRef(null)

  function handleSubmit(e) {
    const contactInfo = {
      shopName: shopNameInput.current.inputRef.current.value,
      username: shopUsernameInput.current.inputRef.current.value,
      password: shopPasswordInput.current.inputRef.current.value,
      phoneNumber: shopPhoneNumberInput.current.inputRef.current.value,
      email: shopEmailInput.current.inputRef.current.value
    }

    console.log(contactInfo)

    axios.get(newShopUrl, {
      params: {
        contactInfo
      }
    })
      .then(res => console.log(res))
  }

  return (
    <Form style={{ margin: 'auto', width: '50%', marginTop: 120 }} onSubmit={(e) => handleSubmit(e)}>
      <Form.Field>
        <Label style={{ color: 'white' }} content='Shop Name' />
        <Input ref={shopNameInput} focus name='shopName' placeholder='Shop Name' />
      </Form.Field>
      <Form.Field>
        <Label style={{ color: 'white' }} content='Username' />
        <Input ref={shopUsernameInput} focus name='username' placeholder='Username' />
      </Form.Field>
      <Form.Field>
        <Label style={{ color: 'white' }} content='Password' />
        <Input ref={shopPasswordInput} focus name='password' placeholder='Password' />
      </Form.Field>
      <Form.Field>
        <Label style={{ color: 'white' }} content='Email Address' />
        <Input ref={shopEmailInput} focus name='email' placeholder='Email Address' />
      </Form.Field>
      <Form.Field>
        <Label style={{ color: 'white' }} content='Phone Number' />
        <Input ref={shopPhoneNumberInput} focus name='phoneNumber' placeholder='Phone Number' />
      </Form.Field>
      <Form.Field>
        <Checkbox label='I agree to the Terms and Conditions' />
      </Form.Field>
      <Button style={{ backgroundColor: '#15FCEC' }} type='submit' content='Submit' />
    </Form>
  )
}