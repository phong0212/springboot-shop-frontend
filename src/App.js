import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
// Import của Client
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import Footer from './components/Footer.jsx'
import ProductDetails from './pages/ProductDetails.jsx';
import Signin from './pages/Signin.jsx';
import Signup from './pages/Signup.jsx';
import Product from './pages/Product.jsx';
import Category from './pages/Category.jsx';
import Brand from './pages/Brand.jsx';
import Cart from './pages/Cart.jsx';
import CheckOut from './pages/CheckOut.jsx';
import ProfileDashboard from './pages/Profile/ProfileDashboard.jsx';
import ProfileDetails from './pages/Profile/ProfileDetails.jsx';
import EditProfile from './pages/Profile/EditProfile.jsx';
import OrderProfile from './pages/Profile/OrderProfile.jsx';
import OrderDetailsProfile from './pages/Profile/OrderDetailsProfile.jsx';
import Wishlist from './pages/Wishlist.jsx';
import Contact from './pages/Contact.jsx';
import Blog from './pages/Blog.jsx';
import BlogDetail from './pages/BlogDetail.jsx';
// Import của Admin
import AdminNavbar from './components/AdminNavbar.jsx';
import AdminFooter from './components/AdminFooter.jsx';
import AdminSidebar from './components/AdminSidebar.jsx';
//Import Dashboard
import AdminDashboard from './admin/dashboard/AdminDashboard.jsx';
// Import Product
import AddProduct from './admin/product/AddProduct.jsx';
import ProductList from './admin/product/ProductList.jsx';
import AdminProductDetail from './admin/product/AdminProductDetails.jsx';
// Import Category
import CategoryList from './admin/category/CategoryList.jsx';
import AdminCategoryForm from './admin/category/CategoryForm.jsx';
// Import Brand
import BrandList from './admin/brand/BrandList.jsx';
import AdminBrandForm from './admin/brand/BrandForm.jsx';
// Import Varaint và Image
import AdminVariantList from './admin/product/VariantList.jsx';
import AdminVariantForm from './admin/product/VariantForm.jsx';
import AdminImageForm from './admin/product/ImageForm.jsx';
import AdminImageList from './admin/product/ImageList.jsx';
// Import Order
import OrderList from './admin/order/OrderList.jsx';
import OrderDetail from './admin/order/OrderDetails.jsx';

// Import Admin và role của admin
import AdminList from './admin/adminUser/AdminList.jsx';
import RoleList from './admin/role/RoleList.jsx';
import AdminForm from './admin/adminUser/AdminForm.jsx';
import RoleForm from './admin/role/RoleForm.jsx';
import AdminRoute from './routes/AdminRoutes.jsx';
import ContactList from './admin/contact/ContactList.jsx';
import BlogList from './admin/blog/BlogList.jsx';
import BlogAddForm from './admin/blog/BlogAddForm.jsx';
import BlogEditForm from './admin/blog/BlogEditForm.jsx';
// Import các css scss và bootstrap, owl carousel
import './assets/css/app.css';
import './assets/css/utility.css';
import './assets/css/vendor.css';
import './assets/scss/app.scss';
import './assets/scss/utility.scss';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


function UserLayout() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

// Layout admin
function AdminLayout() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <AdminNavbar />
      <div className="d-flex flex-grow-1">
        <AdminSidebar />
        <main className="flex-grow-1 p-3">
          <Outlet />
        </main>
      </div>
      <AdminFooter />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        {/* User routes nhóm chung layout user */}
        <Route element={<UserLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<Product />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path='/category/:categoryName' element={<Category />}></Route>
          <Route path='/brand/:brandName' element={<Brand />}></Route>
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<CheckOut />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path='/contact' element= {<Contact/>}/>
          <Route path="/profile" element={<ProfileDashboard />} />
          <Route path="/profile/details" element={<ProfileDetails />} />
          <Route path="/profile/edit" element={<EditProfile />} />
          <Route path="/profile/orders" element={<OrderProfile />} />
          <Route path="/profile/orders/:orderId" element={<OrderDetailsProfile />} />
          <Route path="/blogs" element={<Blog />} />        
        <Route path="/blogs/:id" element={<BlogDetail />} />

        </Route>
        <Route element={<AdminRoute />}>

          {/* Admin routes nhóm chung layout admin */}
          <Route path="/admin" element={<AdminLayout />}>
            {/* Chú ý: các đường dẫn admin bắt đầu bằng /admin */}
            <Route path='dashboard' element={<AdminDashboard />}></Route>
            <Route path="/admin/products/add" element={<AddProduct />} />
            <Route path="/admin/products/:product_id/edit" element={<AddProduct />} />
            <Route path='/admin/productlist' element={<ProductList />}></Route>
            <Route path="/admin/products/:id" element={<AdminProductDetail />} />

            <Route path="/admin/categories" element={<CategoryList />} />
            <Route path="/admin/categories/add" element={<AdminCategoryForm />} />
            <Route path="/admin/categories/edit/:id" element={<AdminCategoryForm />} />
            <Route path="/admin/brands" element={<BrandList />} />
            <Route path="/admin/brands/add" element={<AdminBrandForm />} />
            <Route path="/admin/brands/edit/:id" element={<AdminBrandForm />} />
            <Route path="/admin/products/:product_id/variants" element={<AdminVariantList />} />
            <Route path="/admin/products/:product_id/variants/add" element={<AdminVariantForm />} />
            <Route path="/admin/products/:product_id/variants/:variant_id/edit" element={<AdminVariantForm />} />
            <Route path="/admin/products/:product_id/images" element={<AdminImageList />} />
            <Route path="/admin/products/:product_id/images/add" element={<AdminImageForm />} />
            <Route path="/admin/products/:product_id/images/:image_id/edit" element={<AdminImageForm />} />
            <Route path='/admin/orders' element={<OrderList />}></Route>
            <Route path='/admin/orders/:id' element={<OrderDetail />}></Route>
            <Route path='/admin/adminList' element={<AdminList />}></Route>
            <Route path='/admin/role' element={<RoleList />}></Route>


            <Route path='/admin/adminList/add' element={<AdminForm />} />
            <Route path='/admin/adminList/edit/:id' element={<AdminForm />} />

            <Route path='/admin/role/add' element={<RoleForm />} />
            <Route path='/admin/role/edit/:id' element={<RoleForm />} />
                        <Route path='/admin/contact' element={<ContactList />}></Route>
                        <Route path='/admin/blogs' element={<BlogList />}></Route>
                        <Route path='/admin/blogs/add' element={<BlogAddForm />}></Route>
                        <Route path='/admin/blogs/edit/:id' element={<BlogEditForm />}></Route>


          </Route>
        </Route>

      </Routes>
    </Router>

  );
}

export default App;
