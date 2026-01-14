import { Routes, Route} from 'react-router-dom' 
import ChatPage from './pages/ChatPage'
import Login from './pages/Login'
import Signup from './pages/Signup'
import TestPage from './pages/TestPage'
import { ToastContainer } from 'react-toastify';
import Test2 from './pages/Test2'
import "./App.css";

const App = () => {
  return (
    <>
    <ToastContainer />
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/signup' element={<Signup/>} />
        <Route path='/chats' element={<ChatPage/>} />
        <Route path='/test' element={<TestPage/>} />
        <Route path='/test2' element={<Test2/>} />
      </Routes>
    </>
  )
}

export default App