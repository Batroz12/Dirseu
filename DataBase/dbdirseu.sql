-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 28-10-2024 a las 18:31:00
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
  `cupo_maximo` int(11) NOT NULL,
  `imagen` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `capacitaciones`
--

INSERT INTO `capacitaciones` (`id`, `nombre`, `descripcion`, `fecha_inicio`, `fecha_fin`, `lugar`, `cupo_maximo`, `imagen`) VALUES
(1, 'Capacitación en Liderazgo', 'Desarrolla habilidades de liderazgo y gestión de equipos.', '2024-06-10', '2024-06-12', 'Sala de Conferencias', 50, NULL),
(2, 'Capacitación en Marketing Digital', 'Aprende estrategias de marketing en redes sociales.', '2024-07-15', '2024-07-17', 'Aula 305', 40, NULL),
(3, 'Capacitación en Finanzas Personales', 'Gestiona tus finanzas personales de manera eficiente.', '2024-08-20', '2024-08-22', 'Aula 401', 30, NULL),
(4, 'Capacitación en Primeros Auxilios', 'Adquiere conocimientos básicos de primeros auxilios.', '2024-09-25', '2024-09-27', 'Laboratorio de Salud', 20, NULL),
(5, 'Capacitación en Gestión de Proyectos', 'Domina las técnicas de gestión de proyectos.', '2024-10-10', '2024-10-12', 'Aula 502', 35, NULL),
(6, 'Capacitación en Desarrollo Web', 'Aprende a desarrollar aplicaciones web modernas.', '2024-11-05', '2024-11-07', 'Laboratorio de Computación', 45, NULL),
(7, 'Capacitación en Recursos Humanos', 'Gestión y desarrollo del talento humano.', '2024-05-15', '2024-05-17', 'Aula 203', 25, NULL),
(8, 'Capacitación en Innovación Empresarial', 'Fomenta la innovación en tu empresa.', '2024-06-25', '2024-06-27', 'Aula 302', 30, NULL),
(9, 'Capacitación en Seguridad Informática', 'Protege tu información y sistemas.', '2024-07-30', '2024-08-01', 'Laboratorio de Redes', 40, NULL),
(10, 'Capacitación en Ventas', 'Estrategias y técnicas efectivas de ventas.', '2024-08-10', '2024-08-12', 'Aula 404', 35, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `coordinadores`
--

CREATE TABLE `coordinadores` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `codigo_coordinador` varchar(50) NOT NULL,
  `nombre_coordinacion` varchar(100) NOT NULL,
  `telefono` varchar(15) DEFAULT NULL,
  `direccion` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `coordinadores`
--

INSERT INTO `coordinadores` (`id`, `user_id`, `codigo_coordinador`, `nombre_coordinacion`, `telefono`, `direccion`) VALUES
(1, 7, 'C001', 'Coordinación de Desarrollo Formativo', '987654321', 'Dirección A'),
(2, 8, 'C002', 'Coordinación de Extensión Universitaria', '963258741', 'Dirección B'),
(3, 9, 'C003', 'Coordinación de Desarrollo Sostenible', '741852963', 'Dirección C'),
(4, 10, 'C004', 'Coordinación de Seguimiento al Egresado', '123456789', 'Dirección D');

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

--
-- Volcado de datos para la tabla `docentes`
--

INSERT INTO `docentes` (`id`, `codigo_docente`, `departamento`, `telefono`, `direccion`, `user_id`) VALUES
(1, '0211123123', 'Ingenieria', '987654321', 'Mi Casa', 1),
(2, '654', 'Cusco', '987654321', 'donde tu vieja', 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `egresados`
--

CREATE TABLE `egresados` (
  `id` int(11) NOT NULL,
  `codigo` varchar(20) NOT NULL,
  `carrera` varchar(100) NOT NULL,
  `promocion` year(4) DEFAULT NULL,
  `telefono` varchar(15) DEFAULT NULL,
  `direccion` varchar(255) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `egresados`
--

INSERT INTO `egresados` (`id`, `codigo`, `carrera`, `promocion`, `telefono`, `direccion`, `user_id`) VALUES
(1, '987', '100mts', '2070', '987654321', 'tambien en mi jato', 3),
(2, '0198765432l', 'Ing. Sistemas', '2024', '987654321', 'en tu casa', 11),
(3, '019201723K', 'Ing. Sistemas', '2024', '934656536', 'Uvima VII Psj. Pachatusan Q-11', 14);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empleadores`
--

CREATE TABLE `empleadores` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `codigo_empleador` varchar(50) NOT NULL,
  `nombre_empresa` varchar(255) NOT NULL,
  `telefono` varchar(15) DEFAULT NULL,
  `direccion_empresa` varchar(255) DEFAULT NULL,
  `area_negocio` varchar(255) DEFAULT NULL,
  `email_empresa` varchar(255) DEFAULT NULL,
  `fecha_registro` date DEFAULT curdate()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `empleadores`
--

INSERT INTO `empleadores` (`id`, `user_id`, `codigo_empleador`, `nombre_empresa`, `telefono`, `direccion_empresa`, `area_negocio`, `email_empresa`, `fecha_registro`) VALUES
(1, 12, '10001', 'USC', '987654321', 'en tu casa', 'extorsionar', 'empresa@gmail.com', '2024-10-16'),
(2, 13, '10002', 'USC', '123456789', 'mi casa', 'robo armado', 'empresa2@gmail.com', '2024-10-16');

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

--
-- Volcado de datos para la tabla `estudiantes`
--

INSERT INTO `estudiantes` (`id`, `codigo`, `matricula`, `carrera`, `semestre`, `fecha_nacimiento`, `telefono`, `direccion`, `user_id`) VALUES
(1, '123', '123', '400mts', 0, '2024-09-13', '987654321', 'mi jato', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `eventos`
--

CREATE TABLE `eventos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `descripcion` text NOT NULL,
  `fecha` date DEFAULT NULL,
  `hora` time DEFAULT NULL,
  `lugar` varchar(255) NOT NULL,
  `imagen` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `eventos`
--

INSERT INTO `eventos` (`id`, `nombre`, `descripcion`, `fecha`, `hora`, `lugar`, `imagen`) VALUES
(1, 'prueba1', 'zxc', '2024-10-09', '10:20:00', 'mi choza', NULL);

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

--
-- Volcado de datos para la tabla `inscripciones_capacitaciones`
--

INSERT INTO `inscripciones_capacitaciones` (`id`, `entidad_id`, `estudiante_id`, `fecha_inscripcion`, `estado`) VALUES
(1, 2, 1, '2024-09-13', 'pendiente');

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
-- Estructura de tabla para la tabla `instructores`
--

CREATE TABLE `instructores` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `codigo_instructor` varchar(50) NOT NULL,
  `nombre_taller` varchar(255) NOT NULL,
  `telefono` varchar(15) DEFAULT NULL,
  `direccion` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ofertas_empleo`
--

CREATE TABLE `ofertas_empleo` (
  `id` int(11) NOT NULL,
  `titulo` varchar(255) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `requisitos` text DEFAULT NULL,
  `habilidades` text DEFAULT NULL,
  `experiencia_minima` int(11) DEFAULT NULL,
  `carrera_destino` varchar(255) DEFAULT NULL,
  `fecha_publicacion` date DEFAULT curdate()
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
  `fecha_fin` date NOT NULL,
  `imagen` varchar(255) DEFAULT NULL,
  `nro_contacto` varchar(15) DEFAULT NULL,
  `correo_contacto` varchar(255) DEFAULT NULL,
  `requisitos` text DEFAULT NULL,
  `carrera_destino` varchar(255) DEFAULT NULL,
  `id_usuario` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `ofertas_laborales`
--

INSERT INTO `ofertas_laborales` (`id`, `nombre`, `descripcion`, `empresa`, `fecha_inicio`, `fecha_fin`, `imagen`, `nro_contacto`, `correo_contacto`, `requisitos`, `carrera_destino`, `id_usuario`) VALUES
(1, 'Desarrollador Web', 'Empresa de tecnología busca desarrollador web con experiencia en React.', 'Tech Solution', '2024-06-01', '2024-06-30', NULL, NULL, NULL, NULL, NULL, NULL),
(2, 'Analista de Datos', 'Se requiere analista de datos para el área de marketing.', 'Data Corp', '2024-07-01', '2024-07-31', NULL, NULL, NULL, NULL, NULL, NULL),
(3, 'Diseñador Gráfico', 'Empresa de publicidad busca diseñador gráfico creativo.', 'Creativa S.A.', '2024-08-01', '2024-08-31', NULL, NULL, NULL, NULL, NULL, NULL),
(4, 'Ingeniero de Software', 'Desarrollo de software en equipo ágil.', 'Software Innovations', '2024-09-01', '2024-09-30', NULL, NULL, NULL, NULL, NULL, NULL),
(5, 'Gerente de Proyecto', 'Gestión de proyectos en el sector financiero.', 'Finanzas Globales', '2024-10-01', '2024-10-31', NULL, NULL, NULL, NULL, NULL, NULL),
(6, 'Especialista en SEO', 'Optimización de motores de búsqueda para e-commerce.', 'E-Commerce Experts', '2024-11-01', '2024-11-30', NULL, NULL, NULL, NULL, NULL, NULL),
(7, 'Contador Público', 'Empresa contable busca contador público con experiencia.', 'Contable S.A.', '2024-05-01', '2024-05-31', NULL, NULL, NULL, NULL, NULL, NULL),
(8, 'Desarrollador de Aplicaciones Móviles', 'Desarrollo de aplicaciones para iOS y Android.', 'AppDev', '2024-06-01', '2024-06-30', NULL, NULL, NULL, NULL, NULL, NULL),
(9, 'Administrador de Sistemas', 'Mantenimiento y administración de sistemas informáticos.', 'SysAdmin Corp', '2024-07-01', '2024-07-31', NULL, NULL, NULL, NULL, NULL, NULL),
(10, 'Especialista en Marketing', 'Desarrollo de estrategias de marketing digital.', 'Marketing Solutions', '2024-08-01', '2024-08-31', NULL, NULL, NULL, NULL, NULL, NULL),
(12, 'Desarrollo Web', 'Empresa de tecnología busca desarrollador web', 'Tech Solution', '2024-10-17', '2024-10-31', '/uploads/resized-IMAGE-1729205953943-416170840.png', NULL, NULL, NULL, NULL, NULL),
(15, 'Prueba', 'Prueba', 'Prueba', '2024-10-07', '2024-10-31', NULL, '987654321', 'prueba@gmail.com', 'Prueba', 'Prueba', NULL),
(16, 'Prueba 2', 'Prueba2', 'Prueba', '2024-10-24', '2024-10-27', NULL, '123456789', 'prueba2@gmail.com', 'Prueba', 'Prueba2', NULL),
(21, 'Prueba9', 'adsdas', 'Prueba 3', '2024-10-29', '2024-10-31', NULL, '987654321', 'prueba@gmail.com', 'dasads', 'Derecho', 12),
(28, 'Prueba10000', 'prueba4', 'zxc', '2024-10-31', '2024-11-08', NULL, '987654321', 'prueba@gmail.com', 'adsads', 'Derecho', 13),
(29, 'Prueba', 'prueba4', 'Prueba 3', '2024-10-31', '2024-11-10', NULL, '987654321', 'prueba@gmail.com', 'asdasd', 'Derecho', 13),
(30, 'Pruebaasddas', 'asd', 'Prueba', '2024-10-24', '2024-10-31', NULL, '987654321', 'prueba@gmail.com', 'Prueba', 'Prueba', 12);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `postulaciones`
--

CREATE TABLE `postulaciones` (
  `id` int(11) NOT NULL,
  `egresado_id` int(11) NOT NULL,
  `oferta_id` int(11) NOT NULL,
  `estado_postulacion` enum('Recibido','En revisión','Rechazado','Aceptado') DEFAULT 'Recibido',
  `fecha_postulacion` date DEFAULT curdate()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
  `cupo_maximo` int(11) NOT NULL,
  `imagen` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `talleres`
--

INSERT INTO `talleres` (`id`, `nombre`, `descripcion`, `fecha_inicio`, `fecha_fin`, `lugar`, `cupo_maximo`, `imagen`) VALUES
(14, 'Orquesta Sinfónica', 'Taller que reúne a músicos para interpretar una amplia variedad de obras clásicas y contemporáneas, fomentando el trabajo en equipo y la apreciación de la música sinfónica en su máxima expresión.', '2024-08-01', '2024-12-31', 'UAC', 50, '/uploads/resized-IMAGE-1730085685078-140191312.jpg'),
(15, 'Artes Gráficas', 'Enfocado en el desarrollo de habilidades artísticas y técnicas en diseño, ilustración y comunicación visual, este taller permite a los participantes explorar diferentes medios y estilos gráficos.', '2024-08-01', '2024-12-31', 'UAC', 50, '/uploads/resized-IMAGE-1730085729204-11977182.jpg'),
(16, 'Danza Folclórica', 'Este taller celebra la diversidad cultural mediante el aprendizaje de danzas tradicionales de diferentes regiones, promoviendo la identidad cultural y el aprecio por las costumbres folclóricas.', '2024-08-01', '2024-12-31', 'UAC', 50, '/uploads/resized-IMAGE-1730085931644-52452705.png');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tokens`
--

CREATE TABLE `tokens` (
  `id` int(11) NOT NULL,
  `token` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tokens`
--

INSERT INTO `tokens` (`id`, `token`) VALUES
(84, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImZpcnN0TmFtZSI6ImRvY2VudGUiLCJsYXN0TmFtZSI6ImRvY2VudGUiLCJlbWFpbCI6ImRvY2VudGVAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWQiOjR9LCJpYXQiOjE3MjkwMDA0MzMsImV4cCI6MTcyOTAwNDAzM30.-Q9Oqd1vvkRuhg6oQd-JA5UDviQrUnf-tSz8LsEkrWM'),
(85, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImZpcnN0TmFtZSI6ImRvY2VudGUiLCJsYXN0TmFtZSI6ImRvY2VudGUiLCJlbWFpbCI6ImRvY2VudGVAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWQiOjR9LCJpYXQiOjE3MjkwMDQxODksImV4cCI6MTcyOTAwNzc4OX0.E2GLssS3FO7F6XLurDGESjUV10MXFf5pdQKLCjEhYU0'),
(86, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImZpcnN0TmFtZSI6ImRvY2VudGUiLCJsYXN0TmFtZSI6ImRvY2VudGUiLCJlbWFpbCI6ImRvY2VudGVAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWQiOjR9LCJpYXQiOjE3MjkwMDc5ODksImV4cCI6MTcyOTAxMTU4OX0.TY21P2EaTwUQk0i8HPtdXqswX4h1TkTWi_EXTSggWTM'),
(87, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImZpcnN0TmFtZSI6ImRvY2VudGUiLCJsYXN0TmFtZSI6ImRvY2VudGUiLCJlbWFpbCI6ImRvY2VudGVAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWQiOjR9LCJpYXQiOjE3MjkwNDA1NDksImV4cCI6MTcyOTA0NDE0OX0.HIARL8QZRI9jb-00mINKDh3czfgx2K7PmG0P2WzvfbE'),
(89, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImZpcnN0TmFtZSI6ImRvY2VudGUiLCJsYXN0TmFtZSI6ImRvY2VudGUiLCJlbWFpbCI6ImRvY2VudGVAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWQiOjR9LCJpYXQiOjE3MjkwNTI4NzIsImV4cCI6MTcyOTA1NjQ3Mn0.pfG06o9ff-UI9FrogqnW4lcWAEIZKR_Ez1PG7cBohoo'),
(92, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImZpcnN0TmFtZSI6ImRvY2VudGUiLCJsYXN0TmFtZSI6ImRvY2VudGUiLCJlbWFpbCI6ImRvY2VudGVAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWQiOjR9LCJpYXQiOjE3MjkwODcxODYsImV4cCI6MTcyOTA5MDc4Nn0.Qw9Bx2qKLgBnOSLfpf1VRUnWoiAqG1Oeho_KkP4xM44'),
(95, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImZpcnN0TmFtZSI6Ikp1YW4gQWxiZXJ0byIsImxhc3ROYW1lIjoiUGVyZXogR2FyY2lhIiwiZW1haWwiOiJlbXBsZWFkb3JAZ21haWwuY29tIiwicm9sZSI6InN0dWRlbnQiLCJpZCI6MTJ9LCJpYXQiOjE3MjkwOTk4NTIsImV4cCI6MTcyOTEwMzQ1Mn0.j3PjHRIDUYhqDv4Td1BBfFQmxH_c0CAlfesy-wD03qA'),
(96, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImZpcnN0TmFtZSI6ImRvY2VudGUiLCJsYXN0TmFtZSI6ImRvY2VudGUiLCJlbWFpbCI6ImRvY2VudGVAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWQiOjR9LCJpYXQiOjE3MjkxMDQxNTUsImV4cCI6MTcyOTEwNzc1NX0.9DdWkPmUmFca2KYJ8c7KwRposY6moK27njK_a3EvgOM'),
(99, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImZpcnN0TmFtZSI6ImRvY2VudGUiLCJsYXN0TmFtZSI6ImRvY2VudGUiLCJlbWFpbCI6ImRvY2VudGVAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWQiOjR9LCJpYXQiOjE3MjkxMjUzMjAsImV4cCI6MTcyOTEyODkyMH0.3wh-qeosT2JFm7HB7M_7Cs412e66h_Ujp_oSwjFPZVM'),
(100, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImZpcnN0TmFtZSI6ImRvY2VudGUiLCJsYXN0TmFtZSI6ImRvY2VudGUiLCJlbWFpbCI6ImRvY2VudGVAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWQiOjR9LCJpYXQiOjE3MjkxMjkwNjUsImV4cCI6MTcyOTEzMjY2NX0.Uo9o06LLN6SitYI2Q8dDjpw3flUeN05b58E0ZOeS6zA'),
(101, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImZpcnN0TmFtZSI6ImRvY2VudGUiLCJsYXN0TmFtZSI6ImRvY2VudGUiLCJlbWFpbCI6ImRvY2VudGVAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWQiOjR9LCJpYXQiOjE3MjkxMzI4NzEsImV4cCI6MTcyOTEzNjQ3MX0.X8TN3sx_xrN6i1CqxLy1RqXS0mwYYnltwzA6k4EjFhM'),
(102, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImZpcnN0TmFtZSI6Ikp1YW4gQWxiZXJ0byIsImxhc3ROYW1lIjoiUGVyZXogR2FyY2lhIiwiZW1haWwiOiJlbXBsZWFkb3JAZ21haWwuY29tIiwicm9sZSI6InN0dWRlbnQiLCJpZCI6MTJ9LCJpYXQiOjE3MjkxMzY2ODcsImV4cCI6MTcyOTE0MDI4N30.w-CnUKlz0Zbu86rALzQiT70zvzYBaqLVGT_kmd1HE04'),
(103, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImZpcnN0TmFtZSI6Ikp1YW4gQWxiZXJ0byIsImxhc3ROYW1lIjoiUGVyZXogR2FyY2lhIiwiZW1haWwiOiJlbXBsZWFkb3JAZ21haWwuY29tIiwicm9sZSI6InN0dWRlbnQiLCJpZCI6MTJ9LCJpYXQiOjE3MjkxMzgzMDMsImV4cCI6MTcyOTE0MTkwM30.wqwz73Iw0t4PEXEAFBT8DqWnmLSXqfX0ou4xU5VXT3w'),
(105, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImZpcnN0TmFtZSI6Ikp1YW4gQWxiZXJ0byIsImxhc3ROYW1lIjoiUGVyZXogR2FyY2lhIiwiZW1haWwiOiJlbXBsZWFkb3JAZ21haWwuY29tIiwicm9sZSI6InN0dWRlbnQiLCJpZCI6MTJ9LCJpYXQiOjE3MjkxNDA0MTgsImV4cCI6MTcyOTE0NDAxOH0.K0vMK9be60DhPKcAbKio_LaA5cSQ6oTYEr2Y80UTtrw'),
(106, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImZpcnN0TmFtZSI6ImRvY2VudGUiLCJsYXN0TmFtZSI6ImRvY2VudGUiLCJlbWFpbCI6ImRvY2VudGVAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWQiOjR9LCJpYXQiOjE3MjkxNDE0NDUsImV4cCI6MTcyOTE0NTA0NX0.c15GYWSiWS_-jNBdK50C-EFquvXxkH5O-r8D1axDXUE'),
(107, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImZpcnN0TmFtZSI6ImRvY2VudGUiLCJsYXN0TmFtZSI6ImRvY2VudGUiLCJlbWFpbCI6ImRvY2VudGVAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWQiOjR9LCJpYXQiOjE3MjkxNzA2MTMsImV4cCI6MTcyOTE3NDIxM30.areFTVD5RDQEggiO_p4hMHQl-QXS3lG5Zekg_g5jfME'),
(108, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImZpcnN0TmFtZSI6ImRvY2VudGUiLCJsYXN0TmFtZSI6ImRvY2VudGUiLCJlbWFpbCI6ImRvY2VudGVAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWQiOjR9LCJpYXQiOjE3MjkxNzQ0MzEsImV4cCI6MTcyOTE3ODAzMX0.HSwDroVCqvR_MSDONvvJmLTJbkoiPhJIDiR-E7mUtag'),
(110, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImZpcnN0TmFtZSI6ImRvY2VudGUiLCJsYXN0TmFtZSI6ImRvY2VudGUiLCJlbWFpbCI6ImRvY2VudGVAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWQiOjR9LCJpYXQiOjE3MjkxODEzMDEsImV4cCI6MTcyOTE4NDkwMX0.NzAxQH3fYSvecEGET2_ys6YJ_NSFpsT7EHW_GKILOQQ'),
(111, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImZpcnN0TmFtZSI6ImRvY2VudGUiLCJsYXN0TmFtZSI6ImRvY2VudGUiLCJlbWFpbCI6ImRvY2VudGVAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWQiOjR9LCJpYXQiOjE3MjkxODEzNTMsImV4cCI6MTcyOTE4NDk1M30.LAntK-DYKJs8EXJNgKc2-REWClubBDaGRpCZsQJ_7v4'),
(113, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImZpcnN0TmFtZSI6ImRvY2VudGUiLCJsYXN0TmFtZSI6ImRvY2VudGUiLCJlbWFpbCI6ImRvY2VudGVAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWQiOjR9LCJpYXQiOjE3MjkxODE3OTYsImV4cCI6MTcyOTE4NTM5Nn0.Mb3HLF7VvzPz09nQpnSgzjUavYVoVMwxuR68fgpOYvQ'),
(114, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImZpcnN0TmFtZSI6ImRvY2VudGUiLCJsYXN0TmFtZSI6ImRvY2VudGUiLCJlbWFpbCI6ImRvY2VudGVAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWQiOjR9LCJpYXQiOjE3MjkxODE4MTYsImV4cCI6MTcyOTE4NTQxNn0.HQvvz4wJo5MSOhjeo-OxhYGON8XEw5Y9vQqkVdvEfyg'),
(119, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImZpcnN0TmFtZSI6ImVncmVzYWRvIiwibGFzdE5hbWUiOiJwZXBpbm8iLCJlbWFpbCI6ImVncmVzYWRvQGdtYWlsLmNvbSIsInJvbGUiOiJzdHVkZW50IiwiaWQiOjN9LCJpYXQiOjE3MjkxODkzMjAsImV4cCI6MTcyOTE5MjkyMH0.2Q3mM1SbeY6_UFwN0RAxZ_vbRaxiPKzPDT3IRblsN-4'),
(121, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImZpcnN0TmFtZSI6ImRvY2VudGUiLCJsYXN0TmFtZSI6ImRvY2VudGUiLCJlbWFpbCI6ImRvY2VudGVAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWQiOjR9LCJpYXQiOjE3MjkyMDU4NTIsImV4cCI6MTcyOTIwOTQ1Mn0.C0zgrdB6USTD0nhrS2ishJLXmeRKJPp8zGlSI40VpCA'),
(123, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImZpcnN0TmFtZSI6ImRvY2VudGUiLCJsYXN0TmFtZSI6ImRvY2VudGUiLCJlbWFpbCI6ImRvY2VudGVAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWQiOjR9LCJpYXQiOjE3MjkyMDk5NTIsImV4cCI6MTcyOTIxMzU1Mn0.x5YCIdAmjqHmtU_D-jn9WXqRMAqHuhTXVncVrCxEPJ8'),
(124, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImZpcnN0TmFtZSI6ImRvY2VudGUiLCJsYXN0TmFtZSI6ImRvY2VudGUiLCJlbWFpbCI6ImRvY2VudGVAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWQiOjR9LCJpYXQiOjE3MjkyMTM4MTQsImV4cCI6MTcyOTIxNzQxNH0.eSkdGFARE642vyq5sU35EIh4ecMTcI9fYQ3a3GbC5u8'),
(129, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImZpcnN0TmFtZSI6Ikp1YW4gQWxiZXJ0byIsImxhc3ROYW1lIjoiUGVyZXogR2FyY2lhIiwiZW1haWwiOiJlbXBsZWFkb3JAZ21haWwuY29tIiwicm9sZSI6InN0dWRlbnQiLCJpZCI6MTJ9LCJpYXQiOjE3MjkyMjUzMjgsImV4cCI6MTcyOTIyODkyOH0.8NzToJK5pPQvuxuaRvI8MTk4trNJnT45QE0CdTUVVpY'),
(130, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImZpcnN0TmFtZSI6Ikp1YW4gQWxiZXJ0byIsImxhc3ROYW1lIjoiUGVyZXogR2FyY2lhIiwiZW1haWwiOiJlbXBsZWFkb3JAZ21haWwuY29tIiwicm9sZSI6InN0dWRlbnQiLCJpZCI6MTJ9LCJpYXQiOjE3MjkyMjkwNDMsImV4cCI6MTcyOTIzMjY0M30.6w-3Vivttb3minq__ZVOJDTd446oDu8NkAEHDXoVFHo'),
(134, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImZpcnN0TmFtZSI6ImVncmVzYWRvIiwibGFzdE5hbWUiOiJwZXBpbm8iLCJlbWFpbCI6ImVncmVzYWRvQGdtYWlsLmNvbSIsInJvbGUiOiJzdHVkZW50IiwiaWQiOjN9LCJpYXQiOjE3MjkyNjcwOTksImV4cCI6MTcyOTI3MDY5OX0.Q-zvtzLcj6qcs64YYjmyNwYlc4OopqG8S-LK17dU4_Q'),
(136, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImZpcnN0TmFtZSI6ImRvY2VudGUiLCJsYXN0TmFtZSI6ImRvY2VudGUiLCJlbWFpbCI6ImRvY2VudGVAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWQiOjR9LCJpYXQiOjE3MjkyODIyMDQsImV4cCI6MTcyOTI4NTgwNH0.RE6sAkIZK5rntxdYKyAxvRZ_FrcdGICkdCtMcQ1k4hE'),
(137, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImZpcnN0TmFtZSI6ImVncmVzYWRvIiwibGFzdE5hbWUiOiJwZXBpbm8iLCJlbWFpbCI6ImVncmVzYWRvQGdtYWlsLmNvbSIsInJvbGUiOiJzdHVkZW50IiwiaWQiOjN9LCJpYXQiOjE3Mjk0NDc3MjUsImV4cCI6MTcyOTQ1MTMyNX0.nuTshbaD0oixkoRmu0XEALA0mm7VjGv3ILifmjvMQG0'),
(139, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImZpcnN0TmFtZSI6ImRvY2VudGUiLCJsYXN0TmFtZSI6ImRvY2VudGUiLCJlbWFpbCI6ImRvY2VudGVAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWQiOjR9LCJpYXQiOjE3Mjk0NjQ3MTMsImV4cCI6MTcyOTQ2ODMxM30.F0Rn7D7baLOJkfZttSFBp_Otdyx4bhg08MOttoozI5Y'),
(140, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImZpcnN0TmFtZSI6ImVncmVzYWRvIiwibGFzdE5hbWUiOiJwZXBpbm8iLCJlbWFpbCI6ImVncmVzYWRvQGdtYWlsLmNvbSIsInJvbGUiOiJzdHVkZW50IiwiaWQiOjN9LCJpYXQiOjE3Mjk0NzAxMzgsImV4cCI6MTcyOTQ3MzczOH0.KVIf2lioPHQu3ktY3BGN8YtObhn9_SRH6--Mf3WOTW8'),
(143, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImZpcnN0TmFtZSI6ImVncmVzYWRvIiwibGFzdE5hbWUiOiJwZXBpbm8iLCJlbWFpbCI6ImVncmVzYWRvQGdtYWlsLmNvbSIsInJvbGUiOiJzdHVkZW50IiwiaWQiOjN9LCJpYXQiOjE3Mjk0NzQzNjIsImV4cCI6MTcyOTQ3Nzk2Mn0.ebKELgsOaxqy8zg5Mw9JIg4ihf8OqnDQlGRZ-Msc_80'),
(144, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImZpcnN0TmFtZSI6ImVncmVzYWRvIiwibGFzdE5hbWUiOiJwZXBpbm8iLCJlbWFpbCI6ImVncmVzYWRvQGdtYWlsLmNvbSIsInJvbGUiOiJzdHVkZW50IiwiaWQiOjN9LCJpYXQiOjE3Mjk0Nzc5OTEsImV4cCI6MTcyOTQ4MTU5MX0.OhutqUoETxgUWCpCvHhiq3CiXZRNtuR7XGR6XWQS5wA'),
(147, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImZpcnN0TmFtZSI6ImVncmVzYWRvIiwibGFzdE5hbWUiOiJwZXBpbm8iLCJlbWFpbCI6ImVncmVzYWRvQGdtYWlsLmNvbSIsInJvbGUiOiJzdHVkZW50IiwiaWQiOjN9LCJpYXQiOjE3Mjk1MTkxMTYsImV4cCI6MTcyOTUyMjcxNn0.J4CANgCib77qJf7-61hVVSmx3e1gsYbozPHsSETpHVE'),
(148, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImZpcnN0TmFtZSI6ImVncmVzYWRvIiwibGFzdE5hbWUiOiJwZXBpbm8iLCJlbWFpbCI6ImVncmVzYWRvQGdtYWlsLmNvbSIsInJvbGUiOiJzdHVkZW50IiwiaWQiOjN9LCJpYXQiOjE3Mjk1MjMzNDAsImV4cCI6MTcyOTUyNjk0MH0.-h2KX1c2zZZXTZ7RRfkJCDUjR5G4Y1AbQGdlVTNtDgM'),
(149, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImZpcnN0TmFtZSI6ImVncmVzYWRvIiwibGFzdE5hbWUiOiJwZXBpbm8iLCJlbWFpbCI6ImVncmVzYWRvQGdtYWlsLmNvbSIsInJvbGUiOiJzdHVkZW50IiwiaWQiOjN9LCJpYXQiOjE3Mjk1MjcyMzQsImV4cCI6MTcyOTUzMDgzNH0.BQ4AMFE5ppC0ttN6FPkdTNTlgFW9XjWksX0gKQp9jns'),
(150, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImZpcnN0TmFtZSI6ImVncmVzYWRvIiwibGFzdE5hbWUiOiJwZXBpbm8iLCJlbWFpbCI6ImVncmVzYWRvQGdtYWlsLmNvbSIsInJvbGUiOiJzdHVkZW50IiwiaWQiOjN9LCJpYXQiOjE3Mjk1NTU2NTYsImV4cCI6MTcyOTU1OTI1Nn0.AVN0OsUg17uzgYWI1vAcl8yVNLOIJPs5FuXA1bpqs3k'),
(151, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImZpcnN0TmFtZSI6ImVzdHVkaWFudGUiLCJsYXN0TmFtZSI6ImFsY2FjaG9mYSIsImVtYWlsIjoiZXN0dWRpYW50ZUBnbWFpbC5jb20iLCJyb2xlIjoic3R1ZGVudCIsImlkIjoyfSwiaWF0IjoxNzI5NTYzMjgyLCJleHAiOjE3Mjk1NjY4ODJ9.MSAHljGZx_4VJ8z9i3az6xpc1LR6kG2dXIySSrLkQ0A'),
(152, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImZpcnN0TmFtZSI6Ik9saXZlciIsImxhc3ROYW1lIjoiU29ubmUiLCJlbWFpbCI6ImVtcGxlYWRvcjJAZ21haWwuY29tIiwicm9sZSI6InN0dWRlbnQiLCJpZCI6MTN9LCJpYXQiOjE3Mjk2MDcyMzYsImV4cCI6MTcyOTYxMDgzNn0.GMk23EnsvD6FJNWN4E3IT5jluWQSye5Wye-ojRm9evw'),
(156, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImZpcnN0TmFtZSI6Ik9saXZlciIsImxhc3ROYW1lIjoiU29ubmUiLCJlbWFpbCI6ImVtcGxlYWRvcjJAZ21haWwuY29tIiwicm9sZSI6InN0dWRlbnQiLCJpZCI6MTN9LCJpYXQiOjE3Mjk2MTY3NTMsImV4cCI6MTcyOTYyMDM1M30.PN9NtdD0novLU0YJO7FfvI-Io6ZuRWavvtHJoD0whN8'),
(160, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImZpcnN0TmFtZSI6ImRvY2VudGUiLCJsYXN0TmFtZSI6ImRvY2VudGUiLCJlbWFpbCI6ImRvY2VudGVAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWQiOjR9LCJpYXQiOjE3Mjk2MjM0ODcsImV4cCI6MTcyOTYyNzA4N30.qxSBBQLIyntR1nl4E24u5Jh5wcI4ybw8_s2sS27czPE'),
(161, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImZpcnN0TmFtZSI6ImRvY2VudGUiLCJsYXN0TmFtZSI6ImRvY2VudGUiLCJlbWFpbCI6ImRvY2VudGVAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWQiOjR9LCJpYXQiOjE3MzAwODQ4NTYsImV4cCI6MTczMDA4ODQ1Nn0.Q9DJ1dDqZ9befDpTn5UHPrehSaQmvrBOLGWmjiheXjY');

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
  `role` enum('admin','student','coordinador','empleador','instructor') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `firstName`, `lastName`, `email`, `password`, `role`) VALUES
(1, 'ion', 'DIAZ', 'jhondiazchura123@gmail.com', '$2b$10$GzWB.GAONuPm1KZ5FoB3SuC1XeoPL4pqDlJfzu3g6cqVspLF/EEw2', 'admin'),
(2, 'estudiante', 'alcachofa', 'estudiante@gmail.com', '$2b$10$8LhG7bQT8Sm6cmPDwSgZDelw6YuxKC2IWboIpH9ZtYMOieCHdp4Jy', 'student'),
(3, 'egresado', 'pepino', 'egresado@gmail.com', '$2b$10$w0..PmgyOIPA2GrP3Iz.me3Ipa5fQ8oBpiycR4pwyk27xKFeZOS9.', 'student'),
(4, 'docente', 'docente', 'docente@gmail.com', '$2b$10$b8dBsusvDuJ9qbqnKLtd0.Myho6zhte9j0.Q2dPWs.yb7qq.LWzj2', 'admin'),
(5, 'DAVID', 'Alexander', 'david@gmail.com', '$2b$10$VnXKgxa1rWNQm6gJvWCB.Ogq8UAcnNb7RpNDZSLMthcOnVsRVBH/u', 'admin'),
(6, 'Jannette', 'Delgado Obando', 'jdelgadoo@uandina.edu.pe', '$2b$12$U0nWhVHdV9IT7BOGPhMZj.tLMBXgP0dRSp2b9kATxirLQI36DwjQC', 'admin'),
(7, 'Velia', 'Ardiles Romero', 'vardiles@uandina.edu.pe', '$2b$12$bBBQqWYEBknML32LBqs0aO/WNpBEdt1B6YwsJhY6Ab0erAjWJg0IW', 'coordinador'),
(8, 'Erick Mijail', 'Martínez Rojas', 'emartinez@uandina.edu.pe', '$2b$12$FKHBJpEKXykKiyS6v9fk5.VVvxJ7GJCD5E7C.f.7FMRItT9E8f8wm', 'coordinador'),
(9, 'Susana', 'Molleapaza Ugarte', 'smolleapaza@uandina.edu.pe', '$2b$12$iBWAsgK2.ba.FEYRZfuKDONpO1cyFPgGkf1NvKeflVxaP/p2LspIC', 'coordinador'),
(10, 'Olmer', 'Villena León', 'ovillena@uandina.edu.pe', '$2b$12$ZLOM/l6nQQBnfrJ0bMWvwO5B8jsNf9G5Zighsch2QW16I7OZzVx16', 'coordinador'),
(11, 'oliver', 'sonne', 'egresado1@gmail.com', '$2b$10$x2cv43Uj2VgOhjw0dira9O38IYMqI1gct.rzxphmPpp6UFFCNJIau', 'student'),
(12, 'Juan Alberto', 'Perez Garcia', 'empleador@gmail.com', '$2b$10$W5Gru1B2VljJ8/tBJJvdru0nTmemLm6m6GfRlDUPb471weh86w5KK', 'student'),
(13, 'Oliver', 'Sonne', 'empleador2@gmail.com', '$2b$10$YR2JmVecACzM2A/AojJJCO7ObQ5Q3okqrHgY8uNgSQrfvNu3cItiK', 'student'),
(14, 'David Alexander', 'Siclla Pino', '019201723k@uandina.edu.pe', '$2b$10$.2ieCi0Rc15jZjQrLyzBcODoglvK.71mZl9eoRwUNA.HFb54FHb3y', 'student');

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
  `cupo_maximo` int(11) NOT NULL,
  `imagen` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `voluntariados`
--

INSERT INTO `voluntariados` (`id`, `nombre`, `descripcion`, `fecha_inicio`, `fecha_fin`, `lugar`, `cupo_maximo`, `imagen`) VALUES
(17, 'Mochilas Solidarias', 'Apoyo a instituciones educativas con útiles escolares', '2024-10-17', '2024-10-31', 'Auditorio UAC', 100000, '/uploads/resized-IMAGE-1729209509274-222778301.jpg');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `capacitaciones`
--
ALTER TABLE `capacitaciones`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `coordinadores`
--
ALTER TABLE `coordinadores`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `codigo_coordinador` (`codigo_coordinador`),
  ADD UNIQUE KEY `user_id` (`user_id`);

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
-- Indices de la tabla `empleadores`
--
ALTER TABLE `empleadores`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `codigo_empleador` (`codigo_empleador`),
  ADD UNIQUE KEY `user_id` (`user_id`);

--
-- Indices de la tabla `estudiantes`
--
ALTER TABLE `estudiantes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `codigo` (`codigo`),
  ADD UNIQUE KEY `user_id` (`user_id`);

--
-- Indices de la tabla `eventos`
--
ALTER TABLE `eventos`
  ADD PRIMARY KEY (`id`);

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
-- Indices de la tabla `instructores`
--
ALTER TABLE `instructores`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `codigo_instructor` (`codigo_instructor`),
  ADD UNIQUE KEY `user_id` (`user_id`);

--
-- Indices de la tabla `ofertas_empleo`
--
ALTER TABLE `ofertas_empleo`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `ofertas_laborales`
--
ALTER TABLE `ofertas_laborales`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_usuario` (`id_usuario`);

--
-- Indices de la tabla `postulaciones`
--
ALTER TABLE `postulaciones`
  ADD PRIMARY KEY (`id`),
  ADD KEY `egresado_id` (`egresado_id`),
  ADD KEY `oferta_id` (`oferta_id`);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `coordinadores`
--
ALTER TABLE `coordinadores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `docentes`
--
ALTER TABLE `docentes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `egresados`
--
ALTER TABLE `egresados`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `empleadores`
--
ALTER TABLE `empleadores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `estudiantes`
--
ALTER TABLE `estudiantes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `eventos`
--
ALTER TABLE `eventos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `inscripciones_capacitaciones`
--
ALTER TABLE `inscripciones_capacitaciones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `inscripciones_ofertas_laborales`
--
ALTER TABLE `inscripciones_ofertas_laborales`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `inscripciones_talleres`
--
ALTER TABLE `inscripciones_talleres`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `inscripciones_voluntariados`
--
ALTER TABLE `inscripciones_voluntariados`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `instructores`
--
ALTER TABLE `instructores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `ofertas_empleo`
--
ALTER TABLE `ofertas_empleo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `ofertas_laborales`
--
ALTER TABLE `ofertas_laborales`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT de la tabla `postulaciones`
--
ALTER TABLE `postulaciones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `talleres`
--
ALTER TABLE `talleres`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `tokens`
--
ALTER TABLE `tokens`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=162;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de la tabla `voluntariados`
--
ALTER TABLE `voluntariados`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `coordinadores`
--
ALTER TABLE `coordinadores`
  ADD CONSTRAINT `coordinadores_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

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
-- Filtros para la tabla `empleadores`
--
ALTER TABLE `empleadores`
  ADD CONSTRAINT `empleadores_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

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

--
-- Filtros para la tabla `instructores`
--
ALTER TABLE `instructores`
  ADD CONSTRAINT `instructores_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `ofertas_laborales`
--
ALTER TABLE `ofertas_laborales`
  ADD CONSTRAINT `fk_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `users` (`id`);

--
-- Filtros para la tabla `postulaciones`
--
ALTER TABLE `postulaciones`
  ADD CONSTRAINT `postulaciones_ibfk_1` FOREIGN KEY (`egresado_id`) REFERENCES `egresados` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `postulaciones_ibfk_2` FOREIGN KEY (`oferta_id`) REFERENCES `ofertas_empleo` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
