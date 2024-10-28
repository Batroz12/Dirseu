import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Facebook, Youtube, Instagram, Phone } from 'lucide-react';
import Logo2 from '../../images/UAC.png';

const NavbarLogo = ({
  backgroundImage,
  backgroundVideo,
  overlayOpacity = 0.5,
  title,
  subtitle,
  socialLinks,
  buttons,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-gray-100">
      {/* Background Video or Image */}
      {backgroundVideo ? (
        <video
          src={backgroundVideo}
          autoPlay
          loop
          muted
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <img
          src={backgroundImage}
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black"
        style={{ opacity: overlayOpacity }}
      ></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header */}
        <header
          className={`fixed top-0 left-0 w-full py-4 px-6 flex justify-between items-center z-50 transition-colors duration-300 ${
            isScrolled ? 'bg-blue-600 text-white' : 'bg-transparent text-white'
          }`}
        >
          {/* Logo */}
          <img src={Logo2} alt="Logo" className="h-12 flex-grow-0" />

          {/* Botones de navegación */}
          <div className="space-x-4 flex justify-center w-full">
            {buttons.map((button, index) => (
              <label
                key={index}
                onClick={() => navigate(button.href)}
                className="relative cursor-pointer group"
              >
                {button.label}
                <span
                  className={`absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-500 ease-in-out group-hover:w-full ${
                    isScrolled ? 'bg-white' : 'bg-white'
                  }`}
                ></span>
              </label>
            ))}
          </div>

          {/* Redes Sociales + Login */}
          <div className="flex items-center space-x-4 flex-1 justify-end">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`hover:${social.hoverColor}`}
              >
                {social.icon}
              </a>
            ))}
            <button
              className={`px-4 py-2 rounded transition duration-300 ${
                isScrolled ? 'bg-white text-blue-600' : 'bg-blue-600 text-white'
              } hover:bg-white hover:text-blue-600`}
              onClick={() => navigate('/login')}
            >
              Login
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-grow flex flex-col items-center justify-center px-6 pt-20">
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
        </main>
      </div>
    </div>
  );
};

export default NavbarLogo;
