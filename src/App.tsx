import { Link, Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import AddProduct from './pages/admin/AddProduct'
import EditProduct from './pages/admin/EditProduct'
import ManageProducts from './pages/admin/ManageProducts'
import ManageCategories from './pages/admin/ManageCategories'
import Cart from './pages/Cart'
import ProductDetails from './pages/ProductDetails'
import NotFound from './pages/NotFound'
import Signup from './pages/Signup'
import Login from './pages/Login'

function App() {

  return (
    <>
    <Link to="/">
      <button>Avalehele</button>
    </Link>

        <Link to="/cart">
      <button>Ostukorvi</button>
    </Link>

    <Link to="/add-product">
      <button>Lisa toode</button>
    </Link>

    <Link to="/manage-products">
      <button>Manage products</button>
    </Link>

    <Link to="/manage-categories">
      <button>Manage categories</button>
    </Link>

    <Link to="/login">
      <button>Logi sisse</button>
    </Link>

    <Link to="/signup">
      <button>Registreeru</button>
    </Link>

    <Link to="/profile">
      <button>Profiil</button>
    </Link>

      <Routes>
        <Route path="/" element={ <HomePage />} />
        <Route path="/cart" element={ <Cart />} />
        <Route path="/add-product" element={ <AddProduct />} />
        <Route path="/edit-product" element={ <EditProduct />} />
        <Route path="/manage-products" element={ <ManageProducts />} />
        <Route path="/manage-categories" element={ <ManageCategories />} />
        <Route path="/login" element={ <Login />} />
        <Route path="/signup" element={ <Signup />} />
        <Route path="/product" element={ <ProductDetails />} />
        <Route path="/*" element={ <NotFound />} />
      </Routes>
    </>
  )
}

export default App
