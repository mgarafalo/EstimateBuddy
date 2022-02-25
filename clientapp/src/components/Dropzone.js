import { Box, Center, Input, List, ListItem, Heading } from '@chakra-ui/react'
import axios from 'axios'
import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { url } from '../App'

export default function PhotoDropzone({ files, updateFiles, shopName, vin }) {

  const FormData = require('form-data');

  const imageUrl = url + '/imageUpload'

  const onDrop = (file) => {
    // console.log(file)
    let formData = new FormData()
    console.log(file[0])
    formData.append('file', file[0])
    formData.append('shopName', shopName)
    formData.append('vin', vin)

    try {
      axios.post(imageUrl, formData, {
        headers: {'content-type': 'multipart/form-data'}
      })
        .then(res => console.log(res))
        .catch(err => console.log(err))
    } catch (err) {
      console.log(err)
    }
  }
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <>
      <Center
        mt='5'
        p='10'
        w='50%'
        bgColor='#989C94'
        borderRadius={10}
        style={{ boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px' }}
      >
        <Box {...getRootProps()}>
          <Input {...getInputProps()} />
          {
            isDragActive ?
              <p>Drop the files here ...</p> :
              <p>Drag 'n' drop some files here, or click to select files</p>
          }
        </Box>
      </Center>
    </>
  )
}