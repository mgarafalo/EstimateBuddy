import { Box, Center, Input, List, ListItem, Heading } from '@chakra-ui/react'
import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'

export default function PhotoDropzone({files, setFiles}) {
  
  const onDrop = useCallback(acceptedFiles => {
    setFiles(files.push(acceptedFiles))
    console.log('uploaded')
  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <Center>
      <Box p='10' {...getRootProps()}>
        <Input {...getInputProps()} />
        {
          isDragActive ?
            <p>Drop the files here ...</p> :
            <p>Drag 'n' drop some files here, or click to select files</p>
        }
      </Box>
    </Center>
  )
}