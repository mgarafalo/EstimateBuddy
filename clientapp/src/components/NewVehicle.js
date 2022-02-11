import { Box, Divider, Flex, FormControl, FormHelperText, FormLabel, Heading, Input, List, ListItem, Select, Textarea } from "@chakra-ui/react";
import { useState, useEffect, useRef } from "react";
import PhotoDropzone from "./Dropzone";

export default function NewVehicle({ vehicle }) {
  const [files, setFiles] = useState([])
  const [otherInput, setOtherInput] = useState(false)
  const [insuranceCompanyError, setInsuranceCompanyError] = useState(false)

  const estimate = {
    insuranceCompany: '',
    damageDescription: '',
    vehicle: vehicle
  }
  const [newEstimate, setNewEstimate] = useState(estimate)

  const insuranceCompanySelect = useRef(null)
  const insuranceCompanyInput = useRef(null)
  const damageDescriptionTextarea = useRef(null)

  function updateDamageDescription() {
    console.log(damageDescriptionTextarea.current.value)
    setNewEstimate({...newEstimate, damageDescription: damageDescriptionTextarea.current.value})
  }

  function handleChange() {
    setInsuranceCompanyError(false)
    const company = insuranceCompanySelect.current.value
    if (company === 'none') setInsuranceCompanyError('Please select a valid insurance company')
    company === 'other' ? setOtherInput(true) : setOtherInput(false)
  }

  return (
    <>
      <Heading mt='20' size='xl' color='white'>
        {vehicle.year} {vehicle.make} {vehicle.model}
      </Heading>
      <Heading mt='1' size='lg' color='white'>
        {vehicle.vin}
      </Heading>

      <Divider mt='15' w='80%' />

      <FormControl mt='10'>
        <Flex>
          <FormLabel
            htmlFor="insurance"
            whiteSpace='nowrap'
            mt='1'
            ml='1'
            color='white'
            fontSize='medium'
          >
            Insurance Company
          </FormLabel>
          <Select
            variant='filled'
            ref={insuranceCompanySelect}
            w='20%'
            whiteSpace='nowrap'
            bgColor='#989C94'
            color='black'
            onChange={handleChange}
            defaultValue='Select Insurance Company'
          >
            <option value='none'>Select Insurance Company...</option>
            <option value='geico'>Geico</option>
            <option value='progressive'>Progressive</option>
            <option value='allState'>AllState</option>
            <option value='nationwide'>Nationwide</option>
            <option value='other'>Other</option>
          </Select>

          <FormLabel
            hidden={!otherInput}
            whiteSpace='nowrap'
            mt='1'
            ml='8'
            color='white'
            fontSize='medium'
          >
            Enter Insurance Company Name
          </FormLabel>
          <Input
            ref={insuranceCompanyInput}
            hidden={!otherInput}
            w='20%'
            bgColor='#989C94'
            focusBorderColor='#15FCEC'
            type='text'
            id='insurance'
            required={otherInput ? true : false}
          />
        </Flex>
        {insuranceCompanyError && (
          <FormHelperText ml='13%' color='crimson' fontSize='medium'>
            {insuranceCompanyError}
          </FormHelperText>
        )}

        <Flex mt='4'>
          <FormLabel
            color='white'

            fontSize='medium'
            whiteSpace='nowrap'
          >
            Damage Description
          </FormLabel>
          <Textarea
            value={newEstimate.damageDescription}
            ref={damageDescriptionTextarea}
            onChange={updateDamageDescription}
            resize='none'
            color='white'
            w='25%'
          />
        </Flex>
      </FormControl>

      <Box mt='20'>
        <Heading size='md' color='white'>
          Please upload all photos taken of the vehicle
          including clear photos of the VIN and all damage related to the loss
        </Heading>
        <Box
          mt='5'
          w='50%'
          bgColor='#989C94'
          borderRadius={10}
          style={{ boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px' }}
        >
          <PhotoDropzone files={files} setFIles={setFiles} />
        </Box>

        <Box>
          <Heading size='md' color='white'>Files:</Heading>
          <List spacing={3}>
            {files.length && files.map((file, i) => {
              return (
                <>
                  <ListItem key={i} color='white'>
                    {file[0].name}
                  </ListItem>
                </>
              )
            })}
          </List>
        </Box>
      </Box>
    </>
  )
}