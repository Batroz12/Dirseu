-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 13-09-2024 a las 02:09:07
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `dbdirseu`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `capacitaciones`
--

CREATE TABLE `capacitaciones` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `descripcion` text NOT NULL,
  `fecha_inicio` date NOT NULL,
  `fecha_fin` date NOT NULL,
  `lugar` varchar(100) NOT NULL,
  `cupo_maximo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `capacitaciones`
--

INSERT INTO `capacitaciones` (`id`, `nombre`, `descripcion`, `fecha_inicio`, `fecha_fin`, `lugar`, `cupo_maximo`) VALUES
(1, 'Capacitación en Liderazgo', 'Desarrolla habilidades de liderazgo y gestión de equipos.', '2024-06-10', '2024-06-12', 'Sala de Conferencias', 50),
(2, 'Capacitación en Marketing Digital', 'Aprende estrategias de marketing en redes sociales.', '2024-07-15', '2024-07-17', 'Aula 305', 40),
(3, 'Capacitación en Finanzas Personales', 'Gestiona tus finanzas personales de manera eficiente.', '2024-08-20', '2024-08-22', 'Aula 401', 30),
(4, 'Capacitación en Primeros Auxilios', 'Adquiere conocimientos básicos de primeros auxilios.', '2024-09-25', '2024-09-27', 'Laboratorio de Salud', 20),
(5, 'Capacitación en Gestión de Proyectos', 'Domina las técnicas de gestión de proyectos.', '2024-10-10', '2024-10-12', 'Aula 502', 35),
(6, 'Capacitación en Desarrollo Web', 'Aprende a desarrollar aplicaciones web modernas.', '2024-11-05', '2024-11-07', 'Laboratorio de Computación', 45),
(7, 'Capacitación en Recursos Humanos', 'Gestión y desarrollo del talento humano.', '2024-05-15', '2024-05-17', 'Aula 203', 25),
(8, 'Capacitación en Innovación Empresarial', 'Fomenta la innovación en tu empresa.', '2024-06-25', '2024-06-27', 'Aula 302', 30),
(9, 'Capacitación en Seguridad Informática', 'Protege tu información y sistemas.', '2024-07-30', '2024-08-01', 'Laboratorio de Redes', 40),
(10, 'Capacitación en Ventas', 'Estrategias y técnicas efectivas de ventas.', '2024-08-10', '2024-08-12', 'Aula 404', 35);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `docentes`
--

CREATE TABLE `docentes` (
  `id` int(11) NOT NULL,
  `codigo_docente` varchar(20) NOT NULL,
  `departamento` varchar(100) NOT NULL,
  `telefono` varchar(15) DEFAULT NULL,
  `direccion` text DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `egresados`
--

CREATE TABLE `egresados` (
  `id` int(11) NOT NULL,
  `codigo` varchar(20) NOT NULL,
  `carrera` varchar(100) NOT NULL,
  `promocion` int(11) NOT NULL,
  `telefono` varchar(15) DEFAULT NULL,
  `direccion` text DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estudiantes`
--

