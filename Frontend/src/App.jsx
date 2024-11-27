import { Provider } from "react-redux"
import Home from "./Components/Home"
import Login from "./Components/Login"
import SingleMovie from "./Components/SingleMovie"
import Register from "./Components/Register"
import {BrowserRouter,Routes,Route, useNavigate} from "react-router-dom"
import store from "../redux/store"
import ProtectedRoute from "./Components/ProtectedRoute"
import Profile from "./pages/Profile"
import Admin from "./pages/Admin"
import Partner from "./pages/Partner"
import { useEffect } from "react"
import { setupAxiosInterceptors } from "./api"
import BookShow from "./Components/BookShow"
import Forget from "./Components/Forget"
import Reset from "./Components/Reset"
function App() {
  const navigate = useNavigate();
  useEffect(() => {
    setupAxiosInterceptors(navigate);
  }, [navigate]);

  return (
    <>
    <Provider store={store}>
    
    <Routes>
      <Route path="/profile"
      element={
        <ProtectedRoute>
          <Profile/>
        </ProtectedRoute>
      }/>
            <Route path="/admin"
      element={
        <ProtectedRoute>
          <Admin/>
        </ProtectedRoute>
      }/>
      <Route path="/partner"
      element={
        <ProtectedRoute>
          <Partner/>
        </ProtectedRoute>
      }/>
      <Route path="/" element={
        <ProtectedRoute>
            <Home/>
        </ProtectedRoute>}/>
        <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/movie/:id"
      element={
        <ProtectedRoute>
          <SingleMovie/>
        </ProtectedRoute>
      }
      />
      <Route path="/book-show/:id"
      element={
        <ProtectedRoute>
          <BookShow/>
        </ProtectedRoute>
      }
      />
      <Route path="/forget" element={<Forget/>}/>
      <Route path="/reset" element={<Reset/>}/>
    </Routes>

    </Provider>
    </>
  )
}

export default App
