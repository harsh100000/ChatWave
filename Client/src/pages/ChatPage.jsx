import { useState } from 'react'
import { ChatState } from '../../Context/ChatProvider'
import SideDrawer from '../components/miscellaneous/SideDrawer'
import MyChats from '../components/MyChats'
import ChatBox from '../components/ChatBox'

const ChatPage = () => {
  const {user} = ChatState()
  const [fetchAgain, setFetchAgain] = useState(false)

  return (
    <div className='w-full'>
      {user && <SideDrawer/>}
      <div className='flex justify-between gap-2 w-full h-[91.5vh] p-3'>
        {user && (<MyChats fetchAgain={fetchAgain}/>)}
        {user && (<ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />)}
      </div>
    </div>
  )
}

export default ChatPage