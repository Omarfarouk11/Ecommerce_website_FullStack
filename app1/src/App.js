import React from 'react'
import "../src/App.css"
import AdminHome from './Pages/homeforadmin/AdminHome';
import AddProduct from "./component/addproduct/AddProduct"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EditProduct from './component/editProduct/EditProduct';
import HomeAdminCategory from './Pages/homeadmincategory/HomeAdminCategory';
import AddCategory from './component/addcategory/AddCategory';
import EditCategory from './component/editCategory/EditCategory';
import Login from "./Pages/login/Login"
import Register from "./Pages/regsiter/Regsiter"
import Home from './Pages/home/Home';
import Search from './component/search/Search';
import SelectCategory from './component/selectcategory/SelectCategory';
import ViewCart from "./component/viewcart/ViewCart"
import ViewOneProduct from "./component/viewoneproduct/ViewOneProduct"
const App = () => {
  const role = JSON.parse(localStorage.getItem("Role"));

  return (
    <div>
      { 
       
     /* role.includes("Admin")?
        <Router>
          <Routes>
            <Route path="/admin" element={<AdminHome />}></Route>
            <Route path="/AddProduct" element={<AddProduct />} />
            <Route path="/AddCategory" element={<AddCategory />} />
            <Route path='/EditProduct/:id' element={<EditProduct />} />
            <Route path='/HomeAdminCategory' element={<HomeAdminCategory />} />
            <Route path='/EditCategory/:id' element={<EditCategory />}></Route>
            <Route path='/LoginPage' element={<Login />}></Route>
            <Route path='/RegisterPage' element={<Register />}></Route>

          </Routes>
        </Router>:*/
        
        /*<Router>
          <Routes>
            <Route path='/' element={<Home/>}></Route>
            <Route path='/LoginPage' element={<Login />}></Route>
            <Route path='/RegisterPage' element={<Register />}></Route>
          </Routes>
        </Router>*/
      }
      <Router>
          <Routes>
            <Route path='/' element={<Home/>}></Route>
            <Route path='/LoginPage' element={<Login />}></Route>
            <Route path='/RegisterPage' element={<Register />}></Route>
            <Route path='/Search/:query' element={<Search/>}></Route>
            <Route path='/select/:id' element={<SelectCategory/>}></Route>
            <Route path='/ViewCart' element={<ViewCart/>}></Route>


            <Route path="/admin" element={<AdminHome />}>  </Route>
            <Route path="/AddProduct" element={<AddProduct />} />

            <Route path="/AddCategory" element={<AddCategory />} />
            <Route path='/EditProduct/:id' element={<EditProduct />} />
            <Route path='/HomeAdminCategory' element={<HomeAdminCategory />} />
            <Route path='/EditCategory/:id' element={<EditCategory />}></Route>
            <Route path='/ViewOneProduct/:id/:categoryId' element={<ViewOneProduct/>}/>
          </Routes>
          
        </Router>


    </div>



  )
}

export default App
