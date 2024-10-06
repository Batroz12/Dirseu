import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { motion } from 'framer-motion';
import { Facebook, Youtube, Instagram, Phone } from 'lucide-react';

import Logo2 from '../../images/UAC.png';


const scrollToSection = (id) => {
  const section = document.getElementById(id);
  const navbarHeight = document.querySelector('nav')?.offsetHeight || 0; // Altura del navbar
  if (section) {
    window.scrollTo({
      top: section.offsetTop - navbarHeight, // Resta la altura del navbar
      behavior: 'smooth',
    });
  }
};

const NavbarLogo = ({
  backgroundImage,
  overlayOpacity = 0.5,
  title,
  subtitle,
  socialLinks,
  buttons,
  dropdownLinks = [],
}) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);
  const [isVisible, setIsVisible] = useState(false);

  const navigate = useNavigate();

  const handleLoginRedirect = () => {
  navigate('/login');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="relative min-h-screen bg-gray-100">
      {/* Background Image */}
      <img
        src={backgroundImage}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className={`absolute inset-0 bg-black`} style={{ opacity: overlayOpacity }}></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header */}
        <header className="py-4 px-6 flex justify-between items-center">
          {/* Logo (izquierda) */}
          <img
            src={Logo2}
            alt="Logo"
            className="h-12 flex-grow-0"
          />
          <div className="space-x-4 flex justify-center w-full">
            {buttons.map((button, index) => (
              button.label !== 'Coordinaciones' && (
                <label
                  key={index}
                  onClick={() => scrollToSection(button.href)}
                  className="relative text-white cursor-pointer group"
                >
                  {button.label}
                  {/* Custom underline animation */}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-500 ease-in-out group-hover:w-full"></span>
                </label>
              )
            ))}
          </div>
          {/* Redes Sociales + Botones (derecha) */}
          <div className="flex items-center space-x-4 flex-1 justify-end">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-white hover:${social.hoverColor}`}
              >
                {social.icon}
              </a>
            ))}
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
              onClick={handleLoginRedirect}
            >
              Login
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-grow flex flex-col items-center justify-center px-6">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold text-white mb-4 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -20 }}
            transition={{ duration: 0.8 }}
          >
            {title}
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-white mb-8 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {subtitle}
          </motion.p>

          {/* Coordinaciones button */}
          {buttons.find(button => button.label === 'Coordinaciones') && (
            <div className="mt-6">
              <label
                onClick={toggleDropdown}
                className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg hover:bg-white hover:text-blue-600 transition duration-300 cursor-pointer"
              >
                Coordinaciones
              </label>
            </div>
          )}

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-48 bg-white rounded-md shadow-lg z-20" ref={dropdownRef}>
              {dropdownLinks.map((link, idx) => (
                <a
                  key={idx}
                  href={link.url}
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
                >
                  {link.name}
                </a>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default NavbarLogo;
