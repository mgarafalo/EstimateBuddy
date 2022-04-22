import { List, ListItem, ListIcon, UnorderedList, Center, Heading, Text, Divider, Button } from "@chakra-ui/react";
import { QuestionIcon } from "@chakra-ui/icons";
import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import { url } from "../App";
import axios from "axios";
import { Loader } from "semantic-ui-react";
import { AdminContext } from "../Context/AdminContext";

export default function AwaitingEstimates() {
  const { shop } = useContext(ShopContext)
  const { admin } = useContext(AdminContext)
  const [awaitingEstimates, setAwaitingEstimates] = useState()
  const [loading, setLoading] = useState(false)
  const [buttonLoading, setButtonLoading] = useState(false)
  const [error, setError] = useState(null)

  const awaitingEstimatesUrl = url + '/awaitingEstimates'
  const markOpenUrl = url + '/markOpen'

  function getData() {
    setLoading(true)
    axios.get(awaitingEstimatesUrl, {
      params: {
        username: shop ? shop.username : admin.username
      }
    })
      .then(res => {
        setTimeout(() => {
          setAwaitingEstimates(res.data.estimates)
          setLoading(false)
        }, 1500)
      })
  }

  function handleError(error) {
    setTimeout(() => {
      setError(error)
      setButtonLoading(false)
    }, 1000);
  }

  function markOpen(id) {
    setButtonLoading(true)
    console.log(admin)
    axios.get(markOpenUrl, {
      params: {
        id: id,
        user: admin
      }
    }).then(res => {
      console.log(res.data)
      res.data.error 
        ? handleError(res.data.error)
        : setTimeout(() => {
        getData()
        setButtonLoading(false)
      }, 1500);
    })
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <List spacing={3}>
      {(!loading && awaitingEstimates) ? awaitingEstimates.map(estimate => (
        <ListItem key={estimate._id} color='white'>
          <ListIcon as={QuestionIcon} color='#15FCEC' />
          {admin && estimate.username + ' - '}
          {estimate.year} {estimate.make} {estimate.model} - {estimate.vin} - {estimate.insuranceCompany}
          <UnorderedList spacing={1} ml='12'>
            <ListItem color='white'>
              {estimate.description}
            </ListItem>
            <ListItem listStyleType='none'>
              <Button 
                isLoading={buttonLoading} 
                size='xs' 
                bgColor='#12FCEC' 
                color='black'
                onClick={() => markOpen(estimate._id)}
              >
                Mark Open
              </Button>
            </ListItem>
          </UnorderedList>
        </ListItem>
      )) : (
        <ListItem mt='4'>
          <Loader active />
        </ListItem>
      )}
    </List>
  )
}