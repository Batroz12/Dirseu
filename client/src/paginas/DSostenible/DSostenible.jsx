import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Leaf, Users, BookOpen, Globe, ChevronDown, ChevronUp } from 'lucide-react';
import NavbarLogo from '../componentes/navbarLogo/navbarlogo';
import Footer from '../componentes/footer/footer';
import { Facebook, Youtube, Instagram, Phone } from 'lucide-react';

import Logo from '../images/UNIVERSIDAD-ANDINA-DEL-CUSCO.jpeg';
import Mof from '../componentes/mof/mof';

const DSostenible = () => {
  const [email, setEmail] = useState('');

  const purpose = 'Programar y desarrollar las actividades inherentes a la cooperación del desarrollo sostenible que permitan integrar y vincular a la universidad, con la sociedad a través de planes, programas y proyectos de carácter sociales o ambientales a favor de la población local, regional y nacional.';
  const functions = [
    'Ejecutar las políticas y normas que correspondan al ámbito funcional de su competencia.',
    'Participar en la formulación y evaluación del Plan Operativo y Presupuesto de la Dirección, de acuerdo a los lineamientos y disposiciones establecidas.',
    'Promover la realización de eventos educativos, foros y actividades académicas en general, relacionadas con el medio ambiente y el desarrollo sostenible.',
    'Promover la participación directa de los estudiantes en materia de promoción y fomento del desarrollo sostenible, protección y conservación del medio ambiente, fortalecimiento de la gestión ambiental satisfactoria, oportuna y resguardo de los derechos ambientales de la región.',
    'Constituir las comisiones ambientales de las diferentes Escuelas Profesionales de la Sede Central y Filial.',
    'Promover el fomento del desarrollo en coordinación con instituciones públicas y privadas de la región.',
    'Difundir, ejecutar, actualizar y defender los objetivos y lineamientos que establece la política ambiental de la universidad.',
    'Coordinar y establecer vínculos de cooperación con investigadores y entidades nacionales e internacionales, que financian o trabajan en proyectos para el desarrollo sostenible de la región.',
    'Proponer nuevos programas de servicio social que puedan incorporarse y ser orientados a la currícula de las escuelas profesionales.',
    'Promover debates sobre desarrollo sostenible y medio ambiente, así como la preservación de la herencia cultural, en el ámbito universitario local.',
    'Convocar y organizar programas de voluntariado con los estudiantes y/o docentes de la Universidad, para atender las necesidades latentes que afectan a la población local y regional menos favorecida del Cusco.'
  ];

  // Configuración de redes sociales
  const socialLinks = [
    { icon: <Facebook size={16} />, url: 'https://facebook.com', hoverColor: 'text-blue-400' },
    { icon: <Youtube size={16} />, url: 'https://youtube.com', hoverColor: 'text-red-500' },
    { icon: <Instagram size={16} />, url: 'https://instagram.com', hoverColor: 'text-pink-500' },
    { icon: <Phone size={16} />, url: 'https://wa.me/yourphonenumber', hoverColor: 'text-green-400' },
  ];

  const buttons = [
    { label: 'Inicio', href: '/' },
    { label: 'Desarrollo Formativo', href: '/Desarrollo-Formativo' },
    { label: 'Desarrollo Sostenible', href: '/Desarrollo-Sostenible' },
    { label: 'Extensión Universitaria', href: '/Extension-Universitaria' },
    { label: 'Seguimiento al Egresado', href: '/SeguimientoAlEgresado' },
  ];

  return (
    <div className="min-h-screen bg-indigo-50">
      <header>
        {/* Incorporar NavbarLogo aquí */}
        <NavbarLogo
          backgroundImage={Logo}
          overlayOpacity={0.5}
          title="Coordinación de Desarrollo Sostenible"
          subtitle=""
          socialLinks={socialLinks}
          buttons={buttons}
        />
      </header>
      <main className="bg-[#B6BEC2]">
        {/* Sección de Mof */}
        <div className="h-auto bg-gray-100 ">
          <Mof purpose={purpose} functions={functions}
          backgroundImage='https://imgix-prod.sgs.com/-/media/sgscorp/images/temporary/tree-held-by-hands-1600px.cdn.en-PH.1.png?fit=crop&crop=edges&auto=format&w=1200&h=630'
          />
        </div>

        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 max-w-7xl mx-auto px-4"
        >
          <h2 className="py-10 text-3xl font-bold text-center mb-4 text-black">Nuestro Impacto</h2>
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

        <section className="py-5">
          <h2 className="py-5 text-3xl font-bold text-center text-black mb-8">Participa</h2>
          <div className="text-center">
            <p className="py-5 text-lg mb-6">
              ¿Quieres ser parte del cambio? Únete a nuestros programas de voluntariado 
              y contribuye al desarrollo sostenible de nuestra región.
            </p>
            <Link to="/Home/modules/list/voluntariados"> {/* Cambia aquí a la ruta deseada */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-green-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-700 transition duration-300"
              >
                Inscríbete como Voluntario
              </motion.button>
            </Link>
          </div>
        </section>
      </main>

      <footer id="footer" className="py-6 bg-gray-800 text-white">
        <Footer />
      </footer>
    </div>
  );
};

export default DSostenible;
