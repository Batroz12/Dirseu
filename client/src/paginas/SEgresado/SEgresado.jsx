import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp, Calendar, BookOpen, Briefcase, Users, Mail, Phone, Book, FileText, Scale, Microscope, Search } from 'lucide-react';
import NavbarLogo from '../componentes/navbarLogo/navbarlogo';
import { Facebook, Youtube, Instagram } from 'lucide-react';
import FormatosAcademicosActualizados from '../../egresado/formatosAcademicos';
import Convenios from './componentes/convenios';
import Footer from '../componentes/footer/footer';
import Logo from '../images/UNIVERSIDAD-ANDINA-DEL-CUSCO.jpeg';
import RecursosAcademicos from './componentes/recursosAcademicos';
import Mof from '../componentes/mof/mof';
import Separador from '../componentes/separador';
import axios from 'axios';

// Sección reutilizable con icono y título
const Section = ({ id, title, icon: Icon, children }) => (
  <section id={id} className="py-4 bg-white">
    <div className="container mx-auto px-4">
      <div className="flex items-center justify-center mb-8">
        <Icon className="w-8 h-8 text-blue-600 mr-2" />
        <h2 className="text-3xl font-bold">{title}</h2>
      </div>
      {children}
    </div>
  </section>
);

// Componente para una tarjeta con animación
const Card = ({ title, description, link, showLink = true }) => (
  <motion.div 
    className="bg-white p-6 rounded-lg shadow-lg"
    whileHover={{ scale: 1.05 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600 mb-4">{description}</p>
    {showLink && (
      <a href={link} className="text-blue-600 hover:underline">Más información</a>
    )}
  </motion.div>
);

const SEgresado = () => {
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [capacitaciones, setCapacitaciones] = useState([]);
  const [empleos, setEmpleos] = useState([]);
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const purpose = 'Programar, organizar, coordinar y controlar la implementación del Programa de Seguimiento del Graduado en las Escuelas Profesionales de la Sede Central y Filial y posibilitar la retroalimentación de las nuevas exigencias y cambios del contexto socio laboral y cultural de nuestra región, del país y del ámbito internacional; con el fin de efectuar ajustes a estructuras curriculares de las Escuelas Profesionales correspondientes cuando se requieran. ';
  const functions = [
    'Proponer y ejecutar las políticas, normas y procedimientos en el ámbito de su competencia. ',
    'Elaborar y proponer el Plan y Presupuesto Operativo de la Coordinación ',
    'Asesorar y apoyar a las Escuelas Profesionales y las Facultades de la Universidad en la elaboración de su directorio de graduados, así como en la conformación de sus respectivas Asociaciones de Graduados.',
    'Desarrollar el Sistema Integral de Información del programa de Seguimiento del Graduado. ',
    'Coordinar con la Dirección Tecnologías de Información para el desarrollo del soporte estadístico y gráfico del programa de Seguimiento del Graduado, a fin de brindar información actualizada. ',
    'Recoger la información de parte de los graduados para evaluar la pertinencia de los planes de estudio y de los perfiles de egresados de las escuelas profesionales de la Universidad; identificar las necesidades de formación y capacitación y desempeño laboral de los graduados',
    'Contar con la información confiable y oportuna de la oferta laboral a nivel local, regional, nacional e internacional, para los graduados de la Universidad y facilitar su inserción laboral. ',
    'Informar los resultados de los estudios de seguimiento de graduados realizados,para la mejora de sus procesos sustantivos del proceso enseñanza-aprendizaje, investigación. ',
    'Recomendar la actualización de los planes de estudio de las escuelas profesionales de la Universidad y coadyuvar a la mejora continua en el proceso formativo del estudiante de la Universidad Andina',
    'Planificar y organizar eventos académicos, actividades socioculturales y deportivas, para fomentar la vinculación y fidelización de los graduados con la Universidad. ',
    'Coordinar y promover actividades académicas de formación continua para los egresados y graduados en coordinación con la Dirección de Desarrollo Académico y la Escuela de Posgrado de la Universidad. ',
    'Elaborar informes estadísticos anuales como mecanismo de rendición de cuentas a la sociedad y para elaborar planes de mejora',
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

  const recursos = [
    { id: 'formatos', title: 'Formatos', icon: FileText, link: '#formatos' },
    { id: 'resoluciones', title: 'Resoluciones', icon: Book, link: '#resoluciones' },
    { id: 'reglamentos', title: 'Reglamentos', icon: Scale, link: '#reglamentos' },
    { id: 'investigacion', title: 'Investigación', icon: Microscope, link: '#investigacion' },
    { id: 'turnitin', title: 'Turnitin', icon: Search, link: '#turnitin' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Función para volver al inicio
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const fetchCapacitaciones = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/capacitaciones/');
        if (Array.isArray(response.data)) {
          const capacitacionesOrdenadas = response.data.sort((a, b) => new Date(b.fecha_inicio) - new Date(a.fecha_inicio));
          const tresMasRecientes = capacitacionesOrdenadas.slice(0, 3);
          setCapacitaciones(tresMasRecientes);
        } else {
          console.error('La respuesta de la API no es un arreglo', response.data);
        }
      } catch (err) {
        setError('Error al cargar las capacitaciones.');
      } finally {
        setLoading(false);
      }
    };
  
    const fetchEmpleos = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/empleos/');
        if (Array.isArray(response.data)) {
          const empleosOrdenados = response.data.sort((a, b) => new Date(b.fecha_inicio) - new Date(a.fecha_inicio));
          const tresMasRecientes = empleosOrdenados.slice(0, 3);
          setEmpleos(tresMasRecientes);
        } else {
          console.error('La respuesta de la API no es un arreglo', response.data);
        }
      } catch (err) {
        setError('Error al cargar los empleos.');
      }
    };
  
    const fetchEventos = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/eventos/');
        if (Array.isArray(response.data)) {
          const eventosOrdenados = response.data.sort((a, b) => new Date(b.fecha_evento) - new Date(a.fecha_evento));
          const tresMasRecientes = eventosOrdenados.slice(0, 3);
          setEventos(tresMasRecientes);
        } else {
          console.error('La respuesta de la API no es un arreglo', response.data);
        }
      } catch (err) {
        setError('Error al cargar los eventos.');
      }
    };
  
    fetchCapacitaciones();
    fetchEmpleos();
    fetchEventos();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Navbar con el componente NavbarLogo */}
      <header>
        <NavbarLogo
          backgroundImage={Logo}
          overlayOpacity={0.5}
          title="Coordinación de la Unidad de Seguimiento al Egresado y Graduado"
          socialLinks={socialLinks}
          buttons={buttons}
          showLoginButton={true}
        />
      </header>
      <main className="">
        {/* Convenios */}
        <section className="py-0 mx-auto px-4 sm:px-6 lg:px-8">
          <Convenios />
        </section>
        {/* Sección de Eventos */}
        <Section id="eventos" title="Próximos Eventos" icon={Calendar}>
          {loading && <div>Cargando eventos...</div>}
          {error && <div>{error}</div>}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.isArray(eventos) && eventos.map((evento) => (
              <Card 
                key={evento.id} // Usa un identificador único
                title={evento.nombre}
                description={evento.descripcion}
                showLink={false}
              />
            ))}
          </div>
        </Section>
        <Separador />
        {/* Sección de Capacitaciones */}
        <Section id="capacitaciones" title="Capacitaciones" icon={BookOpen}>
          {loading && <div>Cargando capacitaciones...</div>}
          {error && <div>{error}</div>}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.isArray(capacitaciones) && capacitaciones.map((capacitacion) => (
            <Card 
              key={capacitacion.id} // Asegúrate de que `id` es el identificador único
              title={capacitacion.nombre}
              description={capacitacion.descripcion}
              link="Alumni/Capacitaciones" // Cambia esto si necesitas una ruta específica
            />
          ))}
          </div>
        </Section>
        <Separador />
        {/* Sección de Oportunidades de Empleo */}
        <Section id="empleos" title="Oportunidades de Empleo" icon={Briefcase}>
          {loading && <div>Cargando oportunidades de empleo...</div>}
          {error && <div>{error}</div>}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.isArray(empleos) && empleos.map((empleo) => (
              <Card 
                key={empleo.id}
                title={empleo.nombre}
                description={empleo.descripcion}
                link="Alumni/Bolsa-Laboral"
              />
            ))}
          </div>
        </Section>
        <Separador />
        {/* Formatos académicos */}
        <section className="bg-gray-50">
          <div className="container mx-auto px-4 flex flex-col items-center">
            {/* Primera parte: Título */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-center text-gray-800">Recursos Académicos</h2>
            </div>
            {/* Segunda parte: Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-8">
              {recursos.map((recurso) => {
                const Icon = recurso.icon;
                return (
                  <div key={recurso.id} className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center justify-between transition-transform hover:scale-105">
                    <div className="text-center">
                      <Icon className="w-16 h-16 text-blue-600 mb-6" />
                      <h3 className="text-2xl font-semibold text-gray-800 mb-4">{recurso.title}</h3>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <footer id="footer" className="py-6 bg-gray-800 text-white">
        <Footer />
      </footer>
      <AnimatePresence>
        {showScrollButton && (
          <motion.button
            onClick={scrollToTop}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-5 right-5 p-3 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700"
          >
            <ArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SEgresado;
