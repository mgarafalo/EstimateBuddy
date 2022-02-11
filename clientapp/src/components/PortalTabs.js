import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import AwaitingEstimates from "./AwaitingEstimates";

export default function PortalTabs() {
  return (
    <Tabs isFitted variant='enclosed' width='90%' mt='8'>
      <TabList>
        <Tab color='white' _selected={{color: 'black', bg: '#15FCEC'}}>Awaiting Estimate</Tab>
        <Tab color='white' _selected={{color: 'black', bg: '#15FCEC'}}>Open Estimates</Tab>
        <Tab color='white' _selected={{color: 'black', bg: '#15FCEC'}}>Closed Estimates</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <AwaitingEstimates />
        </TabPanel>
        <TabPanel>
          <p>two!</p>
        </TabPanel>
        <TabPanel>
          <p>three!</p>
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}