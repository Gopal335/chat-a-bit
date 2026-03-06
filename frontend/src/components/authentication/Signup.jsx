import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, useToast, VStack} from '@chakra-ui/react'
import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { ChatState } from '../../context/ChatProvider';

function Signup() {

    const[name,setName]=useState();
    const[email,setEmail]=useState();
    const[password,setPassword]=useState();
    const[confirmpassword,setConfirmPassword]=useState();
    const[show,setShow]=useState(false);
    const[cshow, setcShow]=useState(false);
    const[pic, setPic]=useState();
    const[loading, setLoading] = useState(false);
    const toast=useToast();
    const history = useHistory();
    const {setUser} = ChatState();

    const postDetails = (file) => {
  setLoading(true);

  if (!file) {
    toast({
      title: "Please select an image!",
      status: "warning",
      duration: 5000,
      isClosable: true,
      position: "bottom",
    });
    setLoading(false);
    return;
  }

  // Validate file type
  if (file.type !== "image/jpeg" && file.type !== "image/png") {
    toast({
      title: "Only JPEG and PNG images are allowed!",
      status: "warning",
      duration: 5000,
      isClosable: true,
      position: "bottom",
    });
    setLoading(false);
    return;
  }

  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "chat-app"); // Must exist in Cloudinary
  data.append("cloud_name", "dp2pdjogz");

  fetch("https://api.cloudinary.com/v1_1/dp2pdjogz/image/upload", {
    method: "POST",
    body: data,
  })
    .then((res) => res.json())
    .then((response) => {
      if (response.secure_url) {
        setPic(response.secure_url);
      } else {
        throw new Error("Upload failed");
      }
      setLoading(false);
    })
    .catch((err) => {
      console.error("Cloudinary Error:", err);
      toast({
        title: "Image upload failed!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    });
};


    const submitHandler=async()=>{
        setLoading(true);
        if(!name || !email || !password || !confirmpassword){
            toast({
                title: "Please fill all the fields",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            })
            setLoading(false);
            return;
        }
        if(password != confirmpassword){
            toast({
                title: "Password do not match",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            })
            
            return;
        }
        try{
            const config={
                headers:{
                    "Content-type": "application/json"
                },
            }

            const {data}=await axios.post("/api/user",
                {name, email, password, pic},
                config
            );
            toast({
                title: "Registration Successful",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            })
            
            localStorage.setItem("userInfo", JSON.stringify(data));

            setLoading(false);
            setUser(data);
            history.push("/chats");
        }

        catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }

    };


  return (
    <VStack spacing={"5px"} color="black">
        <FormControl id="name" isRequired>
            <FormLabel >
                Name
            </FormLabel>
            <Input 
            placeholder='Enter your Name'
            onChange={(e)=>setName(e.target.value)}>
                </Input>
        </FormControl>
        <FormControl id="email" isRequired>
            <FormLabel >
                Email
            </FormLabel>
            <Input 
            placeholder='Enter your Email'
            onChange={(e)=>setEmail(e.target.value)}>
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
            onChange={(e)=>setPassword(e.target.value)}>
                </Input>
                <InputRightElement width="4.5rem">
                <Button width="1.75rem " size="sm" onClick={()=>setShow(!show)}>
                    {show ? "hide":"show"}
                </Button>

                </InputRightElement>
                </InputGroup>
        </FormControl>
        <FormControl id="password" isRequired>
            <InputGroup>
            <FormLabel >
                Confirm Password
            </FormLabel>
            <Input 
            placeholder='Enter password again'
            type={cshow ?"text":"password"}
            onChange={(e)=>setConfirmPassword(e.target.value)}>
                </Input>
                <InputRightElement width="4.5rem">
                <Button width="1.75rem " size="sm" onClick={()=>setcShow(!cshow)}>
                    {cshow ? "hide":"show"}
                </Button>

                </InputRightElement>
                </InputGroup>
        </FormControl>

        <FormControl id="pic">
            <FormLabel>
                Upload Your Picture
            </FormLabel>
                <Input
                type="file"
                p={1.5}
                accept="image/*"
                onChange={(e)=>postDetails(e.target.files[0])}
                >
                </Input>
        </FormControl>
        <Button
            colorScheme='blue'
            width={"100%"}
            style={{marginTop: 15}}
            onClick={submitHandler}
            isLoading={loading}
        >
            Sign Up
        </Button>
    </VStack>
  )
}

export default Signup