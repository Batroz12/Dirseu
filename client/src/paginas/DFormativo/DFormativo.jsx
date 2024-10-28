import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Palette, Music, Camera, Theater, Users, Mic, Globe, Users2, Music4, UserCircle, Award } from 'lucide-react';
import NavbarLogo from '../componentes/navbarLogo/navbarlogo';
import Footer from '../componentes/footer/footer';
import { Facebook, Youtube, Instagram, Phone } from 'lucide-react';

import Logo from '../images/UNIVERSIDAD-ANDINA-DEL-CUSCO.jpeg';

const Workshop = ({ icon: Icon, title, description }) => (
  <motion.div 
    className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
    whileHover={{ scale: 1.05 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    <Icon className="w-12 h-12 text-blue-600 mb-4" />
    <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
    <p className="text-gray-700">{description}</p>
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
    { label: 'Inicio', href: '/' },
    { label: 'Desarrollo Formativo', href: '/Desarrollo-Formativo' },
    { label: 'Desarrollo Sostenible', href: '/Desarrollo-Sostenible' },
    { label: 'Extensión Universitaria', href: '/Extension-Universitaria' },
    { label: 'Seguimiento al Egresado', href: '/SeguimientoAlEgresado' },
  ];

  const Benefit = ({ icon: Icon, title, description }) => {
    return (
      <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 text-center">
        {Icon && <Icon className="text-blue-500 mx-auto mb-4" size={48} />}
        <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-indigo-50">
      <header>
        <NavbarLogo
          backgroundImage={Logo}
          overlayOpacity={0.5}
          title="Coordinación de Desarrollo Formativo"
          subtitle="Potencia tus habilidades creativas a través de nuestros talleres artísticos."
          socialLinks={socialLinks}
          buttons={buttons}
        />
      </header>

      <main className="bg-[#B6BEC2]">
        <section id="talleres" className="py-0">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Nuestros Talleres</h2>
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

        <section id="beneficios" className="py-0">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Beneficios de Nuestros Talleres</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Benefit 
                icon={UserCircle}  // Icono de desarrollo personal
                title="Desarrollo Personal" 
                description="Potencia tu creatividad y habilidades de expresión." 
              />
              <Benefit 
                icon={Users}  // Icono de desarrollo social
                title="Desarrollo Social" 
                description="Conecta con otros estudiantes." 
              />
              <Benefit 
                icon={Award}  // Icono de becas
                title="Becas" 
                description="Puede aplicar a medias becas o becas completas dependiendo de su participación." 
              />
            </div>
          </div>
        </section>

        <section id="contacto" className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">¿Listo para Empezar?</h2>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <button 
                type="submit" 
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300"
              >
                Más Información
              </button>
            </form>
          </div>
        </section>
      </main>


      <footer id="footer" className="py-6 bg-gray-800 text-white">
        <Footer />
      </footer>
    </div>
  );
};

export default DFormativo;