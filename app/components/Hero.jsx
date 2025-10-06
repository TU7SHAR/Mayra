import React from "react";
import Link from "next/link";
import Image from "next/image";

const Hero = () => {
  return (<div className="relative h-[86vh]">
       <Image
        src="/hero.jpg" // Correct path for files in the `public` folder
        alt="A jar of ghee and a bottle of oil"
        fill
        className="object-cover"
      /> 
  

      <div className="absolute inset-0 bg-black/10 z-10"></div>
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-white text-center px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Browse our latest products
        </h1>
        <button className="bg-yellow-800 text-white text-2xl font-light py-2 px-6 rounded hover:bg-yellow-900 transition duration-300">
          <Link href="/Products">Shop All</Link>
        </button>
      </div>
    </div>
  );
};

export default Hero;
