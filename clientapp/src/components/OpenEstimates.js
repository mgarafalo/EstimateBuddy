import { useContext, useEffect, useState } from "react"
import { Badge, Box, Heading, Image, SimpleGrid } from '@chakra-ui/react'
import { ShopContext } from "../Context/ShopContext"
import { AdminContext } from "../Context/AdminContext"
import { url } from "../App"
import { Loader } from "semantic-ui-react"
import axios from "axios"

export default function OpenEstimates() {
  const { shop } = useContext(ShopContext)
  const { admin } = useContext(AdminContext)

  const [openEstimates, setOpenEstimates] = useState()
  const [loading, setLoading] = useState(false)

  const openEstimatesUrl = url + '/openEstimates'

  function getData() {
    setLoading(true)
    axios.get(openEstimatesUrl, {
      params: {
        username: shop ? shop.username : admin.username
      }
    })
      .then(res => {
        setTimeout(() => {
          setOpenEstimates(res.data.estimates)
          setLoading(false)
        }, 1500)
      })
  }

  useEffect(() => {
    getData()
  }, [])


  return (
    <SimpleGrid columns={3} spacing={10}>
      {!loading && openEstimates ? (
        openEstimates.map(estimate => (
          <Box key={estimate._id} maxW='md' borderWidth='1px' borderRadius='lg'>
            <Image src={estimate.files[0]} alt='No Images Yet' />
            <Box
              fontSize='large'
              color='white'
              fontWeight='semibold'
              lineHeight='tight'
            >
              {estimate.username}
            </Box>
            <Box display='flex' alignItems='baseline'>
              <Badge borderRadius='full' px='2' colorScheme='teal'>{estimate.insuranceCompany}</Badge>
              <Box color='gray.500' fontWeight='semibold' letterSpacing='wide' fontSize='md'>
                {Date(estimate.createdAt)}
              </Box>
            </Box>
          </Box>
        ))
      ) : (
        <Loader active={loading} />
      )}
    </SimpleGrid>
  )
}