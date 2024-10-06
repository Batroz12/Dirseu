import React, { useRef } from 'react';

import '../Inicio/Inicio.css';

import { LuUsers, LuHeart, LuMail } from 'react-icons/lu';
import SliderSection from '../componentes/slider/slider';
import CardsMV from '../componentes/cardMV/cardMV';
import Footer from '../componentes/footer/footer';
import NavbarLogo from '../componentes/navbarLogo/navbarlogo';
import { Facebook, Youtube, Instagram, Phone } from 'lucide-react';

import Logo from '../images/UNIVERSIDAD-ANDINA-DEL-CUSCO.jpeg';
import Logo2 from '../images/UAC.png';
import Politicas from '../componentes/politicas/politicas';

const Inicio = () => {
  const conocemasRef = useRef(null);
  const programasRef = useRef(null);
  const impactoRef = useRef(null);
  const contactoRef = useRef(null);

  const socialLinks = [
    { icon: <Facebook size={16} />, url: 'https://facebook.com', hoverColor: 'text-blue-400' },
    { icon: <Youtube size={16} />, url: 'https://youtube.com', hoverColor: 'text-red-500' },
    { icon: <Instagram size={16} />, url: 'https://instagram.com', hoverColor: 'text-pink-500' },
    { icon: <Phone size={16} />, url: 'https://wa.me/yourphonenumber', hoverColor: 'text-green-400' },
  ];

  const buttons = [
    {
      label: 'Conoce más',
      onClick: () => {
        if (programasRef.current) {
          programasRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      },
      href: 'conocemas',
    },
    {
      label: 'Programas',
      onClick: () => {
        if (contactoRef.current) {
          contactoRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      },
      href: 'programas',
    },
    {
      label: 'Impacto',
      onClick: () => {
        if (contactoRef.current) {
          contactoRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      },
      href: 'impacto',
    },
    {
      label: 'Contáctanos',
      onClick: () => {
        if (contactoRef.current) {
          contactoRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      },
      href: 'footer',
    },
    { label: 'Coordinaciones' }, // Dropdown manejado aquí
  ];

  const dropdownLinks = [
    { name: 'Desarrollo Formativo', url: '/Desarrollo-Formativo' },
    { name: 'Desarrollo Sostenible', url: '/Desarrollo-Sostenible' },
    { name: 'Extensión Universitaria', url: '/Extension-Universitaria' },
    { name: 'Seguimiento al Egresado', url: '/SeguimientoAlEgresado' },
  ];

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
          dropdownLinks={dropdownLinks}
        />
      </header>

      <main className="flex-1">
        {/* Carrusel de imágenes */}
        <section className="w-full">
          <SliderSection />
        </section>

        {/* Nueva sección de Misión y Visión */}
        <section ref={conocemasRef} id="conocemas" className="w-full py-12 md:py-12 lg:py-16 bg-gray-100">
          <div className="container mx-auto px-1 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 text-gray-900">Nuestra Misión y Visión</h2>
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
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 text-gray-900">Nuestros Programas</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <LuUsers className="h-12 w-12 mb-4 text-blue-600" />
                <h3 className="text-2xl font-bold mb-2">Voluntariado</h3>
                <p className="text-gray-600">Oportunidades para servir y aprender en la comunidad.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <LuMail className="h-12 w-12 mb-4 text-blue-600" />
                <h3 className="text-2xl font-bold mb-2">Educación Continua</h3>
                <p className="text-gray-600">Programas de formación para profesionales y comunidad.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <LuHeart className="h-12 w-12 mb-4 text-blue-600" />
                <h3 className="text-2xl font-bold mb-2">Proyectos Sociales</h3>
                <p className="text-gray-600">Iniciativas que impactan positivamente en la sociedad.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Sección de Impacto */}
        <section ref={impactoRef} id="impacto" className="w-full py-12 md:py-12 lg:py-16">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12 text-gray-900">Nuestro Impacto</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <h3 className="text-5xl font-bold text-blue-600 mb-2">5000+</h3>
                <p className="text-xl text-gray-600">Estudiantes Voluntarios</p>
              </div>
              <div>
                <h3 className="text-5xl font-bold text-blue-600 mb-2">100+</h3>
                <p className="text-xl text-gray-600">Proyectos Comunitarios</p>
              </div>
              <div>
                <h3 className="text-5xl font-bold text-blue-600 mb-2">50+</h3>
                <p className="text-xl text-gray-600">Alianzas Estratégicas</p>
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
