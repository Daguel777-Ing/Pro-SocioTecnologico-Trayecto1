import { useMemo, useState } from 'react';
import {
  Compass,
  Ear,
  ExternalLink,
  Handshake,
  Headphones,
  HeartHandshake,
  ListChecks,
  MessageCircle,
  MessageSquareHeart,
  PhoneCall,
  RefreshCw,
  Scale,
  ShieldCheck,
  Smile,
  Users,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

type SoftFrameworkFilter =
  | 'todos'
  | 'Goleman / Rogers'
  | 'Comunicación Asertiva'
  | 'Thomas-Kilmann'
  | 'Gestión y Priorización'
  | 'Trabajo en Equipo';

type TeamMemberFilter = 'todos' | 'Samuel Tovar' | 'Carlos Mendoza';

interface SoftSituationRow {
  id: number;
  situacion: string;
  habilidad: string;
  conducta: string;
  marco: string;
  marcoUrl: string;
  marcoCategoria: Exclude<SoftFrameworkFilter, 'todos'>;
  marcoStyle: string;
  icon: typeof HeartHandshake;
  iconAccent: string;
}

interface SoftTeamSkillRow {
  id: number;
  integranteKey: Exclude<TeamMemberFilter, 'todos'>;
  integrante: string;
  iniciales: string;
  habilidad: string;
  situacionConcreta: string;
  marco: string;
  marcoUrl: string;
  marcoStyle: string;
  icon: typeof HeartHandshake;
}

const SOFT_SITUATIONS_DATA: SoftSituationRow[] = [
  {
    id: 1,
    situacion:
      'Un trabajador se llevó la PC a otro escritorio y se queja cuando se la piden',
    habilidad: 'Empatía',
    conducta:
      'Escucharlo sin interrumpir, entender por qué se siente molesto y luego explicarle con calma por qué debemos anotar dónde está cada equipo.',
    marco: 'Goleman (Inteligencia Emocional)',
    marcoUrl: 'https://asana.com/es/resources/emotional-intelligence-skills',
    marcoCategoria: 'Goleman / Rogers',
    marcoStyle:
      'border-[#0D9488]/30 bg-[#F0FDFA] text-[#0F766E] hover:border-[#0D9488] hover:bg-[#CCFBF1]',
    icon: HeartHandshake,
    iconAccent: 'bg-[#0D9488]/12 text-[#0F766E]',
  },
  {
    id: 2,
    situacion:
      'Un empleado está furioso porque su PC vieja se apagó y perdió su trabajo',
    habilidad: 'Escucha activa y calma',
    conducta:
      'Dejar que se desahogue sin discutir, mirarlo con atención y resumir su problema para que vea que sí lo estamos ayudando.',
    marco: 'Carl Rogers (Escucha Activa)',
    marcoUrl: 'https://asana.com/es/resources/active-listening',
    marcoCategoria: 'Goleman / Rogers',
    marcoStyle:
      'border-emerald-300/70 bg-emerald-50 text-emerald-800 hover:border-emerald-500 hover:bg-emerald-100',
    icon: Ear,
    iconAccent: 'bg-emerald-500/12 text-emerald-700',
  },
  {
    id: 3,
    situacion:
      'Las 3 sedes del interior sienten que Caracas las tiene olvidadas',
    habilidad: 'Comunicación clara y constante',
    conducta:
      'Avisarles cómo va cada arreglo por mensaje o llamada sin esperar a que reclamen, usando palabras sencillas que cualquiera entienda.',
    marco: 'Comunicación Asertiva',
    marcoUrl: 'https://es.wikipedia.org/wiki/Asertividad',
    marcoCategoria: 'Comunicación Asertiva',
    marcoStyle:
      'border-[#D97706]/30 bg-[#FFFBEB] text-[#B45309] hover:border-[#D97706] hover:bg-[#FEF3C7]',
    icon: MessageCircle,
    iconAccent: 'bg-[#D97706]/12 text-[#B45309]',
  },
  {
    id: 4,
    situacion:
      'Dos oficinas pelean porque ambas quieren que les arreglen su PC primero',
    habilidad: 'Resolución de conflictos',
    conducta:
      'Hablar con ambas partes sin tomar bandos, explicar por qué un caso es más urgente y dar una hora clara de atención para el otro.',
    marco: 'Modelo Thomas-Kilmann (Conflictos)',
    marcoUrl: 'https://asana.com/es/resources/conflict-resolution-strategies',
    marcoCategoria: 'Thomas-Kilmann',
    marcoStyle:
      'border-amber-300/80 bg-amber-50 text-amber-800 hover:border-amber-500 hover:bg-amber-100',
    icon: Scale,
    iconAccent: 'bg-amber-500/12 text-amber-700',
  },
  {
    id: 5,
    situacion:
      'Los trabajadores no quieren usar el sistema nuevo de reportes (GLPI)',
    habilidad: 'Paciencia y guía paso a paso',
    conducta:
      'Enseñarles sin burlarse ni apurarlos, mostrando con un ejemplo corto cómo mandar un reporte les ahorra tiempo.',
    marco: 'Gestión del Cambio (IBM)',
    marcoUrl: 'https://www.ibm.com/es-es/think/topics/change-management',
    marcoCategoria: 'Gestión y Priorización',
    marcoStyle:
      'border-[#0F766E]/30 bg-[#F0FDFA] text-[#0F766E] hover:border-[#0F766E] hover:bg-[#CCFBF1]',
    icon: RefreshCw,
    iconAccent: 'bg-[#0D9488]/12 text-[#0F766E]',
  },
  {
    id: 6,
    situacion:
      'Hay que decirle a alguien que su computadora ya no sirve y no hay repuesto hoy',
    habilidad: 'Tacto y honestidad',
    conducta:
      'Decir la verdad con respeto y sin culpar al usuario, ofreciendo una solución temporal (como prestar otro equipo) para que no quede parado.',
    marco: 'Comunicación Asertiva',
    marcoUrl: 'https://es.wikipedia.org/wiki/Asertividad',
    marcoCategoria: 'Comunicación Asertiva',
    marcoStyle:
      'border-[#D97706]/30 bg-[#FFFBEB] text-[#B45309] hover:border-[#D97706] hover:bg-[#FEF3C7]',
    icon: ShieldCheck,
    iconAccent: 'bg-[#D97706]/12 text-[#B45309]',
  },
  {
    id: 7,
    situacion:
      'Los 48 trabajadores piden cosas al mismo tiempo y los 2 técnicos se estresan',
    habilidad: 'Manejo del estrés y orden',
    conducta:
      'Respirar hondo, no responder de mala gana y organizar una lista de lo más urgente para atender uno por uno sin perder el control.',
    marco: 'Matriz de Eisenhower (Priorización)',
    marcoUrl: 'https://asana.com/es/resources/eisenhower-matrix',
    marcoCategoria: 'Gestión y Priorización',
    marcoStyle:
      'border-[#0D9488]/30 bg-[#F0FDFA] text-[#0F766E] hover:border-[#0D9488] hover:bg-[#CCFBF1]',
    icon: ListChecks,
    iconAccent: 'bg-[#0D9488]/12 text-[#0F766E]',
  },
  {
    id: 8,
    situacion:
      'Llegaron computadoras nuevas del convenio y todos quieren una para su escritorio',
    habilidad: 'Negociación justa',
    conducta:
      'Explicar con transparencia que primero las recibirán quienes tienen equipos dañados o muy viejos, para que nadie sienta favoritismos.',
    marco: 'Modelo Thomas-Kilmann (Conflictos)',
    marcoUrl: 'https://asana.com/es/resources/conflict-resolution-strategies',
    marcoCategoria: 'Thomas-Kilmann',
    marcoStyle:
      'border-amber-300/80 bg-amber-50 text-amber-800 hover:border-amber-500 hover:bg-amber-100',
    icon: Handshake,
    iconAccent: 'bg-amber-500/12 text-amber-700',
  },
  {
    id: 9,
    situacion:
      'Un trabajador se enreda al recibir instrucciones técnicas por teléfono desde otra ciudad',
    habilidad: 'Lenguaje sencillo y paciencia',
    conducta:
      "Evitar palabras raras de informática y guiarlo paso a paso con calma (por ejemplo: 'haz clic en el botón azul de abajo') hasta resolverlo.",
    marco: 'Carl Rogers (Escucha Activa)',
    marcoUrl: 'https://asana.com/es/resources/active-listening',
    marcoCategoria: 'Goleman / Rogers',
    marcoStyle:
      'border-emerald-300/70 bg-emerald-50 text-emerald-800 hover:border-emerald-500 hover:bg-emerald-100',
    icon: PhoneCall,
    iconAccent: 'bg-emerald-500/12 text-emerald-700',
  },
  {
    id: 10,
    situacion:
      'Falta coordinación entre los dos especialistas del departamento de tecnología',
    habilidad: 'Trabajo en equipo',
    conducta:
      'Repartirse las tareas según lo que mejor sabe hacer cada uno y avisarse qué casos quedaron pendientes al terminar el día.',
    marco: 'Trabajo en Equipo (Atlassian)',
    marcoUrl: 'https://www.atlassian.com/es/team-playbook',
    marcoCategoria: 'Trabajo en Equipo',
    marcoStyle:
      'border-teal-300/80 bg-teal-50 text-teal-800 hover:border-teal-500 hover:bg-teal-100',
    icon: Users,
    iconAccent: 'bg-teal-500/12 text-teal-700',
  },
];

const SOFT_TEAM_SKILLS_DATA: SoftTeamSkillRow[] = [
  {
    id: 1,
    integranteKey: 'Samuel Tovar',
    integrante: 'Samuel Tovar',
    iniciales: 'ST',
    habilidad: 'Empatía y trato suave',
    situacionConcreta:
      'Al hablar con un trabajador frustrado porque su computadora iba muy lenta, lo escuchó con calma y se puso en su lugar sin hacerlo sentir mal.',
    marco: 'Goleman (Inteligencia Emocional)',
    marcoUrl: 'https://asana.com/es/resources/emotional-intelligence-skills',
    marcoStyle:
      'border-[#0D9488]/30 bg-[#F0FDFA] text-[#0F766E] hover:border-[#0D9488] hover:bg-[#CCFBF1]',
    icon: HeartHandshake,
  },
  {
    id: 2,
    integranteKey: 'Samuel Tovar',
    integrante: 'Samuel Tovar',
    iniciales: 'ST',
    habilidad: 'Tacto para decir la verdad sin herir',
    situacionConcreta:
      'Cuando tuvo que avisar que un equipo viejo no tenía arreglo rápido, buscó palabras amables y respetuosas para explicar la realidad sin incomodar a la persona.',
    marco: 'Comunicación Asertiva',
    marcoUrl: 'https://es.wikipedia.org/wiki/Asertividad',
    marcoStyle:
      'border-[#D97706]/30 bg-[#FFFBEB] text-[#B45309] hover:border-[#D97706] hover:bg-[#FEF3C7]',
    icon: MessageSquareHeart,
  },
  {
    id: 3,
    integranteKey: 'Samuel Tovar',
    integrante: 'Samuel Tovar',
    iniciales: 'ST',
    habilidad: 'Escucha tranquila y sin interrumpir',
    situacionConcreta:
      'Durante una queja por el desorden de los equipos, mantuvo una actitud calmada y escuchó todo el reclamo antes de proponer una solución.',
    marco: 'Carl Rogers (Escucha Activa)',
    marcoUrl: 'https://asana.com/es/resources/active-listening',
    marcoStyle:
      'border-emerald-300/70 bg-emerald-50 text-emerald-800 hover:border-emerald-500 hover:bg-emerald-100',
    icon: Ear,
  },
  {
    id: 4,
    integranteKey: 'Samuel Tovar',
    integrante: 'Samuel Tovar',
    iniciales: 'ST',
    habilidad: 'Liderazgo solo cuando hace falta',
    situacionConcreta:
      'Aunque prefiere no imponerse ni mandar a otros, al ver que nadie organizaba la entrega de los datos del inventario, dio un paso al frente con calma para ordenar el trabajo y sacarlo adelante.',
    marco: 'Liderazgo Situacional',
    marcoUrl:
      'https://es.wikipedia.org/wiki/Teor%C3%ADa_del_liderazgo_situacional',
    marcoStyle:
      'border-amber-300/80 bg-amber-50 text-amber-800 hover:border-amber-500 hover:bg-amber-100',
    icon: Compass,
  },
  {
    id: 5,
    integranteKey: 'Carlos Mendoza',
    integrante: 'Carlos Mendoza',
    iniciales: 'CM',
    habilidad: 'Comunicación directa y respetuosa',
    situacionConcreta:
      'Explicó con claridad a los jefes de oficina las reglas para pedir soporte por ticket, poniendo límites sanos sin perder la educación.',
    marco: 'Comunicación Asertiva',
    marcoUrl: 'https://es.wikipedia.org/wiki/Asertividad',
    marcoStyle:
      'border-[#D97706]/30 bg-[#FFFBEB] text-[#B45309] hover:border-[#D97706] hover:bg-[#FEF3C7]',
    icon: MessageCircle,
  },
  {
    id: 6,
    integranteKey: 'Carlos Mendoza',
    integrante: 'Carlos Mendoza',
    iniciales: 'CM',
    habilidad: 'Mediación en momentos de tensión',
    situacionConcreta:
      'Cuando dos departamentos discutían por quién sería atendido primero, ayudó a llegar a un acuerdo justo revisando qué tarea era más urgente.',
    marco: 'Modelo Thomas-Kilmann (Conflictos)',
    marcoUrl: 'https://asana.com/es/resources/conflict-resolution-strategies',
    marcoStyle:
      'border-amber-300/80 bg-amber-50 text-amber-800 hover:border-amber-500 hover:bg-amber-100',
    icon: Scale,
  },
  {
    id: 7,
    integranteKey: 'Carlos Mendoza',
    integrante: 'Carlos Mendoza',
    iniciales: 'CM',
    habilidad: 'Apoyo y trabajo en equipo',
    situacionConcreta:
      'Se coordinó con Samuel para dividirse las sedes y revisar juntos los reportes antes de entregarlos, evitando que uno solo cargara con todo.',
    marco: 'Trabajo en Equipo (Atlassian)',
    marcoUrl: 'https://www.atlassian.com/es/team-playbook',
    marcoStyle:
      'border-teal-300/80 bg-teal-50 text-teal-800 hover:border-teal-500 hover:bg-teal-100',
    icon: Users,
  },
  {
    id: 8,
    integranteKey: 'Carlos Mendoza',
    integrante: 'Carlos Mendoza',
    iniciales: 'CM',
    habilidad: 'Paciencia ante fallas a distancia',
    situacionConcreta:
      'Cuando el internet falló varias veces durante una ayuda remota a la sede de Mérida, mantuvo el buen ánimo y guió al trabajador hasta terminar.',
    marco: 'Goleman (Inteligencia Emocional)',
    marcoUrl: 'https://asana.com/es/resources/emotional-intelligence-skills',
    marcoStyle:
      'border-[#0D9488]/30 bg-[#F0FDFA] text-[#0F766E] hover:border-[#0D9488] hover:bg-[#CCFBF1]',
    icon: Headphones,
  },
];

function IsometricEmpathyMiniSvg() {
  return (
    <svg
      viewBox="0 0 120 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Ilustración de empatía y diálogo en el soporte"
      className="h-20 w-24 shrink-0"
    >
      <rect width="120" height="96" rx="14" fill="#F0FDFA" />
      <circle cx="60" cy="48" r="34" fill="#0D9488" fillOpacity="0.09" />
      {/* Burbuja diálogo izquierda */}
      <rect
        x="16"
        y="22"
        width="40"
        height="26"
        rx="10"
        fill="#FFFFFF"
        stroke="#0D9488"
        strokeWidth="1.6"
      />
      <path
        d="M25 32H46M25 39H39"
        stroke="#0F766E"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      {/* Burbuja diálogo derecha */}
      <rect
        x="64"
        y="46"
        width="40"
        height="26"
        rx="10"
        fill="#FFFBEB"
        stroke="#D97706"
        strokeWidth="1.6"
      />
      <path
        d="M73 56H94M73 63H87"
        stroke="#B45309"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      {/* Corazón / empatía en el centro */}
      <circle cx="60" cy="48" r="12" fill="#0F766E" />
      <path
        d="M60 54.5C60 54.5 53.5 50.2 53.5 46.2C53.5 44.3 55 42.8 56.8 42.8C58.2 42.8 59.3 43.7 60 44.8C60.7 43.7 61.8 42.8 63.2 42.8C65 42.8 66.5 44.3 66.5 46.2C66.5 50.2 60 54.5 60 54.5Z"
        fill="#FDE68A"
      />
    </svg>
  );
}

function IsometricSoftTeamMiniSvg() {
  return (
    <svg
      viewBox="0 0 120 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Ilustración de trabajo en equipo y comunicación cálida"
      className="h-20 w-24 shrink-0"
    >
      <rect width="120" height="96" rx="14" fill="#FFFBEB" />
      <circle
        cx="42"
        cy="38"
        r="16"
        fill="#0D9488"
        fillOpacity="0.14"
        stroke="#0F766E"
        strokeWidth="1.5"
      />
      <circle cx="42" cy="33" r="5" fill="#0F766E" />
      <path
        d="M32 46C33.5 41.5 37 39.5 42 39.5C47 39.5 50.5 41.5 52 46"
        stroke="#0F766E"
        strokeWidth="2"
        strokeLinecap="round"
      />

      <circle
        cx="78"
        cy="38"
        r="16"
        fill="#D97706"
        fillOpacity="0.16"
        stroke="#B45309"
        strokeWidth="1.5"
      />
      <circle cx="78" cy="33" r="5" fill="#B45309" />
      <path
        d="M68 46C69.5 41.5 73 39.5 78 39.5C83 39.5 86.5 41.5 88 46"
        stroke="#B45309"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Puente de unión */}
      <path
        d="M42 64C50 74 70 74 78 64"
        stroke="#0D9488"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle cx="60" cy="70" r="6" fill="#059669" />
      <path
        d="M57 70L59.2 72.2L63.3 68"
        stroke="#FFFFFF"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const B1_FILTERS: { key: SoftFrameworkFilter; label: string }[] = [
  { key: 'todos', label: 'Todos (10)' },
  { key: 'Goleman / Rogers', label: 'Goleman / Rogers (3)' },
  { key: 'Comunicación Asertiva', label: 'Comunicación Asertiva (2)' },
  { key: 'Thomas-Kilmann', label: 'Thomas-Kilmann (2)' },
  { key: 'Gestión y Priorización', label: 'Gestión y Priorización (2)' },
  { key: 'Trabajo en Equipo', label: 'Trabajo en Equipo (1)' },
];

export function ModuloB1SituacionActual() {
  const [frameworkFilter, setFrameworkFilter] =
    useState<SoftFrameworkFilter>('todos');

  const filteredSituations = useMemo(() => {
    if (frameworkFilter === 'todos') return SOFT_SITUATIONS_DATA;
    return SOFT_SITUATIONS_DATA.filter(
      (item) => item.marcoCategoria === frameworkFilter
    );
  }, [frameworkFilter]);

  return (
    <div className="rounded-3xl bg-gradient-to-br from-[#0D9488]/45 via-emerald-500/30 to-[#D97706]/40 p-[1.5px] shadow-md">
      <div className="overflow-hidden rounded-[calc(1.5rem-1.5px)] bg-white/95 p-5 backdrop-blur-md sm:p-8">
        {/* Encabezado del Módulo B.1 con SVG + Tarjetas de resumen */}
        <div className="flex flex-col justify-between gap-6 border-b border-stone-200/80 pb-6 lg:flex-row lg:items-center">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <IsometricEmpathyMiniSvg />
            <div>
              <span className="font-mono text-xs font-bold tracking-wide text-[#0F766E] tabular-nums">
                Módulo B.1 · Atención humana y clima laboral
              </span>
              <h3 className="font-display mt-1 text-xl font-bold tracking-tight text-[#0F172A] sm:text-2xl">
                B.1 Cuadro de habilidades blandas para atender la situación actual
              </h3>
              <p className="mt-1.5 max-w-2xl text-xs leading-relaxed text-slate-600 sm:text-sm">
                Cómo responder con calma, respeto y claridad ante las 10
                situaciones humanas que viven los trabajadores y el equipo de
                soporte en las cuatro sedes.
              </p>
            </div>
          </div>

          <div className="grid shrink-0 grid-cols-2 gap-3 sm:w-auto">
            <div className="rounded-2xl border border-[#0D9488]/25 bg-[#F0FDFA]/90 px-4 py-3 text-center">
              <p className="font-mono text-2xl font-bold text-[#0F766E] tabular-nums">
                10
              </p>
              <p className="mt-0.5 text-[11px] font-semibold text-slate-600">
                situaciones de conflicto
              </p>
            </div>
            <div className="rounded-2xl border border-[#D97706]/25 bg-[#FFFBEB]/90 px-4 py-3 text-center">
              <p className="font-mono text-2xl font-bold text-[#B45309] tabular-nums">
                5
              </p>
              <p className="mt-0.5 text-[11px] font-semibold text-slate-600">
                enfoques teóricos
              </p>
            </div>
          </div>
        </div>

        {/* Barra de filtro rápido por enfoque teórico */}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs font-medium text-slate-500">
            Filtrar por enfoque teórico (haz clic en cualquier etiqueta para leer su guía en español):
          </p>
          <div className="flex flex-wrap items-center gap-1.5">
            {B1_FILTERS.map((f) => {
              const isActive = frameworkFilter === f.key;
              return (
                <button
                  key={f.key}
                  type="button"
                  onClick={() => setFrameworkFilter(f.key)}
                  className={`cursor-pointer rounded-full border px-3 py-1.5 text-xs font-semibold transition-all whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'border-[#0F766E] bg-gradient-to-r from-[#0F766E] via-[#0D9488] to-[#D97706] text-white shadow-sm'
                      : 'border-stone-200 bg-[#FAF8F3] text-slate-600 hover:border-[#0D9488]/45 hover:text-[#0F766E]'
                  }`}
                >
                  {f.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tabla responsiva de 4 columnas obligatorias */}
        <div className="mt-5 overflow-hidden rounded-2xl border border-stone-200/90 shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[880px] border-collapse text-left">
              <thead>
                <tr className="bg-gradient-to-r from-[#0F766E] via-[#0D9488] to-[#D97706] text-white">
                  <th
                    scope="col"
                    className="px-4 py-3.5 text-xs font-bold tracking-wide"
                  >
                    Situación del caso
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3.5 text-xs font-bold tracking-wide"
                  >
                    Habilidad blanda necesaria
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3.5 text-xs font-bold tracking-wide"
                  >
                    Conducta observable esperada
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3.5 text-xs font-bold tracking-wide"
                  >
                    Marco teórico que la respalda
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200/80 bg-white">
                <AnimatePresence mode="popLayout">
                  {filteredSituations.map((row) => {
                    const RowIcon = row.icon;
                    return (
                      <motion.tr
                        key={row.id}
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.16 }}
                        className="group transition-colors hover:bg-[#FFFBEB]/45"
                      >
                        {/* Columna 1: Situación del caso */}
                        <td className="w-[27%] px-4 py-4 align-top">
                          <div className="flex items-start gap-3">
                            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#0F766E] to-[#D97706] font-mono text-[11px] font-bold text-white tabular-nums shadow-xs">
                              {String(row.id).padStart(2, '0')}
                            </span>
                            <div className="flex items-start gap-2.5">
                              <span
                                className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${row.iconAccent}`}
                              >
                                <RowIcon
                                  className="h-3.5 w-3.5"
                                  aria-hidden="true"
                                />
                              </span>
                              <span className="text-xs font-semibold leading-relaxed text-[#0F172A] sm:text-[13px]">
                                {row.situacion}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* Columna 2: Habilidad blanda necesaria */}
                        <td className="w-[20%] px-4 py-4 align-top">
                          <p className="text-xs font-bold leading-relaxed text-[#0F766E] sm:text-[13px]">
                            {row.habilidad}
                          </p>
                        </td>

                        {/* Columna 3: Conducta observable esperada */}
                        <td className="w-[32%] px-4 py-4 align-top">
                          <p className="text-xs leading-relaxed text-slate-600 sm:text-[13px]">
                            {row.conducta}
                          </p>
                        </td>

                        {/* Columna 4: Marco teórico (Enlace cliqueable con ExternalLink) */}
                        <td className="w-[21%] px-4 py-4 align-top">
                          <a
                            href={row.marcoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            title={`Leer guía sobre ${row.marco}`}
                            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11px] font-semibold leading-snug transition-all hover:-translate-y-0.5 hover:shadow-xs ${row.marcoStyle}`}
                          >
                            <span>{row.marco}</span>
                            <ExternalLink
                              className="h-3 w-3 shrink-0 opacity-80"
                              aria-hidden="true"
                            />
                          </a>
                        </td>
                      </motion.tr>
                    );
                  })}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

const B2_FILTERS: { key: TeamMemberFilter; label: string }[] = [
  { key: 'todos', label: 'Todos (8)' },
  { key: 'Samuel Tovar', label: 'Samuel Tovar (4)' },
  { key: 'Carlos Mendoza', label: 'Carlos Mendoza (4)' },
];

export function ModuloB2EquipoTrabajo() {
  const [memberFilter, setMemberFilter] = useState<TeamMemberFilter>('todos');

  const filteredTeamSoftSkills = useMemo(() => {
    if (memberFilter === 'todos') return SOFT_TEAM_SKILLS_DATA;
    return SOFT_TEAM_SKILLS_DATA.filter(
      (item) => item.integranteKey === memberFilter
    );
  }, [memberFilter]);

  return (
    <div className="rounded-3xl bg-gradient-to-br from-[#D97706]/40 via-[#0D9488]/35 to-emerald-500/35 p-[1.5px] shadow-md">
      <div className="overflow-hidden rounded-[calc(1.5rem-1.5px)] bg-white/95 p-5 backdrop-blur-md sm:p-8">
        {/* Encabezado del Módulo B.2 con SVG + Tarjetas de resumen */}
        <div className="flex flex-col justify-between gap-6 border-b border-stone-200/80 pb-6 lg:flex-row lg:items-center">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <IsometricSoftTeamMiniSvg />
            <div>
              <span className="font-mono text-xs font-bold tracking-wide text-[#B45309] tabular-nums">
                Módulo B.2 · Cualidades humanas del equipo
              </span>
              <h3 className="font-display mt-1 text-xl font-bold tracking-tight text-[#0F172A] sm:text-2xl">
                B.2 Cuadro de habilidades blandas del equipo de trabajo
              </h3>
              <p className="mt-1.5 max-w-2xl text-xs leading-relaxed text-slate-600 sm:text-sm">
                Las cualidades humanas reales que aplicamos al tratar con los
                usuarios, mediar conflictos y trabajar unidos en el equipo de
                tecnología.
              </p>
            </div>
          </div>

          <div className="grid shrink-0 grid-cols-2 gap-3 sm:w-auto">
            <div className="rounded-2xl border border-[#0D9488]/25 bg-[#F0FDFA]/90 px-4 py-3 text-center">
              <p className="font-mono text-2xl font-bold text-[#0F766E] tabular-nums">
                2
              </p>
              <p className="mt-0.5 text-[11px] font-semibold text-slate-600">
                integrantes
              </p>
            </div>
            <div className="rounded-2xl border border-[#D97706]/25 bg-[#FFFBEB]/90 px-4 py-3 text-center">
              <p className="font-mono text-2xl font-bold text-[#B45309] tabular-nums">
                8
              </p>
              <p className="mt-0.5 text-[11px] font-semibold text-slate-600">
                habilidades reales
              </p>
            </div>
          </div>
        </div>

        {/* Barra de filtro rápido arriba de B.2 */}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-stone-200/80 bg-[#FAF8F3]/90 px-4 py-3">
          <span className="text-xs font-semibold text-[#0F172A]">
            Ver habilidades humanas según la persona:
          </span>

          <div className="flex flex-wrap items-center gap-2">
            {B2_FILTERS.map((filter) => {
              const isActive = memberFilter === filter.key;
              return (
                <button
                  key={filter.key}
                  type="button"
                  onClick={() => setMemberFilter(filter.key)}
                  aria-pressed={isActive}
                  className={`inline-flex cursor-pointer items-center gap-2 rounded-xl border px-3.5 py-2 text-xs font-semibold transition-all whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'border-[#0F766E] bg-gradient-to-r from-[#0F766E] to-[#D97706] text-white shadow-sm'
                      : 'border-stone-200 bg-white text-slate-700 hover:border-[#D97706]/50 hover:text-[#B45309]'
                  }`}
                >
                  {filter.key === 'Samuel Tovar' && (
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-[#14B8A6] to-[#0F766E] font-mono text-[10px] font-bold text-white">
                      ST
                    </span>
                  )}
                  {filter.key === 'Carlos Mendoza' && (
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-[#F59E0B] to-[#B45309] font-mono text-[10px] font-bold text-white">
                      CM
                    </span>
                  )}
                  <span>{filter.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tabla responsiva de 4 columnas obligatorias */}
        <div className="mt-5 overflow-hidden rounded-2xl border border-stone-200/90 shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[860px] border-collapse text-left">
              <thead>
                <tr className="bg-gradient-to-r from-[#0F766E] via-emerald-600 to-[#D97706] text-white">
                  <th
                    scope="col"
                    className="px-4 py-3.5 text-xs font-bold tracking-wide"
                  >
                    Nombre del integrante
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3.5 text-xs font-bold tracking-wide"
                  >
                    Habilidad blanda demostrada
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3.5 text-xs font-bold tracking-wide"
                  >
                    Situación concreta donde la demostró
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3.5 text-xs font-bold tracking-wide"
                  >
                    Marco teórico que la respalda
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200/80 bg-white">
                <AnimatePresence mode="popLayout">
                  {filteredTeamSoftSkills.map((row) => {
                    const SkillIcon = row.icon;
                    const isSamuel = row.integranteKey === 'Samuel Tovar';

                    return (
                      <motion.tr
                        key={row.id}
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.16 }}
                        className="group transition-colors hover:bg-[#FFFBEB]/45"
                      >
                        {/* Columna 1: Nombre del integrante con Avatar estilizado */}
                        <td className="w-[21%] px-4 py-4 align-top">
                          <div className="flex items-center gap-3">
                            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-stone-100 font-mono text-[11px] font-bold text-slate-600 tabular-nums">
                              {String(row.id).padStart(2, '0')}
                            </span>
                            <div
                              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-mono text-xs font-bold text-white shadow-sm ${
                                isSamuel
                                  ? 'bg-gradient-to-br from-[#14B8A6] to-[#0F766E]'
                                  : 'bg-gradient-to-br from-[#F59E0B] to-[#B45309]'
                              }`}
                            >
                              {row.iniciales}
                            </div>
                            <p className="text-xs font-bold text-[#0F172A] sm:text-sm">
                              {row.integrante}
                            </p>
                          </div>
                        </td>

                        {/* Columna 2: Habilidad blanda demostrada */}
                        <td className="w-[23%] px-4 py-4 align-top">
                          <div className="flex items-start gap-2.5">
                            <span
                              className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${
                                isSamuel
                                  ? 'bg-[#0D9488]/12 text-[#0F766E]'
                                  : 'bg-[#D97706]/12 text-[#B45309]'
                              }`}
                            >
                              <SkillIcon
                                className="h-3.5 w-3.5"
                                aria-hidden="true"
                              />
                            </span>
                            <p className="text-xs font-semibold leading-relaxed text-[#0F172A] sm:text-[13px]">
                              {row.habilidad}
                            </p>
                          </div>
                        </td>

                        {/* Columna 3: Situación concreta donde la demostró */}
                        <td className="w-[35%] px-4 py-4 align-top">
                          <div className="flex items-start gap-2.5 rounded-xl border border-amber-200/75 bg-gradient-to-r from-[#FFFBEB]/85 to-[#F0FDFA]/70 px-3.5 py-2.5 shadow-xs">
                            <Smile
                              className="mt-0.5 h-4 w-4 shrink-0 text-[#B45309]"
                              aria-hidden="true"
                            />
                            <p className="text-xs leading-relaxed text-slate-700">
                              {row.situacionConcreta}
                            </p>
                          </div>
                        </td>

                        {/* Columna 4: Marco teórico (Enlace cliqueable con ExternalLink) */}
                        <td className="w-[21%] px-4 py-4 align-top">
                          <a
                            href={row.marcoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            title={`Leer guía sobre ${row.marco}`}
                            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11px] font-semibold leading-snug transition-all hover:-translate-y-0.5 hover:shadow-xs ${row.marcoStyle}`}
                          >
                            <span>{row.marco}</span>
                            <ExternalLink
                              className="h-3 w-3 shrink-0 opacity-80"
                              aria-hidden="true"
                            />
                          </a>
                        </td>
                      </motion.tr>
                    );
                  })}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
