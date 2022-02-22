import { Box, Button, Flex, FormControl, FormHelperText, FormLabel, Heading, Input, Spacer } from "@chakra-ui/react";
import axios from "axios";
import { useRef, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { url } from "../App";
import NewVehicle from "./NewVehicle";
import { ShopContext } from "../Context/ShopContext";

export default function NewEstimate() {
  const { shop } = useContext(ShopContext)

  const [vehicle, setVehicle] = useState()
  const [error, setError] = useState()
  const [loading, setLoading] = useState(false)

  const vinInput = useRef(null)

  const navigate = useNavigate()

  useEffect(() => window.scrollTo(0,0), [])

  function getVehicalData(vin) {
    const vinUrl = url + '/vin'

    axios.get(vinUrl, {
      params: {
        vin: vin
      }
    })
      .then(res => {
        console.log(res)
        setTimeout(() => {
          setLoading(false)
          if (!res.data.error) {
            setVehicle(res.data.vehicle)
          } else {
            setError(res.data.error)
          }
        }, 1000);
      })
  }

  function handleClick() {
    const vin = vinInput.current.value
    if (vin !== '') {
      setLoading(true)
      setError(false)
      getVehicalData(vin)
    } else {
      setError('Please enter a vin')
    }
  }

  function handleSubmit(estimateRequest) {
    const newEstimateUrl = url + '/newEstimateRequest'

    axios.get(newEstimateUrl, {
      params: {
        insuranceCompany: estimateRequest.insuranceCompany,
        username: shop.username,
        description: estimateRequest.damageDescription,
        vin: estimateRequest.vehicle.vin,
        year: estimateRequest.vehicle.year,
        model: estimateRequest.vehicle.model,
        make: estimateRequest.vehicle.make,
        files: estimateRequest.files
      }
    }).then(res => {
      console.log(res.data)
      window.scrollTo(0,0)
      navigate('/portal')
    })

  }

  return (
    <>
      <Box ml='12%' mt='20'>
        <Heading size='2xl' color='white'>New Estimate Request</Heading>
        {!vehicle ? (
          <Box mt='20'>
            <FormControl>
              <Heading size='xl' color='white' htmlFor="vin">VIN:</Heading>
              <Input
                ref={vinInput}
                mt='2'
                w='20%'
                size='lg'
                isInvalid={error}
                errorBorderColor="crimson"
                color='white'
                variant='flushed'
                placeholder="Enter Vehicle's Vin"
              />
              <Button
                ml='8'
                color='black'
                bgColor='#15FCEC'
                isLoading={loading}
                onClick={handleClick}>
                Submit VIN
              </Button>
              {error && (
                <FormHelperText color='crimson' size='lg'>
                  {error}
                </FormHelperText>
              )}
            </FormControl>
          </Box>
        ) : (
          <>
            <NewVehicle vehicle={vehicle} submit={handleSubmit} />
          </>
        )}
      </Box>
    </>
  )
}