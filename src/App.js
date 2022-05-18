import './App.css';
import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { Route, Routes } from 'react-router-dom';
import Header from './Shared/Header';
import Login from './components/Login';
import Signup from './components/Signup';
import TodoApp from './components/TodoApp/TodoApp';
import RequireAuth from './components/RequireAuth/RequireAuth';

function App() {

  return (
    <div className="App">
      <Header></Header>
      
      <Routes>
          <Route path='/' element={
          <RequireAuth>
              <TodoApp></TodoApp>
          </RequireAuth>
          }></Route>
          <Route path='/login' element={<Login></Login>}></Route>
          <Route path='/register' element={<Signup></Signup>}></Route>
      </Routes>
      <ToastContainer/>
    </div>

  );
}

export default App;
