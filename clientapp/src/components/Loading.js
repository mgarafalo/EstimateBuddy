import { ListItem } from "@chakra-ui/react";
import { Loader } from "semantic-ui-react";

export default function Loading() {
  return (
    <ListItem>
      <Loader active />
    </ListItem>
  )
}