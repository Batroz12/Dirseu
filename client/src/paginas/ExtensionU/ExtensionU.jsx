import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, BookOpen, Globe, ChevronDown } from 'lucide-react';
import NavbarLogo from '../componentes/navbarLogo/navbarlogo';
import Footer from '../componentes/footer/footer';
import Mof from '../componentes/mof/mof';
import { Facebook, Youtube, Instagram, Phone } from 'lucide-react';

import Logo from '../images/UNIVERSIDAD-ANDINA-DEL-CUSCO.jpeg';

const Program = ({ icon: Icon, title, description }) => (
  <motion.div 
    className="bg-white p-6 rounded-lg shadow-lg"
    whileHover={{ scale: 1.05 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    <Icon className="w-12 h-12 text-green-600 mb-4" />
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </motion.div>
);

const Accordion = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(prev => !prev);
  };
  
  return (
    <div className="border-b border-gray-200">
      <button
        className="flex justify-between items-center w-full py-4 text-left"
        onClick={toggleAccordion}
      >
        <span className="text-lg font-semibold">{title}</span>
        <ChevronDown className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && <div className="pb-4">{children}</div>}
    </div>
  );
};

const ExtensionU = () => {
  const [email, setEmail] = useState('');

  const purpose = 'Programar, organizar y controlar el desarrollo de programas de extensión universitaria y de proyección social en beneficio de la población menos favorecida de la región, con la participación y apoyo técnico de las facultades. ';
  const functions = [
    'Ejecutar las políticas y normas establecidas en el ámbito de su competencia funcional. ',
    'Coordinar con las Comisiones de Responsabilidad Social y Extensión Universitaria de las facultades, en la formulación de los programas de extensión universitaria y de proyección social. ',
    'Coordinar, elaborar y proponer el Reglamento de Funcionamiento de las actividades de extensión universitaria y proyección social de la Universidad, dentro del marco de política institucional de la universidad y los lineamientos de acreditación. ',
    'Desarrollar programas de extensión universitaria en lo académico, cultural y artístico en favor de la comunidad local y regional ',
    'Difundir los trabajos de investigación y programas de acción social desarrollados por la universidad en favor de la comunidad local y regional menos favorecida. ',
    'Vincular a las facultades y escuelas profesionales con las comunidades y la población menos favorecida de la región, para dar solución a sus problemas en lo que corresponde a su responsabilidad. ',
    'Organizar eventos sobre responsabilidad social para docentes y estudiantes de las facultades, a fin de dar a conocer los impactos que tiene la Universidad en su quehacer universitario ante la comunidad local y regional. ',
    'Coordinar y proponer en base al análisis de la problemática social de las comunidades locales y regionales del Cusco, programas y proyectos de proyección social multidisciplinaria a desarrollar por la Dirección, con la participación de las facultades. ',
  ];

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
    { label: 'Inicio', href: '/' },
    { label: 'Desarrollo Formativo', href: '/Desarrollo-Formativo' },
    { label: 'Desarrollo Sostenible', href: '/Desarrollo-Sostenible' },
    { label: 'Extensión Universitaria', href: '/Extension-Universitaria' },
    { label: 'Seguimiento al Egresado', href: '/SeguimientoAlEgresado' },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar con el componente NavbarLogo */}
      <header>
        {/* Incorporar NavbarLogo aquí */}
        <NavbarLogo
          backgroundImage={Logo}
          overlayOpacity={0.5}
          title="Coordinación de Extensión Universitaria"
          subtitle=""
          socialLinks={socialLinks}
          buttons={buttons}
        />
      </header>

      {/* Sección principal */}
      <main className="bg-[#B6BEC2]">
        {/* Sección de Mof */}
        <div className="h-auto bg-gray-100 ">
          <Mof purpose={purpose} functions={functions} 
          backgroundImage='https://imgix-prod.sgs.com/-/media/sgscorp/images/temporary/tree-held-by-hands-1600px.cdn.en-PH.1.png?fit=crop&crop=edges&auto=format&w=1200&h=630'
          />
        </div>
        {/* Programas */}
        <section id="programas" className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Nuestros Programas de Extensión</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Program 
                icon={Users} 
                title="Voluntariado Comunitario" 
                description="Participa en proyectos que impactan directamente en las comunidades locales."
              />
              <Program 
                icon={BookOpen} 
                title="Educación Continua" 
                description="Cursos y talleres abiertos a la comunidad para el aprendizaje a lo largo de la vida."
              />
              <Program 
                icon={Globe} 
                title="Proyectos de Desarrollo Sostenible" 
                description="Iniciativas que promueven el desarrollo sostenible en la región."
              />
            </div>
          </div>
        </section>

        {/* Impacto */}
        <section id="impacto" className="py-10">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Nuestro Impacto</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <h3 className="text-4xl font-bold text-green-600 mb-2">5,000+</h3>
                <p className="text-xl text-gray-600">Beneficiarios Directos</p>
              </div>
              <div>
                <h3 className="text-4xl font-bold text-green-600 mb-2">50+</h3>
                <p className="text-xl text-gray-600">Proyectos Comunitarios</p>
              </div>
              <div>
                <h3 className="text-4xl font-bold text-green-600 mb-2">100+</h3>
                <p className="text-xl text-gray-600">Alianzas Estratégicas</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-10">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Preguntas Frecuentes</h2>
            <div className="max-w-2xl mx-auto">
              <Accordion title="¿Cómo puedo participar en los programas de extensión?">
                <p>Puedes participar inscribiéndote en los programas de tu interés a través de nuestra plataforma en línea o visitando la oficina de Extensión Universitaria en el campus.</p>
              </Accordion>
              <Accordion title="¿Los programas tienen algún costo?">
                <p>La mayoría de nuestros programas son gratuitos para estudiantes y miembros de la comunidad. Algunos cursos especializados pueden tener un costo nominal.</p>
              </Accordion>
              <Accordion title="¿Puedo proponer un nuevo proyecto de extensión?">
                <p>¡Absolutamente! Valoramos las iniciativas de nuestros estudiantes y miembros de la comunidad. Puedes presentar tu propuesta en la oficina de Extensión Universitaria.</p>
              </Accordion>
            </div>
          </div>
        </section>

        {/* Formulario de Participación */}
        {/* <section id="participa" className="bg-green-100 py-2">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">¡Únete a Nuestros Programas!</h2>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 mb-2">Correo Electrónico</label>
                <input 
                  type="email" 
                  id="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" 
                  required 
                />
              </div>
              <button 
                type="submit" 
                className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-300"
              >
                Recibir Información sobre Programas
              </button>
            </form>
          </div>
        </section> */}
      </main>

      <footer id="footer" className="py-6 bg-gray-800 text-white">
        <Footer />
      </footer>
    </div>
  );
};

export default ExtensionU;
