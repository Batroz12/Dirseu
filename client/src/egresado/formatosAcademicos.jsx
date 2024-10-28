import { useState } from 'react';
import { Download } from 'lucide-react';
import { useTheme, Typography, Box, Button } from '@mui/material';

export default function FormatosAcademicosActualizados() {
  const [activeTab, setActiveTab] = useState(0);
  const theme = useTheme(); // Usamos el tema de Material UI para detectar el modo claro/oscuro

  const data = {
    esquemas: [
      { title: "Reglamento de grados y títulos ingeniería (TESINA)", link: "#" },
      { title: "Esquemas de PROYECTO DE TESIS y guía para su desarrollo para la EPIS", link: "#" },
      { title: "Esquemas de TESIS y guía para su desarrollo para la EPIS", link: "#" },
    ],
    formatos: [
      { title: "Formato de autorización de depósito de tesis en el repositorio institucional", link: "#" },
      { title: "Modelo Reporte Turnitin (para obtención de grados y títulos)", link: "#" },
      { title: "Formato 01: bachillerato", link: "#" },
      { title: "Formato 02: título", link: "#" },
      { title: "Formato 03: informe dictamen de proyecto de tesis", link: "#" },
      { title: "Formato 04: informe dictamen de tesis concluida", link: "#" },
      { title: "Formato 05: declaración personal de autenticidad y de no plagio", link: "#" },
      { title: "Formato 06: carta de aceptación para ser asesor de tesis", link: "#" },
      { title: "Formato 07: carta de conformidad de asesor de proyecto de tesis", link: "#" },
      { title: "Formato 08: carta de conformidad de asesor de tesis", link: "#" },
      { title: "Formato 09: carta de aceptación para ser asesor de trabajo de investigación de bachillerato", link: "#" },
      { title: "Formato 10: carta de conformidad de asesor del tema de trabajo de investigación para bachillerato", link: "#" },
      { title: "Formato 11: carta de conformidad de asesor de tesis del trabajo de investigación para bachillerato", link: "#" },
      { title: "Modelo de carta para solicitar permiso para el desarrollo de una tesis", link: "#" },
    ],
    resoluciones: [
      { title: "R-CU-152-2018-UAC Tesis Multidisciplinarias", link: "#" },
      { title: "CU-084 2024-UAC Aprobar el reglamento marco para obtener el grado académico de bachiller y el título profesional", link: "#" },
      { title: "R-471-CU-2022-UAC dejan sin efecto la resolución N° 413-CU-2022-UAC de fecha 5 de julio de 2022 y, por consiguiente, ratifican la resolución N°337-2022-CFIA-UAC de fecha 6 de setiembre de 2022, a través de la cual aprueban el reglamento específico para optar al grado académico de bachiller y título profesional de la facultad de ingeniería y arquitectura", link: "#" },
      { title: "CU-140 2021-UAC aprueban el reglamento marco para optar al grado académico de bachiller y título profesional", link: "#" },
      { title: "R-153 2021-UAC aprueban el reglamento marco para optar el grado académico de bachiller y el título profesional", link: "#" },
      { title: "CU-204 2021-UAC modifican el reglamento marco para optar el grado académico de bachiller y el título profesional", link: "#" },
      { title: "CU-319 2021-UAC reglamento específico para obtención del grado académico de bachiller y título de la FIA", link: "#" },
      { title: "R-307-CU-2022-UAC dejan sin efecto en todos sus extremos la resolución N° 204-CU-2021-UAC del 12 de mayo del 2021 y modifican en parte el reglamento marco para optar el grado académico de bachiller y el título profesional de la UAC, aprobado con resolución N° 153-R-2021-UAC de fecha 12 de abril de 2021", link: "#" },
      { title: "R-413-CU-2022-UAC dejan sin efecto la resolución N° 319-CU-2021-UAC de fecha 5 de julio de 2021 y, por consiguiente, ratifican la resolución N°303-2022-CFIA-UAC de fecha 5 de agosto de 2022, a través de la cual aprueban el reglamento específico para optar al grado académico de bachiller y título profesional de la FIA de la UAC", link: "#" },
      { title: "R-418-CU-2022-UAC dejan sin efecto en todos sus extremos la resolución N° 153-R-2022-UAC de fecha 12 de abril de 2021 y su modificatoria resolución N° 307-CU2022-UAC de fecha 14 de junio de 2022 y, aprueban el reglamento marco de grados y títulos de la UAC", link: "#" },
      { title: "R-470-CU-2022-UAC dejan sin efecto en todos sus extremos la resolución N.° 298-CU-2022-UAC de fecha 13 de junio de 2022 y, por consiguiente, aprueban el reglamento de homologaciones y convalidaciones de pregrado", link: "#" },
    ],
    reglamentoMarco: [
      { title: "CU-256 2024-UAC Aprobar el reglamento marco para obtener el grado académico de bachiller y el título profesional", link: "#" },
      { title: "Directiva N° 9-2024-VRAC-UAC Tesis multidisciplinarias", link: "#" },
      { title: "Bachillerato hasta diciembre 2024", link: "#", isLink: true },
    ],
    investigacion: [
      { title: "Las líneas de Investigación de Pregrado y Posgrado de la Universidad Andina del Cusco (Resolución N°129-CU-2019-UAC", link: "#" },
      { title: "Las líneas de investigación Específicas de las Escuelas Profesionales de la Universidad Andina del Cusco (Resolución N°179-CU-2019-UAC)", link: "#" },
      { title: "Material de apoyo proyecto de tesis", link: "#" },
    ],
    turnitin: [
      { title: "Directivas sobre autenticidad de documentos Medidas preventivas y correctivas relacionadas a similitud o plagio", link: "#" },
      { title: "Reglamento del registro de trabajos de investigación, repositorio digital institucional y plagio", link: "#" },
    ],
  }

  const renderList = (items) => (
    <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
      {items.map((item, index) => (
        <li key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: `1px solid ${theme.palette.divider}` }}>
          <span style={{ color: theme.palette.text.primary }}>{item.title}</span>
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: theme.palette.action.hover,
              color: theme.palette.text.secondary,
              padding: '8px 12px',
              borderRadius: '4px',
              textDecoration: 'none',
            }}
          >
            <Download style={{ marginRight: '8px' }} />
            <span>Descargar</span>
          </a>
        </li>
      ))}
    </ul>
  );

  return (
    <Box
      sx={{
        maxWidth: '100%',
        mx: 'auto',
        p: 6,
        bgcolor: theme.palette.background.paper,
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      <Typography variant="h4" align="center" sx={{ mb: 6, color: theme.palette.text.primary }}>
        Recursos Académicos UAC
      </Typography>
      <Box sx={{ borderBottom: 1, borderColor: theme.palette.divider, mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4 }}>
          <Button
            onClick={() => setActiveTab(0)}
            sx={{
              pb: 2,
              borderBottom: activeTab === 0 ? `2px solid ${theme.palette.primary.main}` : 'none',
              color: activeTab === 0 ? theme.palette.primary.main : theme.palette.text.secondary,
            }}
          >
            Formatos y Esquemas
          </Button>
          <Button
            onClick={() => setActiveTab(1)}
            sx={{
              pb: 2,
              borderBottom: activeTab === 1 ? `2px solid ${theme.palette.primary.main}` : 'none',
              color: activeTab === 1 ? theme.palette.primary.main : theme.palette.text.secondary,
            }}
          >
            Resoluciones
          </Button>
          <Button
            onClick={() => setActiveTab(2)}
            sx={{
              pb: 2,
              borderBottom: activeTab === 2 ? `2px solid ${theme.palette.primary.main}` : 'none',
              color: activeTab === 2 ? theme.palette.primary.main : theme.palette.text.secondary,
            }}
          >
            Reglamentos
          </Button>
          <Button
            onClick={() => setActiveTab(3)}
            sx={{
              pb: 2,
              borderBottom: activeTab === 3 ? `2px solid ${theme.palette.primary.main}` : 'none',
              color: activeTab === 3 ? theme.palette.primary.main : theme.palette.text.secondary,
            }}
          >
            Investigación
          </Button>
          <Button
            onClick={() => setActiveTab(4)}
            sx={{
              pb: 2,
              borderBottom: activeTab === 4 ? `2px solid ${theme.palette.primary.main}` : 'none',
              color: activeTab === 4 ? theme.palette.primary.main : theme.palette.text.secondary,
            }}
          >
            Turnitin
          </Button>
        </Box>
      </Box>

      <Box sx={{ mt: 6 }}>
        {activeTab === 0 && (
          <>
            <Typography variant="h6" sx={{ mb: 2, color: theme.palette.text.primary }}>Esquemas y reglamentos</Typography>
            {renderList(data.esquemas)}
            <Typography variant="h6" sx={{ mt: 4, mb: 2, color: theme.palette.text.primary }}>Formatos generales</Typography>
            {renderList(data.formatos)}
          </>
        )}

        {activeTab === 1 && (
          <>
            <Typography variant="h6" sx={{ mb: 2, color: theme.palette.text.primary }}>Resoluciones</Typography>
            {renderList(data.resoluciones)}
          </>
        )}

        {activeTab === 2 && (
          <>
            <Typography variant="h6" sx={{ mb: 2, color: theme.palette.text.primary }}>Reglamento Marco</Typography>
            {renderList(data.reglamentoMarco)}
          </>
        )}

        {activeTab === 3 && (
          <>
            <Typography variant="h6" sx={{ mb: 2, color: theme.palette.text.primary }}>Investigación</Typography>
            {renderList(data.investigacion)}
          </>
        )}

        {activeTab === 4 && (
          <>
            <Typography variant="h6" sx={{ mb: 2, color: theme.palette.text.primary }}>Turnitin</Typography>
            {renderList(data.turnitin)}
          </>
        )}
      </Box>
    </Box>
  );
}
