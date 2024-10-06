import React, { useState } from 'react';
import './mof.css';

const accordionData = [
  {
    title: 'Propósito',
    content: 'Programar y desarrollar las actividades inherentes a la cooperación del desarrollo sostenible que permitan integrar y vincular a la universidad, con la sociedad a través de planes, programas y proyectos de carácter sociales o ambientales a favor de la población local, regional y nacional.'
  },
  {
    title: 'Funciones Específicas',
    content: [
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
    ]
  }
];

const AccordionItem = ({ title, content, isOpen, toggleAccordion }) => {
  return (
    <div className={`accordion-item ${isOpen ? 'open' : ''}`}>
      <button className="accordion-title" onClick={toggleAccordion}>
        {title}
        <span className="accordion-icon">{isOpen ? '−' : '+'}</span>
      </button>
      <div className="accordion-content">
        {Array.isArray(content) ? (
          <ul className="function-list">
            {content.map((item, index) => (
              <li key={index}>
                <span className="arrow-icon">➤</span>
                {item}
              </li>
            ))}
          </ul>
        ) : (
          <p>{content}</p>
        )}
      </div>
    </div>
  );
};

const Mof = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="background-container">
      <div className="overlay"></div>
      <div className="accordion-container">
        <h2>Desarrollo Sostenible en la Universidad</h2>
        {accordionData.map((item, index) => (
          <AccordionItem
            key={index}
            title={item.title}
            content={item.content}
            isOpen={openIndex === index}
            toggleAccordion={() => toggleAccordion(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Mof;