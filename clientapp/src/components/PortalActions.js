import { PlusSquareIcon } from "@chakra-ui/icons";
import { Button, Heading, Box, Flex, Spacer, Link } from "@chakra-ui/react";
import PortalTabs from "./PortalTabs";
import { NavLink } from 'react-router-dom';


export default function PortalActions() {
	return (
		<>
			<Flex width='90%' mt='12'>
				<Box>
					<Heading size='xl' mt='12' color='white'>Actions</Heading>
				</Box>
				<Spacer />
				<Box>
					<Link as={NavLink} to='/newEstimate'>
						<Button bgColor='#15FCEC'><PlusSquareIcon color='black' mr='1' />New Estimate</Button>
					</Link>
				</Box>
			</Flex>
			<PortalTabs />
		</>
	)
}