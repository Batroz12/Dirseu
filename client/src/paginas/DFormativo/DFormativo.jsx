import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Palette, Music, Camera, Theater, Book, Users, Mic, Globe, Users2, Music2, Music2Icon, Music3, Music4, Music4Icon } from 'lucide-react';
import NavbarLogo from '../componentes/navbarLogo/navbarlogo';
import { Facebook, Youtube, Instagram, Phone } from 'lucide-react';

import Tuna from '../images/Tuna.jpg';
import Logo from '../images/UNIVERSIDAD-ANDINA-DEL-CUSCO.jpeg';
import Logo2 from '../images/UAC.png';  // Asegúrate de importar correctamente la imagen

const Workshop = ({ icon: Icon, title, description }) => (
  <motion.div 
    className="bg-white p-6 rounded-lg shadow-lg"
    whileHover={{ scale: 1.05 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    <Icon className="w-12 h-12 text-blue-600 mb-4" />
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </motion.div>
);

const DFormativo = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted email:', email);
    setEmail('');
  };

  // Configuración de redes sociales
  const socialLinks = [
    { icon: <Facebook size={16} />, url: 'https://facebook.com', hoverColor: 'text-blue-400' },
    { icon: <Youtube size={16} />, url: 'https://youtube.com', hoverColor: 'text-red-500' },
    { icon: <Instagram size={16} />, url: 'https://instagram.com', hoverColor: 'text-pink-500' },
    { icon: <Phone size={16} />, url: 'https://wa.me/yourphonenumber', hoverColor: 'text-green-400' },
  ];

  const buttons = [
    { label: 'Talleres', href: 'talleres' },
    { label: 'Beneficios', href: 'beneficios' },
    { label: 'Contacto', href: 'contacto' },
    { label: 'Coordinaciones' }, // Dropdown opcional
  ];

  const dropdownLinks = [
    { name: 'Inicio', url: '/'},
    { name: 'Desarrollo Sostenible', url: '/DesarrolloSostenible' },
    { name: 'Extensión Universitaria', url: '/Extension-Universitaria' },
    { name: 'Seguimiento al Egresado', url: '/SeguimientoAlEgresado' },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <header>
        {/* Incorporar NavbarLogo aquí */}
        <NavbarLogo
          backgroundImage={Logo}
          overlayOpacity={0.5}
          title="Coordinación de Desarrollo Formativo"
          subtitle="Potencia tus habilidades creativas a través de nuestros talleres artísticos."
          socialLinks={socialLinks}
          buttons={buttons}
          dropdownLinks={dropdownLinks}
        />
      </header>

      <main>
        <section className="bg-blue-700 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <motion.h2 
              className="text-4xl md:text-5xl font-bold mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Descubre tu Potencial Artístico
            </motion.h2>
            <motion.p 
              className="text-xl mb-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Explora nuestros talleres artísticos y desarrolla tus habilidades creativas
            </motion.p>
            <motion.a 
              href="#talleres"
              className="bg-white text-blue-700 px-6 py-3 rounded-full font-semibold hover:bg-blue-100 transition duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Ver Talleres
            </motion.a>
          </div>
        </section>

        <section id="talleres" className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Nuestros Talleres</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Workshop 
                icon={Palette} 
                title="Artes Visuales y Gráficas" 
                description="Aprende diversas técnicas de pintura y expresa tu creatividad en el lienzo."
              />
              <Workshop 
                icon={Mic} 
                title="Orquesta Sinfónica y Coro" 
                description="Descubre el mundo de la música a través de diversos instrumentos y estilos."
              />
              <Workshop 
                icon={Users2} 
                title="Danza Moderna"
                description="Captura momentos únicos y aprende a contar historias a través de imágenes."
              />
              <Workshop 
                icon={Theater} 
                title="Teatro" 
                description="Desarrolla tus habilidades de actuación y expresión corporal en el escenario."
              />
              <Workshop 
                icon={Music4} 
                title="Tuna Femenina" 
                description="Explora tu voz literaria y crea historias cautivadoras."
              />
              <Workshop 
                icon={Users} 
                title="Danza Folclórica" 
                description="Expresa tus emociones a través del movimiento y aprende diversos estilos de baile."
              />
              <Workshop 
                icon={Users} 
                title="Ritmo y Conexión" 
                description="Expresa tus emociones a través del movimiento y aprende diversos estilos de baile."
              />
              <Workshop 
                icon={Music4} 
                title="Tuna Universitaria" 
                description="Expresa tus emociones a través del movimiento y aprende diversos estilos de baile."
              />
            </div>
          </div>
        </section>

        <section id="beneficios" className="bg-gray-200 py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Beneficios de Nuestros Talleres</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-xl font-semibold mb-2">Desarrollo Personal</h3>
                <p className="text-gray-600">Potencia tu creatividad y habilidades de expresión.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-xl font-semibold mb-2">Desarrollo Social</h3>
                <p className="text-gray-600">Conocecta con otros estudiantes.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-xl font-semibold mb-2">Becas</h3>
                <p className="text-gray-600">Puede aplicar a medias becas o becas completas dependiendo de su participación.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="contacto" className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">¿Listo para Empezar?</h2>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="mb-4">
                {/* <label htmlFor="email" className="block text-gray-700 mb-2">Correo Electrónico</label>
                <input 
                  type="email" 
                  id="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  required 
                /> */}
              </div>
              <button 
                type="submit" 
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
              >
                Más Información
              </button>
            </form>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} Coordinación de Desarrollo Formativo. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default DFormativo;
