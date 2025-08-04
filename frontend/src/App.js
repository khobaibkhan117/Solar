import './App.css';
import { ImageProvider } from './components/Context/ImageContext';
import ApplicationRoutes from './components/Routes/index';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';



function App() {


  return (
    <ImageProvider>
   

    
      <BrowserRouter>
      <ApplicationRoutes />
      </BrowserRouter>

      </ImageProvider>
    
  );
}

export default App;




