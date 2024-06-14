import jsPDF from 'jspdf';

const generatePDF = ({ egresadoData, experienciaLaboral, habilidades, otros, descripcion }) => {
    const { firstName, lastName, email, codigo, carrera, promocion, telefono, direccion } = egresadoData;

    const doc = new jsPDF();

    // Función para dibujar divisores
    const drawDivider = (y) => {
        doc.setLineWidth(0.5);
        doc.setDrawColor(0);
        doc.line(20, y, 190, y);
    };

    // Encabezado
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(24);
    doc.setTextColor(33, 150, 243); // Color azul
    doc.setFillColor(255, 255, 255); // Fondo blanco
    doc.rect(20, 15, 170, 18, 'F'); // Rectángulo de fondo para el título
    doc.text('Currículum Vitae', 105, 25, { align: 'center' });

    // Información Personal
    doc.setTextColor(0, 0, 0); // Color negro
    doc.setFontSize(12);
    doc.setFillColor(245, 245, 245); // Fondo gris claro
    const personalLines = doc.splitTextToSize(`Nombre: ${firstName} ${lastName}\nEmail: ${email}`, 150);
    doc.rect(20, 30, 170, personalLines.length * 10, 'F'); // Rectángulo de fondo para la sección
    doc.text(personalLines, 25, 40);
    drawDivider(40 + personalLines.length * 10); // Divisor después de Información Personal

    // Datos Académicos
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.setTextColor(33, 150, 243); // Color azul
    doc.setFillColor(255, 255, 255); // Fondo blanco
    doc.rect(20, 50 + personalLines.length * 10, 80, 10, 'F'); // Rectángulo de fondo para el título
    doc.text('Datos Académicos', 35, 55 + personalLines.length * 10);

    doc.setTextColor(0, 0, 0); // Color negro
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    doc.setFillColor(245, 245, 245); // Fondo gris claro
    const academicLines = doc.splitTextToSize(`Código Alumno: ${codigo}\nCarrera: ${carrera}\nPromoción: ${promocion}\nTeléfono: ${telefono}\nDirección: ${direccion}`, 150);
    doc.rect(20, 60 + personalLines.length * 10, 170, academicLines.length * 10, 'F'); // Rectángulo de fondo para la sección
    doc.text(academicLines, 25, 70 + personalLines.length * 10);
    drawDivider(70 + personalLines.length * 10 + academicLines.length * 10); // Divisor después de Datos Académicos

    // Experiencia Laboral
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.setTextColor(33, 150, 243); // Color azul
    doc.setFillColor(255, 255, 255); // Fondo blanco
    doc.rect(20, 140, 80, 10, 'F'); // Rectángulo de fondo para el título
    doc.text('Experiencia Laboral', 35, 145);

    doc.setTextColor(0, 0, 0); // Color negro
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    doc.setFillColor(245, 245, 245); // Fondo gris claro
    doc.rect(20, 150, 80, 50, 'F'); // Rectángulo de fondo para la sección
    const expLines = doc.splitTextToSize(experienciaLaboral, 70); // Dividir texto en líneas de 70 de ancho
    doc.text(expLines, 25, 160);
    drawDivider(210); // Divisor después de Experiencia Laboral

    // Habilidades
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.setTextColor(33, 150, 243); // Color azul
    doc.setFillColor(255, 255, 255); // Fondo blanco
    doc.rect(20, 220, 80, 10, 'F'); // Rectángulo de fondo para el título
    doc.text('Habilidades', 35, 225);

    doc.setTextColor(0, 0, 0); // Color negro
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    doc.setFillColor(245, 245, 245); // Fondo gris claro
    doc.rect(20, 230, 80, 30, 'F'); // Rectángulo de fondo para la sección
    const skillsLines = doc.splitTextToSize(habilidades, 70); // Dividir texto en líneas de 70 de ancho
    doc.text(skillsLines, 25, 240);
    drawDivider(270); // Divisor después de Habilidades

    // Otros
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.setTextColor(33, 150, 243); // Color azul
    doc.setFillColor(255, 255, 255); // Fondo blanco
    doc.rect(110, 220, 80, 10, 'F'); // Rectángulo de fondo para el título
    doc.text('Otros', 145, 225);

    doc.setTextColor(0, 0, 0); // Color negro
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    doc.setFillColor(245, 245, 245); // Fondo gris claro
    doc.rect(110, 230, 80, 30, 'F'); // Rectángulo de fondo para la sección
    const otrosLines = doc.splitTextToSize(otros, 70); // Dividir texto en líneas de 70 de ancho
    doc.text(otrosLines, 115, 240);

    // Descripción Adicional
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.setTextColor(33, 150, 243); // Color azul
    doc.setFillColor(255, 255, 255); // Fondo blanco
    doc.rect(110, 140, 80, 10, 'F'); // Rectángulo de fondo para el título
    doc.text('Descripción Adicional', 115, 145);

    doc.setTextColor(0, 0, 0); // Color negro
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    doc.setFillColor(245, 245, 245); // Fondo gris claro
    doc.rect(110, 150, 80, 40, 'F'); // Rectángulo de fondo para la sección
    const descLines = doc.splitTextToSize(descripcion, 70); // Dividir texto en líneas de 70 de ancho
    doc.text(descLines, 115, 160);

    // Guardar y descargar el PDF
    doc.save('cv.pdf');
};

export default generatePDF;
