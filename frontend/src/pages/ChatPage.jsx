import {Box} from '@chakra-ui/react';
import {ChatState} from '../context/ChatProvider'
import SideDrawer from '../components/miscellaneous/SideDrawer';
import MyChats from '../components/MyChats';
import ChatBox from '../components/ChatBox'
import { useState , useEffect} from 'react';
import axios from 'axios';

const ChatPage = () => {


const {user} = ChatState();
const [fetchAgain, setFetchAgain] = useState(false);
// const [chats, setChats] = useState([]);


// const fetchChats = async () => {

//   const config = {
//         headers: {
//           Authorization: `Bearer ${user.token}`,
//         },
//       };
//   const {data} = await axios.get("/api/chats", config);

//   setChats(data);
// }

// useEffect(()=>{
//   fetchChats();
// }, []);

  return (
<>
    {/* <div>{
      chats.map((chat)=>(
        <div key={chat._id}>{chat.chatName}</div>
      ))
    }
    </div> */}
    <div style={{width: "100%"}}>
        {user && <SideDrawer/>}

        <Box display="flex" justifyContent="space-between" w="100%" h="91.5vh" p="10px">
            {user && <MyChats fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>}
            {user && <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>}

             {/* {user && <MyChats />}
            {user && <ChatBox />} */}
            
        </Box>

        {/* <SideDrawer/>

        <Box display="flex" justifyContent="space-between" w="100%" h="91.5vh" p="10px">
              <MyChats/>
              <ChatBox/>
        </Box> */}
     
    </div>
    </>
  )
}

export default ChatPage