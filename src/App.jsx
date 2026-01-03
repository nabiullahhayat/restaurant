import { Route, Routes} from 'react-router-dom'
import './App.css'
import Willcome from './Pages/Willcome'
import BrekFast from './Components/BrekFast'
import LunchAndDinner from './Components/LunchAndDinner'
import Drinks from './Components/Drinks'
import MenusPage from './Pages/MenusPage'
import AdminPenal from './Admin/AdminPenal'
import SignUp from './Pages/SignUp'

function App() {

  return (
    <div>

      <Routes>
        <Route path='/admin' element={<AdminPenal />}></Route>
        <Route path='/' element={<Willcome />}></Route>
        <Route path='/menus' element={<MenusPage />}></Route>
        <Route path='/breakfast' element={<BrekFast />}></Route>
        <Route path='/lunch' element={<LunchAndDinner />}></Route>
        <Route path='/drinks' element={<Drinks/>}></Route>
        <Route path='/login' element={<SignUp />}></Route>
      </Routes>
        
    </div>
  )
}

export default App
