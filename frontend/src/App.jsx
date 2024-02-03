import './App.css'
//Import the router from react-router
import { Route, Routes } from 'react-router'
import AddEmployee from './pages/AddEmployee'
import Home from './pages/Home'
import Login from './pages/Login'

function App() {
  return (
      <Routes>
        
          <Route path='/' element = {<Login />} />
          <Route path='/home' element = {<Home />} />
          <Route path= '/add-employees' element = {<AddEmployee />} />
        
      </Routes>
  )
}

export default App
