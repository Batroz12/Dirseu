import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, BookOpen, Briefcase, Users, Mail, Phone, MapPin } from 'lucide-react';
import NavbarLogo from '../componentes/navbarLogo/navbarlogo';
import { Facebook, Youtube, Instagram } from 'lucide-react';

import Logo from '../images/UNIVERSIDAD-ANDINA-DEL-CUSCO.jpeg';

const Section = ({ id, title, icon: Icon, children }) => (
  <section className="py-16 bg-white">
    <div className="container mx-auto px-4">
      <div className="flex items-center justify-center mb-8">
        <Icon className="w-8 h-8 text-blue-600 mr-2" />
        <h2 className="text-3xl font-bold">{title}</h2>
      </div>
      {children}
    </div>
  </section>
);

const Card = ({ title, description, link }) => (
  <motion.div 
    className="bg-white p-6 rounded-lg shadow-lg"
    whileHover={{ scale: 1.05 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600 mb-4">{description}</p>
    <a href={link} className="text-blue-600 hover:underline">Más información</a>
  </motion.div>
);

const SEgresado = () => {
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
    { label: 'Eventos', href: 'eventos' },
    { label: 'Capacitaciones', href: 'capacitaciones' },
    { label: 'Contacto', href: 'contacto' },
    { label: 'Oportunidades', href: 'oportunidades' },
    { label: 'Egresados', href:'red'},
    { label: 'Coordinaciones' }, // Dropdown opcional
  ];

  const dropdownLinks = [
    { name: 'Inicio', url: '/'},
    { name: 'Desarrollo Formativo', url: '/Desarrollo-Formativo' },
    { name: 'Desarrollo Sostenible', url: '/DesarrolloSostenible' },
    { name: 'Extensión Universitaria', url: '/Extension-Universitaria' },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar con el componente NavbarLogo */}
      <header>
        {/* Incorporar NavbarLogo aquí */}
        <NavbarLogo
          backgroundImage={Logo}
          overlayOpacity={0.5}
          title="Seguimiento Al Egresado"
          subtitle=""
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
              Bienvenido a la Comunidad de Egresados
            </motion.h2>
            <motion.p 
              className="text-xl mb-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Mantente conectado, sigue creciendo y aprovecha las oportunidades
            </motion.p>
            <motion.a 
              href="#eventos"
              className="bg-white text-blue-700 px-6 py-3 rounded-full font-semibold hover:bg-blue-100 transition duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Explorar Eventos
            </motion.a>
          </div>
        </section>

        <Section id="eventos" title="Próximos Eventos" icon={Calendar}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card 
              title="Reunión Anual de Egresados"
              description="Únete a nosotros para una noche de networking y reconocimientos."
              link="#"
            />
            <Card 
              title="Feria de Empleo Virtual"
              description="Conecta con empleadores de primer nivel en nuestra feria virtual."
              link="#"
            />
            <Card 
              title="Conferencia de Liderazgo"
              description="Aprende de líderes de la industria en nuestra conferencia anual."
              link="#"
            />
          </div>
        </Section>

        <Section id="capacitaciones" title="Capacitaciones" icon={BookOpen}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card 
              title="Curso de Habilidades Digitales"
              description="Actualiza tus habilidades tecnológicas con nuestro curso en línea."
              link="#"
            />
            <Card 
              title="Taller de Emprendimiento"
              description="Aprende a iniciar y hacer crecer tu propio negocio."
              link="#"
            />
            <Card 
              title="Seminario de Liderazgo"
              description="Desarrolla tus habilidades de liderazgo con expertos en la materia."
              link="#"
            />
          </div>
        </Section>

        <Section id="oportunidades" title="Oportunidades de Empleo" icon={Briefcase}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card 
              title="Ingeniero de Software Senior"
              description="Empresa líder en tecnología busca ingeniero con experiencia en desarrollo web."
              link="#"
            />
            <Card 
              title="Gerente de Marketing Digital"
              description="Agencia de publicidad busca profesional para liderar equipo de marketing digital."
              link="#"
            />
            <Card 
              title="Analista Financiero"
              description="Banco internacional busca analista financiero para su sede en la ciudad."
              link="#"
            />
          </div>
        </Section>

        <Section id="red" title="Red de Egresados" icon={Users}>
          <div className="text-center">
            <p className="text-xl mb-8">Únete a nuestra red de más de 10,000 egresados en todo el mundo</p>
            <motion.a 
              href="#"
              className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Unirme a la Red
            </motion.a>
          </div>
        </Section>

        <section id="contacto" className="py-16 bg-gray-200">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">Contáctanos</h2>
            <div className="flex flex-wrap justify-center gap-8">
              <div className="flex items-center">
                <Mail className="w-6 h-6 text-blue-600 mr-2" />
                <span>ovillena@uandina.edu.pe</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-6 h-6 text-blue-600 mr-2" />
                <span>dirseu@uandina.edu.pe</span>
              </div>
              <div className="flex items-center">
                <Phone className="w-6 h-6 text-blue-600 mr-2" />
                <span>+51 123 456 789</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-6 h-6 text-blue-600 mr-2" />
                <span>Av. </span>
              </div>
            </div>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8">
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 mb-2">Inscripciones</label>
                <input 
                  type="email" 
                  id="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  required 
                  placeholder="Tu correo electrónico"
                />
              </div>
              <button 
                type="submit" 
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
              >
                Inscribirme
              </button>
            </form>
          </div>
        </section>
      </main>

      <footer className="bg-blue-600 text-white py-4 text-center">
        <p>&copy; {new Date().getFullYear()} Universidad. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default SEgresado;
