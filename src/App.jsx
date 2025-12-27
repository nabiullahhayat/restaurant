import { Route, Routes} from 'react-router-dom'
import { useState } from 'react'
import './App.css'
import Willcome from './Pages/Willcome'
import BrekFast from './Components/BrekFast'
import LunchAndDinner from './Components/LunchAndDinner'
import Drinks from './Components/Drinks'
import MenusPage from './Pages/MenusPage'
import AdminPenal from './Admin/AdminPenal'
import Login from './Pages/login'
import foodsData from './Data/foods.json'
function App() {
    const [foods, setFoods] = useState(foodsData);
  return (
    <div>

      <Routes>
        <Route path='/admin' element={<AdminPenal foods = {foods} setFoods={setFoods} />}></Route>
        <Route path='/' element={<Willcome />}></Route>
        <Route path='/menus' element={<MenusPage />}></Route>
        <Route path='/breakfast' element={<BrekFast foods = {foods} />}></Route>
        <Route path='/lunch' element={<LunchAndDinner foods = {foods} />}></Route>
        <Route path='/drinks' element={<Drinks/>}></Route>
        <Route path='/login' element={<Login />}></Route>
      </Routes>
        
    </div>
  )
}

export default App
