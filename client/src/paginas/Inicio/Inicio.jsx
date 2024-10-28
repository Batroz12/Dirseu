import React, { useRef } from 'react';

import '../Inicio/Inicio.css';

import { LuUsers, LuHeart, LuMail, LuBriefcase, LuGlobe } from 'react-icons/lu';
import SliderSection from '../componentes/slider/slider';
import CardsMV from '../componentes/cardMV/cardMV';
import Footer from '../componentes/footer/footer';
import NavbarLogo from '../componentes/navbarLogo/navbarlogo';
import { Facebook, Youtube, Instagram, Phone } from 'lucide-react';

import Logo from '../images/UNIVERSIDAD-ANDINA-DEL-CUSCO.jpeg';
import Logo2 from '../images/UAC.png';
import Politicas from '../componentes/politicas/politicas';
import Coordinaciones from '../componentes/queHacenCoor/hacerCoordinaciones';
import Programas from './Voluntariados';
import Capacitaciones from './CapacitacionesCarrusel';
import Talleres from './TalleresCarrusel';

const Inicio = () => {
  const conocemasRef = useRef(null);
  const programasRef = useRef(null);
  const impactoRef = useRef(null);
  const contactoRef = useRef(null);

  // Configuración de redes sociales
  const socialLinks = [
    { icon: <Facebook size={16} />, url: 'https://facebook.com', hoverColor: 'text-blue-400' },
    { icon: <Youtube size={16} />, url: 'https://youtube.com', hoverColor: 'text-red-500' },
    { icon: <Instagram size={16} />, url: 'https://instagram.com', hoverColor: 'text-pink-500' },
    { icon: <Phone size={16} />, url: 'https://wa.me/yourphonenumber', hoverColor: 'text-green-400' },
  ];


  const buttons=[
    { label: 'Desarrollo Formativo', href: '/Desarrollo-Formativo' },
    { label: 'Desarrollo Sostenible', href: '/Desarrollo-Sostenible' },
    { label: 'Extensión Universitaria', href: '/Extension-Universitaria' },
    { label: 'Seguimiento al Egresado', href: '/SeguimientoAlEgresado' },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <header>
        <NavbarLogo
          backgroundImage={Logo}
          overlayOpacity={0.5}
          title="Responsabilidad Social y Extensión Universitaria"
          subtitle="Construyendo puentes entre la universidad y la comunidad para un futuro mejor."
          socialLinks={socialLinks}
          buttons={buttons}
        />
      </header>

      <main className="flex-1">
        {/* Carrusel de imágenes */}
        {/* <section className="w-full">
          <SliderSection />
        </section> */}

        <section>
          <Coordinaciones />
        </section>

        {/* Nueva sección de Misión y Visión */}
        <section ref={conocemasRef} id="conocemas" className="w-full py-5 md:py-12 lg:py-16 bg-gray-100">
          <div className="container mx-auto px-1 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 text-gray-900 mx-auto">
            Nuestra Misión y Visión
          </h2>
              <CardsMV />
          </div>
        </section>
        {/* Seccion de politicas */}
        <section className="py-0 md:py-0 lg:py-0 bg-gray-100 min-h-screen">
          <Politicas />
        </section>

        {/* Sección de Programas */}
        <section ref={programasRef} id="programas" className="w-full py-12 md:py-12 lg:py-16 bg-gray-100">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 text-gray-900">
              Nuestros Programas
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center text-center">
                <LuUsers className="h-16 w-16 mb-6 text-blue-600" />
                <h3 className="text-2xl font-bold mb-4">Voluntariado</h3>
                <p className="text-gray-600 mb-6">
                  Oportunidades para servir y aprender en la comunidad.
                </p>
                <Programas />
              </div>
              <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center text-center">
                <LuHeart className="h-16 w-16 mb-6 text-blue-600" />
                <h3 className="text-2xl font-bold mb-4">Talleres</h3>
                <p className="text-gray-600 mb-6">
                  Espacios creativos donde puedes explorar diversas disciplinas artísticas y desarrollar tu talento.
                </p>
                <Talleres />
              </div>
              <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center text-center">
                <LuBriefcase className="h-16 w-16 mb-6 text-blue-600" />
                <h3 className="text-2xl font-bold mb-4">Desarrollo Profesional</h3>
                <p className="text-gray-600 mb-6">
                  Programas para mejorar habilidades profesionales.
                </p>
                <Capacitaciones />
              </div>
              <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center text-center">
                <LuGlobe className="h-16 w-16 mb-6 text-blue-600" />
                <h3 className="text-2xl font-bold mb-4">Desarrollo Sostenible</h3>
                <p className="text-gray-600 mb-6">
                  Programas enfocados en la sostenibilidad y el impacto ambiental.
                </p>
                {/* <DesarrolloSostenible /> */}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer ref={contactoRef} id="footer" className="py-6 bg-gray-800 text-white">
        <Footer />
      </footer>
    </div>
  );
};

export default Inicio;
