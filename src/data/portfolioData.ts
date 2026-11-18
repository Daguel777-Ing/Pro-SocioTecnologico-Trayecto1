export interface CaseStudySection {
  id: string;
  heading?: string;
  paragraphs: string[];
  bullets?: { label?: string; text: string }[];
  closingParagraph?: string;
}

export interface StudentProfile {
  nombre: string;
  cedula: string;
  materia: string;
  carrera: string;
  semestre: string;
  seccion: string;
  institucion: string;
  docente: string;
  telefono: string;
  correo: string;
}

export const CASE_STUDY_TITLE = 'Caso de estudio';

export const CASE_STUDY_INTRO =
  'La Organización de Turismo Nacional "Aventura en los paisajes" es una organización que busca promover el turismo social en el país, realizando y promoviendo planes vacacionales y recreacionales para institutos de educación básica y universitaria, así como para los y las trabajadores de diferentes organismos públicos. El objetivo es que los trabajadores y las trabajadoras tengan una alternativa económica y de fácil acceso para recrearse, a la vez que se estimula el turismo según los recursos y servicios de cada región venezolana.';

export const CASE_STUDY_SECTIONS: CaseStudySection[] = [
  {
    id: 'situacion-actual',
    heading: 'La situación actual',
    paragraphs: [
      'A través de los años, la Fundación ha crecido al punto de abrir tres sucursales en el interior del país, lo que generó una reestructuración en su organización. Como parte de esta transformación, se ha creado un Departamento de Tecnología, que anteriormente no existía, liderado por un Ingeniero en Sistemas y un técnico en informática.',
      'Este departamento debe atender la sede principal, un edificio de dos pisos, y brindar soporte técnico a distancia a las tres sedes del interior del país. Aunque se requiere más personal para atender esta área, no se cuentan con los recursos financieros para contratar.',
      'El panorama tecnológico de la Fundación presenta las siguientes dificultades:',
    ],
    bullets: [
      {
        text: 'Durante el período de cuarentena, algunos trabajadores cambiaron de puesto de trabajo llevándose los computadores consigo, y no existe un inventario actualizado de dónde quedó cada equipo.',
      },
      {
        text: 'Algunos usuarios con conocimientos de informática realizaron actualizaciones de software por su cuenta, sin coordinación ni registro, generando incompatibilidades y fallas.',
      },
      {
        text: 'Varios trabajadores se quejan de tener computadoras obsoletas en su puesto de trabajo, lo que no les permite realizar de manera eficiente sus labores.',
      },
      {
        text: 'Las sucursales del interior dependen completamente del soporte remoto de dos personas, y cuando una falla no puede resolverse a distancia, las actividades de la sede se detienen.',
      },
    ],
    closingParagraph:
      'En números aproximados: la Fundación dispone de alrededor de 40 equipos entre las cuatro sedes, de los cuales 18 son obsoletos o presentan fallas recurrentes.',
  },
  {
    id: 'luz-tunel',
    heading: 'Una luz al final del túnel',
    paragraphs: [
      'El presidente de la Fundación está consciente de la necesidad de actualización de la plataforma tecnológica, por lo que estableció un convenio con una empresa privada para la dotación de nuevos equipos. Sin embargo, el convenio está firmado sin un plan de implementación definido: nadie ha determinado cómo se recibirán, configurarán, distribuirán y darán soporte a los nuevos equipos, ni cómo se gestionará el inventario tecnológico existente.',
    ],
  },
  {
    id: 'actores',
    heading: 'Los actores',
    paragraphs: [],
    bullets: [
      {
        label: 'Presidente de la Fundación',
        text: 'impulsor del convenio, presionado por las quejas del personal y las limitaciones presupuestarias.',
      },
      {
        label: 'Ingeniero en Sistemas (jefe del Departamento de Tecnología)',
        text: 'responsable de la estrategia tecnológica con un equipo de dos personas para cuatro sedes.',
      },
      {
        label: 'Técnico en informática',
        text: 'único soporte operativo, atiende llamadas de toda la organización.',
      },
      {
        label: 'Trabajadores con equipos obsoletos',
        text: 'frustrados, con productividad afectada, algunos ya improvisaron sus propias soluciones.',
      },
      {
        label: 'Sedes del interior',
        text: 'dependen del soporte remoto; se sienten desatendidas.',
      },
      {
        label: 'Empresa privada (convenio)',
        text: 'proveerá los nuevos equipos, pero no participa en la gestión interna.',
      },
    ],
  },
];

export const CASE_STUDY_METRICS = [
  { value: '04', label: 'Sedes nacionales', detail: 'Sede principal y 3 sucursales' },
  { value: '40', label: 'Equipos instalados', detail: 'Parque computacional total' },
  { value: '18', label: 'Equipos críticos', detail: 'Obsoletos o con fallas' },
  { value: '02', label: 'Especialistas TI', detail: 'Ingeniero y técnico de soporte' },
];

export interface DidacticSessionMeta {
  id: number;
  code: string;
  title: string;
  subtitle: string;
  fileName: string;
}

