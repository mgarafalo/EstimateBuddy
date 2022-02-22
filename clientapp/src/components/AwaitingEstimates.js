import { List, ListItem, ListIcon, UnorderedList, Center, Heading, Text } from "@chakra-ui/react";
import { QuestionIcon } from "@chakra-ui/icons";
import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import { url } from "../App";
import axios from "axios";
import { Loader } from "semantic-ui-react";

export default function AwaitingEstimates() {
  const { shop } = useContext(ShopContext)
  const [awaitingEstimates, setAwaitingEstimates] = useState()
  const [loading, setLoading] = useState(false)

  const awaitingEstimatesUrl = url + '/awaitingEstimates'

  function getData() {
    setLoading(true)
    axios.get(awaitingEstimatesUrl, {
      params: {
        username: shop.username
      }
    })
      .then(res => {
        setTimeout(() => {
          setAwaitingEstimates(res.data.estimates)
          setLoading(false)
        }, 1500)
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
          {estimate.year} {estimate.make} {estimate.model} - {estimate.insuranceCompany}
          <UnorderedList spacing={1} ml='12'>
            <ListItem color='white'>
              {estimate.description}
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