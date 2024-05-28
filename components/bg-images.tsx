import React from 'react';
import Image from 'next/image';

const splatImages = () => {
    const formatNumber = (num: number) => {
      return num < 10 ? `0${num}` : num.toString();
    };
  
    const splatImageUrls = Array.from(Array(36).keys()).map(
      (index) => `/splat/splat${formatNumber(index)}.png`
    );
  
    return splatImageUrls;
};

const BackgroundImages = () => {
const splatImageUrls = splatImages();
  return (    
    <div className="background-images-container">
        {splatImageUrls.map((url, index) => (
            <div key={index} className="">
                <Image src={url} alt={`splat ${index}`} height={150} width={150} objectFit="contain"/>
            </div>
        ))}
    </div>
  );
};

export default BackgroundImages;