USE railway;

SELECT * FROM users;
-- DELETE FROM users WHERE id = 32;

CREATE TABLE tokens(
	id INT AUTO_INCREMENT PRIMARY KEY,
    token TEXT NOT NULL
);

CREATE TABLE users(
	id INT AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
	role ENUM('admin', 'student') NOT NULL
);

CREATE TABLE estudiantes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    codigo VARCHAR(20) NOT NULL UNIQUE,
    matricula VARCHAR(50) NOT NULL,
    carrera VARCHAR(100) NOT NULL,
    semestre INT NOT NULL,
    fecha_nacimiento DATE,
    telefono VARCHAR(15),
    direccion TEXT,
    user_id INT UNIQUE, -- Relación uno a uno
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE egresados (
    id INT AUTO_INCREMENT PRIMARY KEY,
    codigo VARCHAR(20) NOT NULL UNIQUE,
    carrera VARCHAR(100) NOT NULL,
    promocion INT NOT NULL,
    telefono VARCHAR(15),
    direccion TEXT,
    user_id INT UNIQUE, -- Relación uno a uno
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE docentes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    codigo_docente VARCHAR(20) NOT NULL UNIQUE,
    departamento VARCHAR(100) NOT NULL,
    telefono VARCHAR(15),
    direccion TEXT,
    user_id INT UNIQUE, -- Relación uno a uno
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Crear la tabla talleres
CREATE TABLE talleres (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT NOT NULL,
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE NOT NULL,
    lugar VARCHAR(100) NOT NULL,
    cupo_maximo INT NOT NULL
);

-- Crear la tabla capacitaciones
CREATE TABLE capacitaciones (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT NOT NULL,
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE NOT NULL,
    lugar VARCHAR(100) NOT NULL,
    cupo_maximo INT NOT NULL
);

-- Crear la tabla ofertas_laborales
CREATE TABLE ofertas_laborales (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT NOT NULL,
    empresa VARCHAR(100) NOT NULL,
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE NOT NULL
);

-- Crear la tabla voluntariados
CREATE TABLE voluntariados (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT NOT NULL,
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE NOT NULL,
    lugar VARCHAR(100) NOT NULL,
    cupo_maximo INT NOT NULL
);


USE railway;
-- Crear la tabla inscripciones_talleres
CREATE TABLE inscripciones_talleres (
    id INT PRIMARY KEY AUTO_INCREMENT,
    entidad_id INT NOT NULL,
    estudiante_id INT NOT NULL,
    fecha_inscripcion DATE NOT NULL,
    estado ENUM('aprobado', 'pendiente', 'rechazado') NOT NULL,
    FOREIGN KEY (entidad_id) REFERENCES talleres(id) ON DELETE CASCADE,
    FOREIGN KEY (estudiante_id) REFERENCES estudiantes(id) ON DELETE CASCADE
);

-- Crear la tabla inscripciones_capacitaciones
CREATE TABLE inscripciones_capacitaciones (
    id INT PRIMARY KEY AUTO_INCREMENT,
    entidad_id INT NOT NULL,
    estudiante_id INT NOT NULL,
    fecha_inscripcion DATE NOT NULL,
    estado ENUM('aprobado', 'pendiente', 'rechazado') NOT NULL,
    FOREIGN KEY (entidad_id) REFERENCES capacitaciones(id) ON DELETE CASCADE,
    FOREIGN KEY (estudiante_id) REFERENCES estudiantes(id) ON DELETE CASCADE
);

-- Crear la tabla inscripciones_voluntariados
CREATE TABLE inscripciones_voluntariados (
    id INT PRIMARY KEY AUTO_INCREMENT,
    entidad_id INT NOT NULL,
    estudiante_id INT NOT NULL,
    fecha_inscripcion DATE NOT NULL,
    estado ENUM('aprobado', 'pendiente', 'rechazado') NOT NULL,
    FOREIGN KEY (entidad_id) REFERENCES voluntariados(id) ON DELETE CASCADE,
    FOREIGN KEY (estudiante_id) REFERENCES estudiantes(id) ON DELETE CASCADE
);

-- Crear la tabla postulaciones_ofertas
CREATE TABLE inscripciones_ofertas_laborales (
    id INT PRIMARY KEY AUTO_INCREMENT,
    entidad_id INT NOT NULL,
    estudiante_id INT NOT NULL,
    fecha_postulacion DATE NOT NULL,
    estado ENUM('aprobado', 'pendiente', 'rechazado') NOT NULL,
    FOREIGN KEY (entidad_id) REFERENCES ofertas_laborales(id) ON DELETE CASCADE,
    FOREIGN KEY (estudiante_id) REFERENCES estudiantes(id) ON DELETE CASCADE
);

USE railway;

-- INSERTS
INSERT INTO talleres (nombre, descripcion, fecha_inicio, fecha_fin, lugar, cupo_maximo) VALUES
('Taller de Robótica', 'Aprende a construir y programar robots.', '2024-06-15', '2024-06-20', 'Laboratorio de Ingeniería', 30),
('Taller de Fotografía', 'Domina las técnicas básicas y avanzadas de fotografía.', '2024-07-01', '2024-07-05', 'Aula 201', 20),
('Taller de Pintura', 'Explora tu creatividad a través de la pintura.', '2024-08-10', '2024-08-15', 'Aula de Artes', 25),
('Taller de Cocina', 'Aprende a preparar platos tradicionales.', '2024-09-05', '2024-09-10', 'Cocina del Campus', 15),
('Taller de Escritura Creativa', 'Desarrolla tus habilidades de escritura.', '2024-10-12', '2024-10-17', 'Biblioteca', 20),
('Taller de Programación', 'Introducción a la programación en Python.', '2024-11-01', '2024-11-05', 'Laboratorio de Computación', 35),
('Taller de Jardinería', 'Aprende técnicas básicas de jardinería.', '2024-05-01', '2024-05-05', 'Jardín Botánico', 10),
('Taller de Música', 'Iniciación a la guitarra y otros instrumentos.', '2024-06-20', '2024-06-25', 'Aula de Música', 25),
('Taller de Yoga', 'Prácticas de yoga para el bienestar físico y mental.', '2024-07-15', '2024-07-20', 'Gimnasio', 20),
('Taller de Fotografía Avanzada', 'Técnicas avanzadas de fotografía digital.', '2024-08-25', '2024-08-30', 'Aula 202', 15);

INSERT INTO capacitaciones (nombre, descripcion, fecha_inicio, fecha_fin, lugar, cupo_maximo) VALUES
('Capacitación en Liderazgo', 'Desarrolla habilidades de liderazgo y gestión de equipos.', '2024-06-10', '2024-06-12', 'Sala de Conferencias', 50),
('Capacitación en Marketing Digital', 'Aprende estrategias de marketing en redes sociales.', '2024-07-15', '2024-07-17', 'Aula 305', 40),
('Capacitación en Finanzas Personales', 'Gestiona tus finanzas personales de manera eficiente.', '2024-08-20', '2024-08-22', 'Aula 401', 30),
('Capacitación en Primeros Auxilios', 'Adquiere conocimientos básicos de primeros auxilios.', '2024-09-25', '2024-09-27', 'Laboratorio de Salud', 20),
('Capacitación en Gestión de Proyectos', 'Domina las técnicas de gestión de proyectos.', '2024-10-10', '2024-10-12', 'Aula 502', 35),
('Capacitación en Desarrollo Web', 'Aprende a desarrollar aplicaciones web modernas.', '2024-11-05', '2024-11-07', 'Laboratorio de Computación', 45),
('Capacitación en Recursos Humanos', 'Gestión y desarrollo del talento humano.', '2024-05-15', '2024-05-17', 'Aula 203', 25),
('Capacitación en Innovación Empresarial', 'Fomenta la innovación en tu empresa.', '2024-06-25', '2024-06-27', 'Aula 302', 30),
('Capacitación en Seguridad Informática', 'Protege tu información y sistemas.', '2024-07-30', '2024-08-01', 'Laboratorio de Redes', 40),
('Capacitación en Ventas', 'Estrategias y técnicas efectivas de ventas.', '2024-08-10', '2024-08-12', 'Aula 404', 35);


INSERT INTO ofertas_laborales (nombre, descripcion, empresa, fecha_inicio, fecha_fin) VALUES
('Desarrollador Web', 'Empresa de tecnología busca desarrollador web con experiencia en React.', 'Tech Solutions', '2024-06-01', '2024-06-30'),
('Analista de Datos', 'Se requiere analista de datos para el área de marketing.', 'Data Corp', '2024-07-01', '2024-07-31'),
('Diseñador Gráfico', 'Empresa de publicidad busca diseñador gráfico creativo.', 'Creativa S.A.', '2024-08-01', '2024-08-31'),
('Ingeniero de Software', 'Desarrollo de software en equipo ágil.', 'Software Innovations', '2024-09-01', '2024-09-30'),
('Gerente de Proyecto', 'Gestión de proyectos en el sector financiero.', 'Finanzas Globales', '2024-10-01', '2024-10-31'),
('Especialista en SEO', 'Optimización de motores de búsqueda para e-commerce.', 'E-Commerce Experts', '2024-11-01', '2024-11-30'),
('Contador Público', 'Empresa contable busca contador público con experiencia.', 'Contable S.A.', '2024-05-01', '2024-05-31'),
('Desarrollador de Aplicaciones Móviles', 'Desarrollo de aplicaciones para iOS y Android.', 'AppDev', '2024-06-01', '2024-06-30'),
('Administrador de Sistemas', 'Mantenimiento y administración de sistemas informáticos.', 'SysAdmin Corp', '2024-07-01', '2024-07-31'),
('Especialista en Marketing', 'Desarrollo de estrategias de marketing digital.', 'Marketing Solutions', '2024-08-01', '2024-08-31');


INSERT INTO voluntariados (nombre, descripcion, fecha_inicio, fecha_fin, lugar, cupo_maximo) VALUES
('Voluntariado Ambiental', 'Actividades de reforestación y limpieza de áreas verdes.', '2024-06-05', '2024-06-10', 'Parque Nacional', 50),
('Voluntariado Social', 'Apoyo en comedores comunitarios y centros de atención.', '2024-07-10', '2024-07-15', 'Centro Comunitario', 40),
('Voluntariado Educativo', 'Apoyo en programas de alfabetización y educación.', '2024-08-15', '2024-08-20', 'Escuela Rural', 30),
('Voluntariado de Salud', 'Campañas de salud y vacunación en zonas rurales.', '2024-09-20', '2024-09-25', 'Centro de Salud', 20),
('Voluntariado Cultural', 'Organización de eventos y actividades culturales.', '2024-10-25', '2024-10-30', 'Casa de la Cultura', 25),
('Voluntariado Deportivo', 'Organización de torneos y actividades deportivas.', '2024-11-01', '2024-11-05', 'Estadio Municipal', 35),
('Voluntariado de Construcción', 'Construcción y reparación de viviendas en comunidades vulnerables.', '2024-05-10', '2024-05-15', 'Comunidad Andina', 30),
('Voluntariado de Rescate Animal', 'Rescate y cuidado de animales en situación de calle.', '2024-06-15', '2024-06-20', 'Refugio Animal', 20),
('Voluntariado en Tecnologías', 'Capacitación en tecnologías de la información para jóvenes.', '2024-07-20', '2024-07-25', 'Laboratorio de Computación', 40),
('Voluntariado en Emergencias', 'Apoyo en situaciones de emergencia y desastres naturales.', '2024-08-25', '2024-08-30', 'Zona de Emergencia', 50);



