import { List, ListItem, ListIcon, UnorderedList } from "@chakra-ui/react";
import { QuestionIcon } from "@chakra-ui/icons";

export default function AwaitingEstimates() {
  return (
    <List spacing={3}>
      <ListItem color='white'>
        <ListIcon as={QuestionIcon} color='#15FCEC' />
        2014 Honda Accord - Geico
          <UnorderedList spacing={1} ml='12'>
            <ListItem color='white'>
              Front End Damage
            </ListItem>
            <ListItem color='white'>
              No Airbags
            </ListItem>
          </UnorderedList>
      </ListItem>
      <ListItem color='white'>
        <ListIcon as={QuestionIcon} color='#15FCEC' />
        2014 Honda Accord - Geico
          <UnorderedList spacing={1} ml='12'>
            <ListItem color='white'>
              Front End Damage
            </ListItem>
            <ListItem color='white'>
              No Airbags
            </ListItem>
          </UnorderedList>
      </ListItem>
      <ListItem color='white'>
        <ListIcon as={QuestionIcon} color='#15FCEC' />
        2014 Honda Accord - Geico
          <UnorderedList spacing={1} ml='12'>
            <ListItem color='white'>
              Front End Damage
            </ListItem>
            <ListItem color='white'>
              No Airbags
            </ListItem>
          </UnorderedList>
      </ListItem>
    </List>
  )
}