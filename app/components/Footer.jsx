import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-600 py-8">
      <div className="container mx-auto text-center">
        <p>
          &copy; {new Date().getFullYear()} Myara Organics. All Rights Reserved.
        </p>
        <div className="mt-4">
          <a href="#" className="px-2">
            Facebook
          </a>
          <a href="#" className="px-2">
            Instagram
          </a>
          <a href="#" className="px-2">
            Twitter
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
