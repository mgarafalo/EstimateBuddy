import { SettingsIcon } from "@chakra-ui/icons";
import { Box, Heading, Divider } from "@chakra-ui/react";
import { useContext } from "react";
import { Icon } from "semantic-ui-react";
import { ShopContext } from "../Context/ShopContext";
import PortalActions from "./PortalActions";

export default function Portal() {
	const { shop } = useContext(ShopContext)
	console.log(shop)

	return (
		<>
			<Box mt='20'>
				<Box marginLeft='12%'>
					<Heading size='xl' mb='4' mt='4' color='white'>
						<Icon name="wrench" style={{ color: '#15FCEC' }} />
						{shop.shopName}
					</Heading>					
					<PortalActions />
				</Box>
			</Box>
		</>
	)
}