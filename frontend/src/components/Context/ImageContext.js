import React, { createContext, useState } from 'react';

const ImageContext = createContext();

const ImageProvider = ({ children }) => {
  const [imageAddress, setImageAddress] = useState(sessionStorage.getItem('bgImage') ||'');

  return (
    <ImageContext.Provider value={{ imageAddress, setImageAddress }}>
      {children}
    </ImageContext.Provider>
  );
};

export { ImageContext, ImageProvider };