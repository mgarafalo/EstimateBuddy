import { Box, Center, Input, List, ListItem, Heading } from '@chakra-ui/react'
import axios from 'axios'
import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { url } from '../App'

export default function PhotoDropzone({ files, updateFiles }) {

  const FormData = require('form-data');

  const imageUrl = url + '/imageUpload'

  // const onDrop = useCallback(file => {
  //   // updateFiles(acceptedFiles)

  //   console.log(newFile)
  //   // axios.post(imageUrl, {
  //   //   params: {
  //   //     image: acceptedFiles
  //   //   }
  //   // })
  //   //   .then(res => console.log(res))
  //   //   .catch(err => console.log(err))
  // }, [])
  const onDrop = (file) => {
    console.log(file)
    let formData = new FormData()
    formData.append('api_key', '964149184881432')
    formData.append('file', file)
    formData.append('upload_preset', 'kjdqgdwt')
    // formData.cloud_name = 'dmizsfnhe'
    // formData.api_key = '964149184881432'
    // formData.api_secret = '04gwMlpSnFMIuKw-8dHy59AtTO0'
    // formData.file = file[0]
    // formData.upload_preset = 'kjdqgdwt'

    try {
      axios.post(imageUrl, formData)
        // axios.post('https://api.cloudinary.com/v1_1/dmizsfnhe/upload', formData, {
        //   headers: {
        //     'accept': 'application/json',
        //     'Accept-Language': 'en-US,en;q=0.8',
        //     'Content-Type': formData.type
        //   }
        // })
        // headers: {
        //   'accept': 'application/json',
        //   'Accept-Language': 'en-US,en;q=0.8',
        //   'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
        // }
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