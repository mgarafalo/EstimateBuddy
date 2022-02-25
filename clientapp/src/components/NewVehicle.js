import { Box, Button, Divider, Flex, FormControl, FormHelperText, FormLabel, Heading, Input, List, ListItem, Select, Textarea, Text, Spacer } from "@chakra-ui/react";
import { useState, useRef, useContext } from "react";
import PhotoDropzone from "./Dropzone";
import { useNavigate } from "react-router-dom";
import { url } from "../App";
import axios from "axios";
import { ShopContext } from "../Context/ShopContext";

export default function NewVehicle({ vehicle, error, setRequestError }) {
  const { shop } = useContext(ShopContext)

  const [files, setFiles] = useState([])
  const [loading, setLoading] = useState(false)
  const [otherInput, setOtherInput] = useState(false)
  const [insuranceCompanyError, setInsuranceCompanyError] = useState(false)

  const insuranceCompanySelect = useRef(null)
  const insuranceCompanyInput = useRef(null)
  const damageDescriptionTextarea = useRef(null)

  const navigate = useNavigate()

  const estimate = {
    insuranceCompany: '',
    damageDescription: '',
    vehicle: vehicle,
  }
  const [newEstimate, setNewEstimate] = useState(estimate)

  function updateFiles(file) {
    console.log(file)
    setFiles(files.push(file))
  }

  function updateDamageDescription() {
    // console.log(damageDescriptionTextarea.current.value)
    setNewEstimate({ ...newEstimate, damageDescription: damageDescriptionTextarea.current.value })
  }

  function updateInsuranceCompany() {
    setNewEstimate({ ...newEstimate, insuranceCompany: insuranceCompanyInput.current.value })
  }

  function handleChange() {
    setInsuranceCompanyError(false)
    setOtherInput(false)

    const company = insuranceCompanySelect.current.value

    if (company !== 'none' && company !== 'other') {
      setNewEstimate({ ...newEstimate, insuranceCompany: company })
    } else if (company === 'none') {
      setInsuranceCompanyError('Please select a valid insurance company')
    } else if (company === 'other') {
      setOtherInput(true)
    }
  }

  function handleSubmit() {
    console.log(files)
    setLoading(true)
    const newEstimateUrl = url + '/newEstimateRequest'

    axios.get(newEstimateUrl, {
      params: {
        insuranceCompany: newEstimate.insuranceCompany,
        username: shop.username,
        description: newEstimate.damageDescription,
        vin: newEstimate.vehicle.vin,
        year: newEstimate.vehicle.year,
        model: newEstimate.vehicle.model,
        make: newEstimate.vehicle.make,
        files: files
      }
    }).then(res => {
      console.log(res)
      if (res.data.error) {
        setLoading(false)
        setRequestError(res.data.error)
      } else {
        setTimeout(() => {
          setLoading(false)
          window.scrollTo(0, 0)
          navigate('/portal')
        }, 2000)
      }
    })
      .catch(err => console.log(err))
  }


  // function handleClick() {
  //   handleSubmit(newEstimate)
  // }

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
            <option value='Geico'>Geico</option>
            <option value='Progressive'>Progressive</option>
            <option value='AllState'>AllState</option>
            <option value='Nationwide'>Nationwide</option>
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
            onChange={updateInsuranceCompany}
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
        <Box width='100%'>
          <PhotoDropzone files={files} updateFiles={updateFiles} shopName={shop.shopName} vin={newEstimate.vehicle.vin} />
        </Box>
        <Box mt='8'>
          <Heading size='md' color='white'>Files:</Heading>
          <List spacing={3}>
            {console.log(files)}
            {/* {files && files.map((file, idx) => {
              console.log(file.name)
              return (
                <>
                  <ListItem key={idx} color='white'>
                    {file.name}
                  </ListItem>
                </>
              )
            })} */}
          </List>
        </Box>
      </Box>

      <Flex w='85%'>
        <Spacer />
        {error && (
          <Text mr='6' mt='2' color='crimson' size='lg'>
            {error}
          </Text>
        )}
        <Button loading={loading} bgColor='#15FCEC' onClick={handleSubmit}>Submit Request</Button>
      </Flex>
    </>
  )
}