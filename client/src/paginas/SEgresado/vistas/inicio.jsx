import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Phone, Menu, X, ArrowUp, Mail, MapPin } from 'lucide-react';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import Carousel from 'react-material-ui-carousel';
import { Link, useLocation } from 'react-router-dom';
import { Box, Button } from '@mui/material';
import Navbar from '../componentes/nav';
import Organigrama from '../componentes/organigrama';

const comunicados = [
    {
        image: "https://z-p3-scontent.flim4-3.fna.fbcdn.net/v/t39.30808-6/462779840_122170978466156263_9139584553876081795_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeEzW4HQcXG3RIWFDkillWuODsjiuVlHiGsOyOK5WUeIa0QS9xbhNi7nDApUaEkXa8iRMnNrwdVrroyEiPpidhKu&_nc_ohc=KDUyb6E5x2oQ7kNvgFlGPEB&_nc_zt=23&_nc_ht=z-p3-scontent.flim4-3.fna&_nc_gid=A_zhSmspqq5OH1ga4A162ns&oh=00_AYCQkb8RaNhzRg_pip95p2bnvwvUkOYhDr4ubo_vsFrezg&oe=6732C79C",
    },
    {
        image: "https://z-p3-scontent.flim4-3.fna.fbcdn.net/v/t39.30808-6/466552695_122175624308156263_6765882525363261846_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=127cfc&_nc_ohc=oDwCx7h1lsMQ7kNvgFh9xdW&_nc_zt=23&_nc_ht=z-p3-scontent.flim4-3.fna&_nc_gid=AbiV9B4qbC8ExBy6lDwWSG9&oh=00_AYAyK1U_ZRrTW3HlrZ7vfhsz3fmnblt41Y31mezMHUeBvg&oe=67429407", // Otra imagen
    },
    {
        image: "https://scontent.flim19-1.fna.fbcdn.net/v/t39.30808-6/285736443_5455290727865008_7291072959320722000_n.png?stp=dst-png_p526x296&_nc_cat=105&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeEC91OLy8BErH1E4U2f_mUrdgW0Qxoik712BbRDGiKTvWEiPLAiZSln-ei1pEgiOHnKCUfFPWznhpQ1K-uCujHT&_nc_ohc=mN6IkhTy2PwQ7kNvgGvSExW&_nc_zt=23&_nc_ht=scontent.flim19-1.fna&_nc_gid=A_hLnV9xKW2r50dmbcJddo9&oh=00_AYDNbkRtWacDmyAwYlBPlaERjYeItZbmoGbbND04Ys15KQ&oe=672FF1E1", // Otra imagen
    },
    {
        image: "https://scontent.flim19-1.fna.fbcdn.net/v/t39.30808-6/397558847_6673722526037769_5069168641539854984_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=aa7b47&_nc_eui2=AeERA5RSqDb7b7Tmbm9bnZWZRc5txmLTm-VFzm3GYtOb5Tg5TmW5U918_eH15MPrIJfpVp59VU9lEfdFyKhWjceM&_nc_ohc=gO5Uvpf6WsgQ7kNvgHrK3Io&_nc_zt=23&_nc_ht=scontent.flim19-1.fna&_nc_gid=AETqSJtWnPS9dmROOqf1Vms&oh=00_AYBsom2UnYKhJCBhVaR8PAlJ8Tf29yVWdDTgzjMl1uwjuw&oe=672FE483", // Otra imagen
    },
    
];

const CardComponent = () => {
    return (
      <div className="flex flex-col items-center bg-white text-gray-800">
        {/* Encabezado y mensaje de bienvenida */}
        <div className="max-w-4xl text-center py-12 px-6">
          <h1 className="text-4xl font-light text-blue-800">Alumni UAC</h1>
          <p className="text-lg mt-4 text-gray-600">
            Bienvenido al espacio dedicado a la comunidad de graduados y egresados de la Universidad Andina del Cusco.
            Revisa todos los beneficios y oportunidades que tenemos para continuar con tu desarrollo
            personal y profesional.
          </p>
        </div>
  
        {/* Sección de contacto */}
        <div className="w-full bg-blue-900 py-8 px-6 text-white text-lg">
          <div className="max-w-4xl mx-auto">
            <p className="font-semibold">Horario de atención:</p>
            <p className="ml-4">8:00 am a 1:00 pm | 2:00 pm a 4:00 pm</p>
          </div>
        </div>
      </div>
    );
  };

