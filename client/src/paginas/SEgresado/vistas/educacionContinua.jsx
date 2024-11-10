import React, { useEffect, useState } from 'react';
import { getTableByIdRequest, registerInscriptionRequest } from "../../../api/api";
import { Phone, MapPin, Calendar, Users, ArrowUp, Mail } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../../context/AuthProvider';
import { useNavigate } from 'react-router-dom';
import Navbar from '../componentes/nav';

const CapacitacionCard = ({ id, nombre, descripcion, lugar, fecha_inicio, fecha_fin, cupo_maximo }) => {
    const [errorResponse, setErrorResponse] = useState('');
    const auth = useAuth();
    const navigate = useNavigate();

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
    };

    const handleSubscribe = async () => {
        try {
            if (auth.getUser().type !== "egresado") {
                setErrorResponse("Solo Egresados pueden inscribirse");
                return;
            }

            const response = await registerInscriptionRequest({
                table: "capacitaciones",
                entidad_id: id,
                estudiante_id: auth.getUser().id,
            });
            const json = await response.json();
            setErrorResponse(response.ok ? json.message : json.error);
        } catch (error) {
            console.error(error);
            setErrorResponse("Error al inscribirse.");
        }
    };

    return (
        <div className="bg-white shadow-lg rounded-lg p-6 mb-4 border-2 border-blue-500 transition-transform transform hover:scale-105 hover:shadow-xl">
            <h2 className="text-2xl font-semibold text-black">{nombre}</h2>
            <p className="text-gray-700 mt-2 mb-4">{descripcion}</p>

            <div className="text-gray-600 text-sm space-y-2">
                <p><MapPin className="inline mr-2" /> <span className="font-medium">Lugar:</span> {lugar}</p>
                <p><Calendar className="inline mr-2" /> <span className="font-medium">Inicio:</span> {formatDate(fecha_inicio)}</p>
                <p><Calendar className="inline mr-2" /> <span className="font-medium">Fin:</span> {formatDate(fecha_fin)}</p>
                <p><Users className="inline mr-2" /> <span className="font-medium">Cupos:</span> {cupo_maximo}</p>
            </div>

            <button 
                onClick={handleSubscribe}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
                Inscribirse
            </button>

            {errorResponse && (
                <div className="mt-2 text-red-500">{errorResponse}</div>
            )}
        </div>
    );
};

export default function EducacionContinua() {
    const [capacitaciones, setCapacitaciones] = useState([]);
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
    
    useEffect(() => {
        fetch('http://localhost:4000/api/capacitaciones')
            .then(response => response.json())
            .then(data => setCapacitaciones(data))
            .catch(error => console.error("Error al cargar capacitaciones:", error));
    }, []);
    const image2 = "https://assets.entrepreneur.com/content/3x2/2000/20191031073847-shutterstock-56437339.jpeg"

    return (
        <>
            {/* Navbar */}
            <Navbar />
    
            {/* Header */}
            <header className="mt-16">
                <div
                    className="relative bg-cover bg-center h-72"
                    style={{ backgroundImage: `url(${image2})` }} // Corregido aquí
                >
                    <div className="absolute inset-0 bg-blue-900 bg-opacity-80 backdrop-blur-md"></div>
                    <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center">
                        <h1 className="text-5xl font-bold">Recursos Academicos</h1>
                        <p className="mt-2 text-lg">
                            <Link to="/Homes" className="hover:underline">Home</Link> / {links.reduce((prev, curr) => [prev, ' / ', curr])}
                        </p>
                    </div>
                </div>
            </header>
    
            {/* Main Content */}
            <main>
            <div className="max-w-6xl mx-auto p-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Capacitaciones</h1>
                <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {capacitaciones.map((capacitacion) => (
                    <CapacitacionCard key={capacitacion.id} {...capacitacion} />
                    ))}
                </div>
            </div>
            </main>
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
        </>
    );
}
