import { Container, Box, Text } from '@chakra-ui/react'
import React from 'react'
import { Tab, TabList, TabPanel,TabPanels,Tabs } from '@chakra-ui/react'
import Signup from '../components/authentication/Signup'
import Login from '../components/authentication/Login'
import { useHistory } from 'react-router-dom'
import { useEffect } from 'react'

const HomePage = () => {

//   const history = useHistory();

//     useEffect(()=>{
//         const user = JSON.parse(localStorage.getItem("userInfo"));
        

//         if(user) history.push("/chats");
      


//     }, [history ])


  return (

    
    <Container maxW="xl" centerContent>
        <Box
            display="flex"
            p={3}
            justifyContent="center"
            bg={"white"}
            w="100%"
            m="40px 0 15px 0"
            borderRadius="lg"
            borderWidth="1px"
        >
            <Text fontSize="4xl" fontFamily="Work sans" color="black">
                Talk-A-Bit
            </Text>
        </Box>
        <Box bg={"white"} borderRadius="lg" borderWidth="1px" width="100%" p={4}>
            <Tabs variant='soft-rounded'>
  <TabList>
    <Tab>Log in</Tab>
    <Tab>Sign Up</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>
      <Login></Login>
    </TabPanel>
    <TabPanel>
      <Signup></Signup>
    </TabPanel>
  </TabPanels>
</Tabs>
        </Box>
    </Container>
   )
}

export default HomePage