export const DIDACTIC_SESSIONS: DidacticSessionMeta[] = [
  {
    id: 1,
    code: '01',
    title: 'Sesión didáctica 1',
    subtitle: 'Módulo preparado',
    fileName: 'SesionDidactica1.tsx',
  },
  {
    id: 2,
    code: '02',
    title: 'Sesión didáctica 2',
    subtitle: 'Módulo preparado',
    fileName: 'SesionDidactica2.tsx',
  },
  {
    id: 3,
    code: '03',
    title: 'Sesión didáctica 3',
    subtitle: 'Módulo preparado',
    fileName: 'SesionDidactica3.tsx',
  },
  {
    id: 4,
    code: '04',
    title: 'Sesión didáctica 4',
    subtitle: 'Módulo preparado',
    fileName: 'SesionDidactica4.tsx',
  },
];

export const DEFAULT_STUDENT_PROFILE: StudentProfile = {
  nombre: 'Samuel',
  cedula: 'Por asignar',
  materia: 'Por asignar',
  carrera: 'Ingeniería en Sistemas',
  semestre: 'Por asignar',
  seccion: 'Por asignar',
  institucion: 'Universidad',
  docente: 'Por asignar',
  telefono: '+58 412 000 0000',
  correo: 'samuel.tg007@gmail.com',
};

export function truncateWords(text: string, maxWords: number): string {
  const words = text.trim().split(/\s+/);
  if (words.length <= maxWords) return text;
  return `${words.slice(0, maxWords).join(' ')}...`;
}

export interface OrganizationalRole {
  title: string;
  count: number;
  note?: string;
  isHighlightedRole?: boolean;
}

export interface OrganizationalUnit {
  id: string;
  name: string;
  subtitle?: string;
  category: 'Gerencia' | 'Departamento';
  isKeyUnit?: boolean;
  keyNote?: string;
  roles: OrganizationalRole[];
}

export interface OrganizationalLocation {
  id: string;
  name: string;
  region: string;
  landmark: string;
  roleDetail: string;
  isHeadquarters?: boolean;
}

export const ORGANIZATIONAL_LOCATIONS: OrganizationalLocation[] = [
  {
    id: 'sede-central',
    name: 'Sede Central',
    region: 'Caracas',
    landmark: 'Cerca del Parque Nacional El Ávila',
    roleDetail: 'Edificio de dos pisos · Dirección y soporte TI',
    isHeadquarters: true,
  },
  {
    id: 'sucursal-guayana',
    name: 'Sucursal Guayana',
    region: 'Estado Bolívar',
    landmark: 'Cerca del Salto Ángel',
    roleDetail: 'Sucursal regional · Soporte remoto',
  },
  {
    id: 'sucursal-andes',
    name: 'Sucursal Andes',
    region: 'Estado Mérida',
    landmark: 'Cerca del Pico Bolívar',
    roleDetail: 'Sucursal regional · Soporte remoto',
  },
  {
    id: 'sucursal-insular',
    name: 'Sucursal Insular',
    region: 'Estado Nueva Esparta',
    landmark: 'Isla de Margarita',
    roleDetail: 'Sucursal regional · Soporte remoto',
  },
];

export const ORGANIZATIONAL_UNITS: OrganizationalUnit[] = [
  {
    id: 'gerencia-general',
    name: 'Gerencia General',
    category: 'Gerencia',
    isKeyUnit: true,
    keyNote: 'Dirección ejecutiva del convenio',
    roles: [
      {
        title: 'Director Presidente',
        count: 1,
        note: 'Impulsor del convenio tecnológico',
        isHighlightedRole: true,
      },
      {
        title: 'Asistente de Presidencia',
        count: 1,
      },
      {
        title: 'Coordinadores Regionales',
        count: 3,
        note: 'Bolívar, Mérida, Margarita',
      },
    ],
  },
  {
    id: 'tecnologia',
    name: 'Departamento de Tecnología',
    subtitle: 'Soporte a las 4 sedes',
    category: 'Departamento',
    isKeyUnit: true,
    keyNote: 'Pieza clave del caso de estudio',
    roles: [
      {
        title: 'Ingeniero en Sistemas / Jefe de Departamento',
        count: 1,
      },
      {
        title: 'Técnico en Informática',
        count: 1,
      },
    ],
  },
  {
    id: 'planificacion-turistica',
    name: 'Departamento de Planificación Turística',
    category: 'Departamento',
    roles: [
      {
        title: 'Jefe de Planificación',
        count: 1,
      },
      {
        title: 'Coordinadores de Rutas',
        count: 2,
      },
      {
        title: 'Guías Turísticos',
        count: 12,
      },
    ],
  },
  {
    id: 'administracion-presupuesto',
    name: 'Departamento de Administración y Presupuesto',
    category: 'Departamento',
    roles: [
      {
        title: 'Administrador General',
        count: 1,
      },
      {
        title: 'Analistas de Presupuesto',
        count: 2,
      },
      {
        title: 'Asistentes Administrativos',
        count: 5,
      },
    ],
  },
  {
    id: 'atencion-usuario-ventas',
    name: 'Departamento de Atención al Usuario y Ventas',
    category: 'Departamento',
    roles: [
      {
        title: 'Supervisor de Atención Social',
        count: 1,
      },
      {
        title: 'Asesores de Turismo / Atención al Público',
        count: 17,
        note: 'Distribuidos en las 4 sedes',
      },
    ],
  },
];

export const TOTAL_WORKERS = ORGANIZATIONAL_UNITS.reduce(
  (sum, unit) =>
    sum + unit.roles.reduce((unitSum, role) => unitSum + role.count, 0),
  0
);

