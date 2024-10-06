import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Leaf, Users, BookOpen, Globe, ChevronDown, ChevronUp } from 'lucide-react';
import NavbarLogo from '../componentes/navbarLogo/navbarlogo';
import Politicas from '../componentes/politicas/politicas';
import { Facebook, Youtube, Instagram, Phone } from 'lucide-react';

import Logo from '../images/UNIVERSIDAD-ANDINA-DEL-CUSCO.jpeg';
import Mof from '../componentes/mof/mof';

const ExpandableSection = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full py-2 px-4 bg-green-600 bg-opacity-80 text-white rounded-lg focus:outline-none"
      >
        <h3 className="text-lg font-semibold">{title}</h3>
        {isOpen ? <ChevronUp /> : <ChevronDown />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-2 p-4 bg-white bg-opacity-90 rounded-lg"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const DSostenible = () => {
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
    { label: 'Impacto', href: 'Impacto' },
    { label: 'Participa', href: 'Participacion' },
    { label: 'Contacto', href: 'contacto' },
    { label: 'Coordinaciones' }, // Dropdown opcional
  ];

  const dropdownLinks = [
    { name: 'Inicio', url: '/'},
    { name: 'Desarrollo Formativo', url: '/Desarrollo-Formativo' },
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
          title="Coordinación de Desarrollo Sostenible"
          subtitle=""
          socialLinks={socialLinks}
          buttons={buttons}
          dropdownLinks={dropdownLinks}
        />
      </header>
      <main className="flex-1 ">
        {/* Seccion de mof */}
        <div className="h-auto bg-gray-100">
          <Mof />
        </div>
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="py-5 text-3xl font-bold text-center mb-4 text-black">Nuestro Impacto</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white p-6 rounded-lg shadow-md text-center"
            >
              <Users className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Comunidad Impactada</h3>
              <p>Más de 10,000 personas beneficiadas por nuestros programas</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white p-6 rounded-lg shadow-md text-center"
            >
              <BookOpen className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Proyectos Educativos</h3>
              <p>50+ proyectos de educación ambiental implementados</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white p-6 rounded-lg shadow-md text-center"
            >
              <Globe className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Alcance Global</h3>
              <p>Colaboraciones con 20+ organizaciones internacionales</p>
            </motion.div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-center text-black mb-8">Participa</h2>
          <div className="text-center">
            <p className="text-lg mb-6">
              ¿Quieres ser parte del cambio? Únete a nuestros programas de voluntariado 
              y contribuye al desarrollo sostenible de nuestra región.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-green-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-700 transition duration-300"
            >
              Inscríbete como Voluntario
            </motion.button>
          </div>
        </motion.section>
      </main>

      <footer className="bg-green-800 text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} Coordinación de Desarrollo Sostenible. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default DSostenible;