const ComunicadoCarousel = () => (
    <Box
        sx={{
            width: '80%', 
            margin: '0 auto',
            padding: '2rem 0',
            backgroundColor: '#e0f2f1',
            borderRadius: '8px',
            overflow: 'hidden',
        }}
    >
        <Carousel
            navButtonsAlwaysVisible
            autoPlay={false}
            animation="slide"
            indicators={true}
            indicatorContainerProps={{
                style: {
                    marginTop: '1rem',
                    display: 'flex',
                    justifyContent: 'center',
                },
            }}
            indicatorIconButtonProps={{
                style: { color: '#B0BEC5' }, // Color de indicadores
            }}
            activeIndicatorIconButtonProps={{
                style: { color: '#007BFF' }, // Color indicador activo
            }}
            NextIcon={<ArrowForwardIos sx={{ color: '#616161' }} />}
            PrevIcon={<ArrowBackIos sx={{ color: '#616161' }} />}
        >
            {comunicados.map((comunicado, index) => (
                <Box
                    key={index}
                    component="img"
                    src={comunicado.image}
                    alt={`Comunicado ${index + 1}`}
                    sx={{
                        width: '100%',
                        height: '400px',
                        objectFit: 'contain', 
                        borderRadius: '8px',
                        boxShadow: 3,
                    }}
                />
            ))}
        </Carousel>
    </Box>
);

const InicioAlumni = () => {
    const [isOpen, setIsOpen] = useState(false);

    // Función para desplazar hacia arriba
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const location = useLocation();
    
    // Divide la ruta actual en partes
    const pathSegments = location.pathname.split('/').filter(segment => segment);

    // Crea un arreglo de enlaces
    const links = pathSegments.map((segment, index) => {
        const path = `/${pathSegments.slice(0, index + 1).join('/')}`;
        return (
        <Link key={segment} to={path} className="text-white hover:underline">
            {segment.charAt(0).toUpperCase() + segment.slice(1)}
        </Link>
        );
    });
    const image2 = "https://assets.entrepreneur.com/content/3x2/2000/20191031073847-shutterstock-56437339.jpeg"

    return (
        <div className="min-h-screen">
            {/* Navbar */}
            <Navbar />

            {/* Header */}
            <header className="mt-20">
                <div
                    className="relative bg-cover bg-center h-72"
                    style={{ backgroundImage: `url(${image2})` }}
                >
                    <div className="absolute inset-0 bg-blue-900 bg-opacity-80 backdrop-blur-md"></div>
                    <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center">
                        <h1 className="text-5xl font-bold">ALUMNI</h1>
                        <p className="mt-2 text-lg">
                        </p>
                    </div>
                </div>
            </header>
            <main className='py-0'>
                <CardComponent />
                {/* Carrusel de Comunicados */}
                <h1 className='text-center py-4'>
                    <i className='bi bi-megaphone' style={{ fontSize: '1.5em' }}></i> Comunicados
                </h1>
                <ComunicadoCarousel />
                <Organigrama />
            </main>
            <body>
                <script async src="https://cse.google.com/cse.js?cx=955fcae3e5a9647bd">
                </script>
                <div class="gcse-search"></div>
            </body>
            {/* Back to top button */}
            <button 
                onClick={scrollToTop}
                className="fixed bottom-5 right-5 bg-blue-600 text-white p-2 rounded-full shadow-lg hover:bg-blue-700 transition"
            >
                <ArrowUp className="h-5 w-5" />
            </button>
            {/* Footer */}
            <footer className="bg-blue-900 text-white py-4">
                <div className="mx-auto text-center py-6">
                    <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-6">
                        <div className="flex items-center bg-blue-800 p-4 rounded-lg shadow-lg w-full md:w-auto">
                            <MapPin className="mr-2" />
                            <p>Dirección: Larapa, Cusco</p>
                        </div>
                        <div className="flex items-center bg-blue-800 p-4 rounded-lg shadow-lg w-full md:w-auto">
                            <Phone className="mr-2" />
                            <p>60 5000-Anexo 1114</p>
                        </div>
                        <div className="flex items-center bg-blue-800 p-4 rounded-lg shadow-lg w-full md:w-auto">
                            <Mail className="mr-2" />
                            <p>ovillena@uandina.edu.pe</p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default InicioAlumni;
