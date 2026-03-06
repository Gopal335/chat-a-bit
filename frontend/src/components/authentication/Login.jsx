import React from 'react'
import { useState } from 'react';
import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, position, VStack} from '@chakra-ui/react';
import axios from 'axios';
import { useToast } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import { ChatState } from '../../context/ChatProvider';
// import { application } from 'express';


function Login() {
 
  
       const[email,setEmail]=useState("");
       const[password,setPassword]=useState("");
       const[show,setShow]=useState(false);
       const[loading, setLoading]=useState(false);
    
       const toast = useToast();
       const history = useHistory(); 
       const {setUser} = ChatState();
       const submitHandler=async()=>{

        setLoading(true);
        if(!email || !password){
            toast({
                title: "Please Fill all the details",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "button",
            });
            setLoading(false);
            return;
        }
        try{
        const config={
            headers:{
              "Content-type":  "application/json",
            },
        }
        const {data}=await axios.post('/api/user/login',
            {email,password}, config
        );
        toast({
            title: "Login Successful",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "button",
        });
        localStorage.setItem("userInfo", JSON.stringify(data));
        setLoading(false);
        setUser(data);
        history.push("/chats");
    }
    catch(error){
        toast({
            title: "Error Occured!",
            description: error.response.data.message,
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "button" 
        })
        setLoading(false);
       
    }
       };


     return (
       <VStack spacing={"5px"} color="black">
           
           <FormControl id="email" isRequired>
               <FormLabel >
                   Email
               </FormLabel>
               <Input 
               placeholder='Enter your Email'
               onChange={(e)=>setEmail(e.target.value)}
               value={email}
               >
                   </Input>
           </FormControl>
           <FormControl id="password" isRequired>
               <InputGroup>
               <FormLabel >
                   Enter Password
               </FormLabel>
               <Input 
               placeholder='Enter password'
               type={show ?"text":"password"}
               onChange={(e)=>setPassword(e.target.value)}
               value={password}
               >
                   </Input>
                   <InputRightElement width="4.5rem">
                   <Button width="1.75rem " size="sm" onClick={()=>setShow(!show)}>
                       {show ? "hide":"show"}
                   </Button>
   
                   </InputRightElement>
                   </InputGroup>
           </FormControl>
           <Button
               colorScheme='blue'
               width={"100%"}
               style={{marginTop: 15}}
               isLoading={loading}
               onClick={submitHandler}
           >
               Login
           </Button>
           <Button
            colorScheme='red'
               width={"100%"}
               style={{marginTop: 15}}
               onClick={()=>{
                    setEmail("guest21@gmail.com");
                    setPassword("Guest@12");
               }}
           >
             Get User Credentials
           </Button>

       </VStack>
  )
}

export default Login