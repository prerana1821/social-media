import { Route, Routes } from "react-router";
import "./App.css";
import { SignIn, Login } from "./features";
import { Home } from "./pages/Home/Home";

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/signin' element={<SignIn />}></Route>
        <Route path='/login' element={<Login />}></Route>
      </Routes>
    </div>
  );
}

export default App;