CREATE TABLE `estudiantes` (
  `id` int(11) NOT NULL,
  `codigo` varchar(20) NOT NULL,
  `matricula` varchar(50) NOT NULL,
  `carrera` varchar(100) NOT NULL,
  `semestre` int(11) NOT NULL,
  `fecha_nacimiento` date DEFAULT NULL,
  `telefono` varchar(15) DEFAULT NULL,
  `direccion` text DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `inscripciones_capacitaciones`
--

CREATE TABLE `inscripciones_capacitaciones` (
  `id` int(11) NOT NULL,
  `entidad_id` int(11) NOT NULL,
  `estudiante_id` int(11) NOT NULL,
  `fecha_inscripcion` date NOT NULL,
  `estado` enum('aprobado','pendiente','rechazado') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `inscripciones_ofertas_laborales`
--

CREATE TABLE `inscripciones_ofertas_laborales` (
  `id` int(11) NOT NULL,
  `entidad_id` int(11) NOT NULL,
  `estudiante_id` int(11) NOT NULL,
  `fecha_postulacion` date NOT NULL,
  `estado` enum('aprobado','pendiente','rechazado') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `inscripciones_talleres`
--

CREATE TABLE `inscripciones_talleres` (
  `id` int(11) NOT NULL,
  `entidad_id` int(11) NOT NULL,
  `estudiante_id` int(11) NOT NULL,
  `fecha_inscripcion` date NOT NULL,
  `estado` enum('aprobado','pendiente','rechazado') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `inscripciones_voluntariados`
--

CREATE TABLE `inscripciones_voluntariados` (
  `id` int(11) NOT NULL,
  `entidad_id` int(11) NOT NULL,
  `estudiante_id` int(11) NOT NULL,
  `fecha_inscripcion` date NOT NULL,
  `estado` enum('aprobado','pendiente','rechazado') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ofertas_laborales`
--

CREATE TABLE `ofertas_laborales` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `descripcion` text NOT NULL,
  `empresa` varchar(100) NOT NULL,
  `fecha_inicio` date NOT NULL,
  `fecha_fin` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `ofertas_laborales`
--

INSERT INTO `ofertas_laborales` (`id`, `nombre`, `descripcion`, `empresa`, `fecha_inicio`, `fecha_fin`) VALUES
(1, 'Desarrollador Web', 'Empresa de tecnología busca desarrollador web con experiencia en React.', 'Tech Solutions', '2024-06-01', '2024-06-30'),
(2, 'Analista de Datos', 'Se requiere analista de datos para el área de marketing.', 'Data Corp', '2024-07-01', '2024-07-31'),
(3, 'Diseñador Gráfico', 'Empresa de publicidad busca diseñador gráfico creativo.', 'Creativa S.A.', '2024-08-01', '2024-08-31'),
(4, 'Ingeniero de Software', 'Desarrollo de software en equipo ágil.', 'Software Innovations', '2024-09-01', '2024-09-30'),
(5, 'Gerente de Proyecto', 'Gestión de proyectos en el sector financiero.', 'Finanzas Globales', '2024-10-01', '2024-10-31'),
(6, 'Especialista en SEO', 'Optimización de motores de búsqueda para e-commerce.', 'E-Commerce Experts', '2024-11-01', '2024-11-30'),
(7, 'Contador Público', 'Empresa contable busca contador público con experiencia.', 'Contable S.A.', '2024-05-01', '2024-05-31'),
(8, 'Desarrollador de Aplicaciones Móviles', 'Desarrollo de aplicaciones para iOS y Android.', 'AppDev', '2024-06-01', '2024-06-30'),
(9, 'Administrador de Sistemas', 'Mantenimiento y administración de sistemas informáticos.', 'SysAdmin Corp', '2024-07-01', '2024-07-31'),
(10, 'Especialista en Marketing', 'Desarrollo de estrategias de marketing digital.', 'Marketing Solutions', '2024-08-01', '2024-08-31');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `talleres`
--

CREATE TABLE `talleres` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `descripcion` text NOT NULL,
  `fecha_inicio` date NOT NULL,
  `fecha_fin` date NOT NULL,
  `lugar` varchar(100) NOT NULL,
  `cupo_maximo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `talleres`
--

INSERT INTO `talleres` (`id`, `nombre`, `descripcion`, `fecha_inicio`, `fecha_fin`, `lugar`, `cupo_maximo`) VALUES
(1, 'Taller de Robótica', 'Aprende a construir y programar robots.', '2024-06-15', '2024-06-20', 'Laboratorio de Ingeniería', 30),
(2, 'Taller de Fotografía', 'Domina las técnicas básicas y avanzadas de fotografía.', '2024-07-01', '2024-07-05', 'Aula 201', 20),
(3, 'Taller de Pintura', 'Explora tu creatividad a través de la pintura.', '2024-08-10', '2024-08-15', 'Aula de Artes', 25),
(4, 'Taller de Cocina', 'Aprende a preparar platos tradicionales.', '2024-09-05', '2024-09-10', 'Cocina del Campus', 15),
(5, 'Taller de Escritura Creativa', 'Desarrolla tus habilidades de escritura.', '2024-10-12', '2024-10-17', 'Biblioteca', 20),
(6, 'Taller de Programación', 'Introducción a la programación en Python.', '2024-11-01', '2024-11-05', 'Laboratorio de Computación', 35),
(7, 'Taller de Jardinería', 'Aprende técnicas básicas de jardinería.', '2024-05-01', '2024-05-05', 'Jardín Botánico', 10),
(8, 'Taller de Música', 'Iniciación a la guitarra y otros instrumentos.', '2024-06-20', '2024-06-25', 'Aula de Música', 25),
(9, 'Taller de Yoga', 'Prácticas de yoga para el bienestar físico y mental.', '2024-07-15', '2024-07-20', 'Gimnasio', 20),
(10, 'Taller de Fotografía Avanzada', 'Técnicas avanzadas de fotografía digital.', '2024-08-25', '2024-08-30', 'Aula 202', 15);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tokens`
--

CREATE TABLE `tokens` (
  `id` int(11) NOT NULL,
  `token` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `firstName` varchar(50) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `role` enum('admin','student') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `voluntariados`
--

CREATE TABLE `voluntariados` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `descripcion` text NOT NULL,
  `fecha_inicio` date NOT NULL,
  `fecha_fin` date NOT NULL,
  `lugar` varchar(100) NOT NULL,
  `cupo_maximo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `voluntariados`
--

INSERT INTO `voluntariados` (`id`, `nombre`, `descripcion`, `fecha_inicio`, `fecha_fin`, `lugar`, `cupo_maximo`) VALUES
(1, 'Voluntariado Ambiental', 'Actividades de reforestación y limpieza de áreas verdes.', '2024-06-05', '2024-06-10', 'Parque Nacional', 50),
(2, 'Voluntariado Social', 'Apoyo en comedores comunitarios y centros de atención.', '2024-07-10', '2024-07-15', 'Centro Comunitario', 40),
(3, 'Voluntariado Educativo', 'Apoyo en programas de alfabetización y educación.', '2024-08-15', '2024-08-20', 'Escuela Rural', 30),
(4, 'Voluntariado de Salud', 'Campañas de salud y vacunación en zonas rurales.', '2024-09-20', '2024-09-25', 'Centro de Salud', 20),
(5, 'Voluntariado Cultural', 'Organización de eventos y actividades culturales.', '2024-10-25', '2024-10-30', 'Casa de la Cultura', 25),
(6, 'Voluntariado Deportivo', 'Organización de torneos y actividades deportivas.', '2024-11-01', '2024-11-05', 'Estadio Municipal', 35),
(7, 'Voluntariado de Construcción', 'Construcción y reparación de viviendas en comunidades vulnerables.', '2024-05-10', '2024-05-15', 'Comunidad Andina', 30),
(8, 'Voluntariado de Rescate Animal', 'Rescate y cuidado de animales en situación de calle.', '2024-06-15', '2024-06-20', 'Refugio Animal', 20),
(9, 'Voluntariado en Tecnologías', 'Capacitación en tecnologías de la información para jóvenes.', '2024-07-20', '2024-07-25', 'Laboratorio de Computación', 40),
(10, 'Voluntariado en Emergencias', 'Apoyo en situaciones de emergencia y desastres naturales.', '2024-08-25', '2024-08-30', 'Zona de Emergencia', 50);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `capacitaciones`
--
ALTER TABLE `capacitaciones`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `docentes`
--
ALTER TABLE `docentes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `codigo_docente` (`codigo_docente`),
  ADD UNIQUE KEY `user_id` (`user_id`);

--
-- Indices de la tabla `egresados`
--
ALTER TABLE `egresados`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `codigo` (`codigo`),
  ADD UNIQUE KEY `user_id` (`user_id`);

--
-- Indices de la tabla `estudiantes`
--
ALTER TABLE `estudiantes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `codigo` (`codigo`),
  ADD UNIQUE KEY `user_id` (`user_id`);

--
-- Indices de la tabla `inscripciones_capacitaciones`
--
ALTER TABLE `inscripciones_capacitaciones`
  ADD PRIMARY KEY (`id`),
  ADD KEY `entidad_id` (`entidad_id`),
  ADD KEY `estudiante_id` (`estudiante_id`);

--
-- Indices de la tabla `inscripciones_ofertas_laborales`
--
ALTER TABLE `inscripciones_ofertas_laborales`
  ADD PRIMARY KEY (`id`),
  ADD KEY `entidad_id` (`entidad_id`),
  ADD KEY `estudiante_id` (`estudiante_id`);

--
-- Indices de la tabla `inscripciones_talleres`
--
ALTER TABLE `inscripciones_talleres`
  ADD PRIMARY KEY (`id`),
  ADD KEY `entidad_id` (`entidad_id`),
  ADD KEY `estudiante_id` (`estudiante_id`);

--
-- Indices de la tabla `inscripciones_voluntariados`
--
ALTER TABLE `inscripciones_voluntariados`
  ADD PRIMARY KEY (`id`),
  ADD KEY `entidad_id` (`entidad_id`),
  ADD KEY `estudiante_id` (`estudiante_id`);

--
-- Indices de la tabla `ofertas_laborales`
--
ALTER TABLE `ofertas_laborales`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `talleres`
--
ALTER TABLE `talleres`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `tokens`
--
ALTER TABLE `tokens`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indices de la tabla `voluntariados`
--
ALTER TABLE `voluntariados`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `capacitaciones`
--
ALTER TABLE `capacitaciones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `docentes`
--
ALTER TABLE `docentes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `egresados`
--
ALTER TABLE `egresados`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `estudiantes`
--
ALTER TABLE `estudiantes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `inscripciones_capacitaciones`
--
ALTER TABLE `inscripciones_capacitaciones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `inscripciones_ofertas_laborales`
--
ALTER TABLE `inscripciones_ofertas_laborales`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `inscripciones_talleres`
--
ALTER TABLE `inscripciones_talleres`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `inscripciones_voluntariados`
--
ALTER TABLE `inscripciones_voluntariados`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `ofertas_laborales`
--
ALTER TABLE `ofertas_laborales`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `talleres`
--
ALTER TABLE `talleres`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `tokens`
--
ALTER TABLE `tokens`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `voluntariados`
--
ALTER TABLE `voluntariados`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `docentes`
--
ALTER TABLE `docentes`
  ADD CONSTRAINT `docentes_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `egresados`
--
ALTER TABLE `egresados`
  ADD CONSTRAINT `egresados_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `estudiantes`
--
ALTER TABLE `estudiantes`
  ADD CONSTRAINT `estudiantes_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `inscripciones_capacitaciones`
--
ALTER TABLE `inscripciones_capacitaciones`
  ADD CONSTRAINT `inscripciones_capacitaciones_ibfk_1` FOREIGN KEY (`entidad_id`) REFERENCES `capacitaciones` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `inscripciones_capacitaciones_ibfk_2` FOREIGN KEY (`estudiante_id`) REFERENCES `estudiantes` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `inscripciones_ofertas_laborales`
--
ALTER TABLE `inscripciones_ofertas_laborales`
  ADD CONSTRAINT `inscripciones_ofertas_laborales_ibfk_1` FOREIGN KEY (`entidad_id`) REFERENCES `ofertas_laborales` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `inscripciones_ofertas_laborales_ibfk_2` FOREIGN KEY (`estudiante_id`) REFERENCES `estudiantes` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `inscripciones_talleres`
--
ALTER TABLE `inscripciones_talleres`
  ADD CONSTRAINT `inscripciones_talleres_ibfk_1` FOREIGN KEY (`entidad_id`) REFERENCES `talleres` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `inscripciones_talleres_ibfk_2` FOREIGN KEY (`estudiante_id`) REFERENCES `estudiantes` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `inscripciones_voluntariados`
--
ALTER TABLE `inscripciones_voluntariados`
  ADD CONSTRAINT `inscripciones_voluntariados_ibfk_1` FOREIGN KEY (`entidad_id`) REFERENCES `voluntariados` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `inscripciones_voluntariados_ibfk_2` FOREIGN KEY (`estudiante_id`) REFERENCES `estudiantes` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
