import Rodape from "../../components/Rodape";
import Menu from "../../components/Menu";
import { Outlet } from 'react-router-dom'
import { useState, useEffect } from 'react'

export default function PaginaPadrao(){
  const ImageSlider = () => {
      const [images] = useState([
        'background.jpeg'
      ]);
      const [currentIndex, setCurrentIndex] = useState(0);
    
      useEffect(() => {
        const interval = setInterval(() => {
          setCurrentIndex((currentIndex + 1) % images.length)
        }, 5000);
        return () => clearInterval(interval);
      }, [currentIndex, images]);
    
      return (
        <div style={{ 
          backgroundImage: `url(${images[currentIndex]})`,
          backgroundColor: 'gray',
          backgroundSize: '80% 100%',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          minWidth: '288px',
          height: '40vh',
        }}>
        </div>
      );
    }

  return(
      <>
        <Menu />
        <ImageSlider />
        <Outlet />
        <Rodape />
      </>
  )
}