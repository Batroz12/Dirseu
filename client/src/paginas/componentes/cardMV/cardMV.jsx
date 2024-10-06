import React, { useState } from 'react';
import { LuBook, LuEye } from 'react-icons/lu';
import '../cardMV/cardMV.css';

const Card = ({ title, content, Icon }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  
  return (
    <div 
      className="flip-card w-full md:w-1/2 p-4"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div className={`flip-card-inner ${isFlipped ? 'is-flipped' : ''}`}>
        <div className="flip-card-front bg-white p-6 rounded-lg shadow-lg">
          <Icon className="h-12 w-12 mb-4 text-blue-600" />
          <h3 className="text-2xl font-bold mb-2">{title}</h3>
          <p className="text-gray-600">Haz clic para más información</p>
        </div>
        <div className="flip-card-back flex-grow bg-blue-600 text-black p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold mb-4">{title}</h3>
          <p className="text-sm">{content}</p>
        </div>
      </div>
    </div>
  );
};

const CardsMV = () => {
  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <Card
          title="Misión"
          content="La Dirección de Responsabilidad Social y Extensión Universitaria de la Universidad Andina del Cusco planifica, organiza y dirige las actividades de responsabilidad social y extensión universitaria, promoviendo y articulando las iniciativas de los estudiantes, docentes, egresados y graduados de la Universidad Andina del Cusco, para contribuir al desarrollo sostenible de la comunidad local, regional y nacional."
          Icon={LuBook}
        />
        <Card
          title="Visión"
          content="La Dirección de Responsabilidad Social y Extensión Universitaria de la Universidad Andina del Cusco al 2025, será líder en la gestión ética y eficaz del impacto generado por la universidad contribuyendo al desarrollo sostenible de la sociedad, en base al ejercicio de sus funciones sustantivas de formación profesional, de investigación, de servicios de extensión y proyección social."
          Icon={LuEye}
        />
      </div>
    </div>
  );
};

export default CardsMV;
