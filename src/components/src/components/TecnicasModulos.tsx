import { useMemo, useState } from 'react';
import {
  CheckCircle2,
  Code2,
  Cpu,
  Database,
  ExternalLink,
  HardDrive,
  Headphones,
  Layers,
  Monitor,
  Network,
  Server,
  ShieldAlert,
  Ticket,
  Wifi,
  Wrench,
  Zap,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

type FrameworkFilter =
  | 'todos'
  | 'ITIL'
  | 'ISO/IEC'
  | 'Mantenimiento'
  | 'Modelo OSI';

type TeamMemberFilter = 'todos' | 'Samuel Tovar' | 'Carlos Mendoza';

interface CaseProblemRow {
  id: number;
  problema: string;
  habilidad: string;
  justificacion: string;
  marco: string;
  marcoUrl: string;
  marcoCategoria: Exclude<FrameworkFilter, 'todos'>;
  marcoStyle: string;
  icon: typeof Cpu;
  iconAccent: string;
}

interface TeamSkillRow {
  id: number;
  integranteKey: Exclude<TeamMemberFilter, 'todos'>;
  integrante: string;
  iniciales: string;
  habilidad: string;
  evidencia: string;
  icon: typeof Cpu;
}

const CASE_PROBLEMS_DATA: CaseProblemRow[] = [
  {
    id: 1,
    problema: 'Computadoras muy viejas y lentas (como las VIT con poca memoria)',
    habilidad: 'Saber revisar las piezas por dentro de una PC',
    justificacion:
      'Para decidir si vale la pena mejorarla con piezas nuevas o si ya toca cambiarla por una más moderna.',
    marco: 'ITIL (Cuidado de equipos)',
    marcoUrl: 'https://www.atlassian.com/es/itsm/itil',
    marcoCategoria: 'ITIL',
    marcoStyle:
      'border-[#1D4ED8]/25 bg-[#EFF6FF] text-[#1D4ED8] hover:border-[#1D4ED8] hover:bg-[#DBEAFE]',
    icon: Cpu,
    iconAccent: 'bg-[#1D4ED8]/10 text-[#1D4ED8]',
  },
  {
    id: 2,
    problema:
      'Nadie sabe dónde está cada computadora (las movieron de oficina en la pandemia)',
    habilidad: 'Hacer listas ordenadas y etiquetar cada equipo',
    justificacion:
      'Para saber exactamente en qué sede, piso y escritorio está cada una de las 40 computadoras y no perderles la pista.',
    marco: 'ITIL (Control de equipos)',
    marcoUrl: 'https://www.atlassian.com/es/itsm/itil',
    marcoCategoria: 'ITIL',
    marcoStyle:
      'border-[#1D4ED8]/25 bg-[#EFF6FF] text-[#1D4ED8] hover:border-[#1D4ED8] hover:bg-[#DBEAFE]',
    icon: Server,
    iconAccent: 'bg-[#1D4ED8]/10 text-[#1D4ED8]',
  },
  {
    id: 3,
    problema:
      'Computadoras que se quedan pegadas reiniciándose sin entrar a Windows',
    habilidad: 'Saber arreglar y volver a instalar Windows',
    justificacion:
      'Para rescatar los archivos del trabajador y lograr que la computadora vuelva a encender normal sin perder nada.',
    marco: 'ITIL (Solución de fallas)',
    marcoUrl: 'https://www.atlassian.com/es/itsm/itil',
    marcoCategoria: 'ITIL',
    marcoStyle:
      'border-[#1D4ED8]/25 bg-[#EFF6FF] text-[#1D4ED8] hover:border-[#1D4ED8] hover:bg-[#DBEAFE]',
    icon: Monitor,
    iconAccent: 'bg-[#1D4ED8]/10 text-[#1D4ED8]',
  },
  {
    id: 4,
    problema:
      'Discos duros dañados o llenos al tope que hacen que todo tarde una eternidad en abrir',
    habilidad: 'Revisar la salud del disco y cambiarlo por uno más rápido (SSD)',
    justificacion:
      'Para cambiar el disco viejo antes de que se dañe por completo y se borre todo el trabajo de la oficina.',
    marco: 'ISO/IEC 20000 (Servicio continuo)',
    marcoUrl: 'https://www.ibm.com/es-es/products/cloud/compliance/iso-20000',
    marcoCategoria: 'ISO/IEC',
    marcoStyle:
      'border-[#0D9488]/30 bg-[#F0FDFA] text-[#0F766E] hover:border-[#0D9488] hover:bg-[#CCFBF1]',
    icon: HardDrive,
    iconAccent: 'bg-[#0D9488]/12 text-[#0F766E]',
  },
  {
    id: 5,
    problema:
      'Computadoras que se calientan demasiado y se apagan solas mientras trabajan',
    habilidad: 'Limpieza interna de la PC y cuidado de los ventiladores',
    justificacion:
      'Para quitarles el polvo acumulado, cambiar la pasta que enfría el procesador y evitar que se quemen por el calor.',
    marco: 'Mantenimiento Preventivo (Cuidado físico)',
    marcoUrl:
      'https://www.ibm.com/es-es/think/topics/what-is-preventive-maintenance',
    marcoCategoria: 'Mantenimiento',
    marcoStyle:
      'border-[#D97706]/30 bg-[#FFFBEB] text-[#B45309] hover:border-[#D97706] hover:bg-[#FEF3C7]',
    icon: Wrench,
    iconAccent: 'bg-[#D97706]/12 text-[#B45309]',
  },
  {
    id: 6,
    problema:
      'Fallas de corriente y fuentes dañadas que impiden que la PC encienda bien',
    habilidad: 'Revisión básica de corriente y piezas eléctricas',
    justificacion:
      'Para detectar a tiempo cuando la fuente de corriente está fallando y evitar un cortocircuito que dañe toda la PC.',
    marco: 'Mantenimiento de Equipos (Seguridad física)',
    marcoUrl: 'https://www.ibm.com/es-es/think/topics/equipment-maintenance',
    marcoCategoria: 'Mantenimiento',
    marcoStyle:
      'border-[#D97706]/30 bg-[#FFFBEB] text-[#B45309] hover:border-[#D97706] hover:bg-[#FEF3C7]',
    icon: Zap,
    iconAccent: 'bg-[#D97706]/12 text-[#B45309]',
  },
  {
    id: 7,
    problema:
      'Ayudar a las 3 oficinas del interior (Bolívar, Mérida y Nueva Esparta) sin poder viajar',
    habilidad: 'Usar programas de ayuda a distancia (como AnyDesk)',
    justificacion:
      'Para conectarse a la pantalla de esas computadoras desde Caracas y arreglar fallas de programas al momento.',
    marco: 'ITIL (Ayuda a distancia)',
    marcoUrl: 'https://www.atlassian.com/es/itsm/itil',
    marcoCategoria: 'ITIL',
    marcoStyle:
      'border-[#1D4ED8]/25 bg-[#EFF6FF] text-[#1D4ED8] hover:border-[#1D4ED8] hover:bg-[#DBEAFE]',
    icon: Headphones,
    iconAccent: 'bg-[#1D4ED8]/10 text-[#1D4ED8]',
  },
  {
    id: 8,
    problema:
      'Los 48 trabajadores reportan fallas en desorden y a veces se olvidan casos urgentes',
    habilidad: 'Usar una plataforma de reportes o tickets (como GLPI)',
    justificacion:
      'Para anotar cada problema en orden, atender primero los más urgentes y guardar un historial de cada arreglo.',
    marco: 'ITIL (Atención al usuario)',
    marcoUrl: 'https://www.atlassian.com/es/itsm/itil',
    marcoCategoria: 'ITIL',
    marcoStyle:
      'border-[#1D4ED8]/25 bg-[#EFF6FF] text-[#1D4ED8] hover:border-[#1D4ED8] hover:bg-[#DBEAFE]',
    icon: Ticket,
    iconAccent: 'bg-[#1D4ED8]/10 text-[#1D4ED8]',
  },
  {
    id: 9,
    problema:
      'Equipos con Windows muy viejos (como Windows 7) que son fáciles de infectar con virus',
    habilidad:
      'Actualizar sistemas, poner antivirus y guardar copias de seguridad',
    justificacion:
      'Para proteger las computadoras contra virus, tener programas al día y cuidar los datos importantes de la empresa.',
    marco: 'ISO/IEC 27001 (Seguridad de datos)',
    marcoUrl: 'https://www.ibm.com/es-es/products/cloud/compliance/iso-27001',
    marcoCategoria: 'ISO/IEC',
    marcoStyle:
      'border-[#0D9488]/30 bg-[#F0FDFA] text-[#0F766E] hover:border-[#0D9488] hover:bg-[#CCFBF1]',
    icon: ShieldAlert,
    iconAccent: 'bg-[#0D9488]/12 text-[#0F766E]',
  },
  {
    id: 10,
    problema:
      'Llegaron computadoras nuevas del convenio y hay que dejarlas listas para trabajar',
    habilidad: 'Conectar equipos a internet (Wi-Fi y cable) y configurar impresoras',
    justificacion:
      'Para dejar las computadoras nuevas listas para usarse, con buena señal y compartiendo impresoras sin problemas.',
    marco: 'Modelo OSI (Cómo funcionan las redes)',
    marcoUrl: 'https://aws.amazon.com/es/what-is/osi-model/',
    marcoCategoria: 'Modelo OSI',
    marcoStyle:
      'border-[#4338CA]/25 bg-[#EEF2FF] text-[#3730A3] hover:border-[#4338CA] hover:bg-[#E0E7FF]',
    icon: Wifi,
    iconAccent: 'bg-[#4338CA]/10 text-[#3730A3]',
  },
];

const TEAM_SKILLS_DATA: TeamSkillRow[] = [
  {
    id: 1,
    integranteKey: 'Samuel Tovar',
    integrante: 'Samuel Tovar',
    iniciales: 'ST',
    habilidad:
      'Organizar el inventario de los 40 equipos y anotar qué le falla a cada uno',
    evidencia:
      'Lista completa de las 40 computadoras publicada en la sección Organización de esta página web.',
    icon: Database,
  },
  {
    id: 2,
    integranteKey: 'Samuel Tovar',
    integrante: 'Samuel Tovar',
    iniciales: 'ST',
    habilidad:
      'Hacer gráficos sencillos para ver rápido cuántas PC funcionan y cuántas fallan',
    evidencia:
      'Panel de gráficos y números integrado en este portafolio web.',
    icon: Layers,
  },
  {
    id: 3,
    integranteKey: 'Samuel Tovar',
    integrante: 'Samuel Tovar',
    iniciales: 'ST',
    habilidad:
      'Armar y publicar páginas web en internet usando GitHub y Netlify',
    evidencia:
      'Esta misma página del portafolio ya publicada en internet con su enlace propio (samueltovarpst.dpdns.org).',
    icon: Code2,
  },
  {
    id: 4,
    integranteKey: 'Samuel Tovar',
    integrante: 'Samuel Tovar',
    iniciales: 'ST',
    habilidad:
      'Instalar Windows en computadoras, arreglar conexiones de Wi-Fi usando comandos (CMD) con un poco de ayuda y cerrar tareas en segundo plano para que la PC vaya más rápido',
    evidencia:
      'Instalaciones de Windows hechas en mis propias computadoras, conexión Wi-Fi recuperada por consola y optimización cerrando programas pesados en el Administrador de tareas.',
    icon: Monitor,
  },
  {
    id: 5,
    integranteKey: 'Carlos Mendoza',
    integrante: 'Carlos Mendoza',
    iniciales: 'CM',
    habilidad:
      'Llevar el orden de los reportes y solicitudes de ayuda en GLPI',
    evidencia:
      'Captura de pantalla de un ticket de falla creado para una computadora de la sede principal.',
    icon: Ticket,
  },
  {
    id: 6,
    integranteKey: 'Carlos Mendoza',
    integrante: 'Carlos Mendoza',
    iniciales: 'CM',
    habilidad:
      'Limpiar las computadoras por dentro, cambiar la pasta térmica y cambiar discos viejos por SSD',
    evidencia:
      'Registro de limpieza interna y cambio de disco duro en un equipo lento de la oficina.',
    icon: HardDrive,
  },
  {
    id: 7,
    integranteKey: 'Carlos Mendoza',
    integrante: 'Carlos Mendoza',
    iniciales: 'CM',
    habilidad:
      'Conectarse a distancia a computadoras de otras ciudades para ayudar a los trabajadores',
    evidencia:
      'Registro de una asistencia a distancia a la sede de Mérida para configurar una impresora.',
    icon: Headphones,
  },
  {
    id: 8,
    integranteKey: 'Carlos Mendoza',
    integrante: 'Carlos Mendoza',
    iniciales: 'CM',
    habilidad:
      'Revisar cables de internet y verificar que las computadoras tengan buena señal en la oficina',
    evidencia:
      'Pruebas de velocidad y conexión de red hechas en las computadoras de los escritorios.',
    icon: Network,
  },
];

function IsometricDiagnosticMiniSvg() {
  return (
    <svg
      viewBox="0 0 120 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Ilustración técnica de revisión de computadoras"
      className="h-20 w-24 shrink-0"
    >
      <rect width="120" height="96" rx="14" fill="#EFF6FF" />
      <path
        d="M60 76L22 58L60 40L98 58L60 76Z"
        fill="#FFFFFF"
        stroke="#1D4ED8"
        strokeOpacity="0.35"
        strokeWidth="1.5"
      />
      <path d="M40 24L60 15L80 24V50L60 59L40 50V24Z" fill="#1E3A8A" />
      <path d="M40 24L60 33L80 24L60 15L40 24Z" fill="#2563EB" />
      <path d="M60 33V59L80 50V24L60 33Z" fill="#0D9488" />
      <path
        d="M46 34L54 38M46 42L54 46"
        stroke="#93C5FD"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="88" cy="24" r="10" fill="#D97706" />
      <path
        d="M84 24L87 27L93 21"
        stroke="#FFFFFF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M24 38H34M86 58H98"
        stroke="#0D9488"
        strokeWidth="2"
        strokeDasharray="3 3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IsometricTeamMiniSvg() {
  return (
    <svg
      viewBox="0 0 120 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Ilustración del equipo de soporte"
      className="h-20 w-24 shrink-0"
    >
      <rect width="120" height="96" rx="14" fill="#F0FDFA" />
      <circle
        cx="42"
        cy="40"
        r="16"
        fill="#1D4ED8"
        fillOpacity="0.14"
        stroke="#1D4ED8"
        strokeWidth="1.5"
      />
      <circle cx="42" cy="35" r="5" fill="#1D4ED8" />
      <path
        d="M32 48C33.5 43.5 37 41.5 42 41.5C47 41.5 50.5 43.5 52 48"
        stroke="#1D4ED8"
        strokeWidth="2"
        strokeLinecap="round"
      />

      <circle
        cx="78"
        cy="40"
        r="16"
        fill="#0D9488"
        fillOpacity="0.16"
        stroke="#0F766E"
        strokeWidth="1.5"
      />
      <circle cx="78" cy="35" r="5" fill="#0F766E" />
      <path
        d="M68 48C69.5 43.5 73 41.5 78 41.5C83 41.5 86.5 43.5 88 48"
        stroke="#0F766E"
        strokeWidth="2"
        strokeLinecap="round"
      />

      <rect
        x="30"
        y="64"
        width="60"
        height="18"
        rx="9"
        fill="#FFFFFF"
        stroke="#D97706"
        strokeWidth="1.5"
      />
      <circle cx="42" cy="73" r="4" fill="#0D9488" />
      <path
        d="M51 73H80"
        stroke="#0F172A"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeOpacity="0.7"
      />
    </svg>
  );
}

const A1_FILTERS: { key: FrameworkFilter; label: string }[] = [
  { key: 'todos', label: 'Todos (10)' },
  { key: 'ITIL', label: 'ITIL (5)' },
  { key: 'ISO/IEC', label: 'ISO/IEC (2)' },
  { key: 'Mantenimiento', label: 'Mantenimiento (2)' },
  { key: 'Modelo OSI', label: 'Modelo OSI (1)' },
];

export function ModuloA1CasoEstudio() {
  const [frameworkFilter, setFrameworkFilter] =
    useState<FrameworkFilter>('todos');

  const filteredProblems = useMemo(() => {
    if (frameworkFilter === 'todos') return CASE_PROBLEMS_DATA;
    return CASE_PROBLEMS_DATA.filter(
      (item) => item.marcoCategoria === frameworkFilter
    );
  }, [frameworkFilter]);

  return (
    <div className="rounded-3xl bg-gradient-to-br from-[#1D4ED8]/45 via-[#0D9488]/35 to-[#D97706]/35 p-[1.5px] shadow-md">
      <div className="overflow-hidden rounded-[calc(1.5rem-1.5px)] bg-white/95 p-5 backdrop-blur-md sm:p-8">
        {/* Encabezado del Módulo A.1 con SVG + Tarjetas de resumen */}
        <div className="flex flex-col justify-between gap-6 border-b border-stone-200/80 pb-6 lg:flex-row lg:items-center">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <IsometricDiagnosticMiniSvg />
            <div>
              <span className="font-mono text-xs font-bold tracking-wide text-[#1D4ED8] tabular-nums">
                Módulo A.1 · Problemas y soluciones
              </span>
              <h3 className="font-display mt-1 text-xl font-bold tracking-tight text-[#0F172A] sm:text-2xl">
                A.1 Cuadro de habilidades técnicas para atender el caso de estudio
              </h3>
              <p className="mt-1.5 max-w-2xl text-xs leading-relaxed text-slate-600 sm:text-sm">
                Aquí vemos cada problema que tienen las computadoras de la
                empresa, qué se necesita saber para arreglarlo y qué guía o
                norma conocida respalda esa solución.
              </p>
            </div>
          </div>

          <div className="grid shrink-0 grid-cols-2 gap-3 sm:w-auto">
            <div className="rounded-2xl border border-[#1D4ED8]/20 bg-[#EFF6FF]/85 px-4 py-3 text-center">
              <p className="font-mono text-2xl font-bold text-[#1D4ED8] tabular-nums">
                10
              </p>
              <p className="mt-0.5 text-[11px] font-semibold text-slate-600">
                problemas críticos
              </p>
            </div>
            <div className="rounded-2xl border border-[#0D9488]/25 bg-[#F0FDFA]/90 px-4 py-3 text-center">
              <p className="font-mono text-2xl font-bold text-[#0F766E] tabular-nums">
                4
              </p>
              <p className="mt-0.5 text-[11px] font-semibold text-slate-600">
                marcos teóricos
              </p>
            </div>
          </div>
        </div>

        {/* Barra de filtro por marco teórico */}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs font-medium text-slate-500">
            Filtrar por guía (haz clic en cualquier etiqueta azul, verde o naranja para leer más):
          </p>
          <div className="flex flex-wrap items-center gap-1.5">
            {A1_FILTERS.map((f) => {
              const isActive = frameworkFilter === f.key;
              return (
                <button
                  key={f.key}
                  type="button"
                  onClick={() => setFrameworkFilter(f.key)}
                  className={`cursor-pointer rounded-full border px-3 py-1.5 text-xs font-semibold transition-all whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'border-[#1D4ED8] bg-gradient-to-r from-[#1D4ED8] to-[#0D9488] text-white shadow-sm'
                      : 'border-stone-200 bg-[#FAF8F3] text-slate-600 hover:border-[#1D4ED8]/40 hover:text-[#1D4ED8]'
                  }`}
                >
                  {f.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tabla responsiva estilizada con encabezado degradado azul cobalto a turquesa */}
        <div className="mt-5 overflow-hidden rounded-2xl border border-stone-200/90 shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[860px] border-collapse text-left">
              <thead>
                <tr className="bg-gradient-to-r from-[#1D4ED8] via-[#1E40AF] to-[#0D9488] text-white">
                  <th
                    scope="col"
                    className="px-4 py-3.5 text-xs font-bold tracking-wide"
                  >
                    Problema del caso
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3.5 text-xs font-bold tracking-wide"
                  >
                    Habilidad técnica necesaria
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3.5 text-xs font-bold tracking-wide"
                  >
                    ¿Por qué se necesita?
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
                  {filteredProblems.map((row) => {
                    const RowIcon = row.icon;
                    return (
                      <motion.tr
                        key={row.id}
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.16 }}
                        className="group transition-colors hover:bg-[#FAF8F3]/90"
                      >
                        {/* Columna 1: Problema del caso con badge circular numerado e ícono */}
                        <td className="w-[26%] px-4 py-4 align-top">
                          <div className="flex items-start gap-3">
                            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#1D4ED8] to-[#0D9488] font-mono text-[11px] font-bold text-white tabular-nums shadow-xs">
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
                                {row.problema}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* Columna 2: Habilidad técnica necesaria */}
                        <td className="w-[24%] px-4 py-4 align-top">
                          <p className="text-xs font-semibold leading-relaxed text-[#1E3A8A] sm:text-[13px]">
                            {row.habilidad}
                          </p>
                        </td>

                        {/* Columna 3: ¿Por qué se necesita? */}
                        <td className="w-[29%] px-4 py-4 align-top">
                          <p className="text-xs leading-relaxed text-slate-600 sm:text-[13px]">
                            {row.justificacion}
                          </p>
                        </td>

                        {/* Columna 4: Marco teórico (Enlace real cliqueable con ExternalLink) */}
                        <td className="w-[21%] px-4 py-4 align-top">
                          <a
                            href={row.marcoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            title={`Leer más sobre ${row.marco}`}
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

const A2_FILTERS: { key: TeamMemberFilter; label: string }[] = [
  { key: 'todos', label: 'Todos (8)' },
  { key: 'Samuel Tovar', label: 'Samuel Tovar (4)' },
  { key: 'Carlos Mendoza', label: 'Carlos Mendoza (4)' },
];

export function ModuloA2EquipoTrabajo() {
  const [memberFilter, setMemberFilter] = useState<TeamMemberFilter>('todos');

  const filteredTeamSkills = useMemo(() => {
    if (memberFilter === 'todos') return TEAM_SKILLS_DATA;
    return TEAM_SKILLS_DATA.filter(
      (item) => item.integranteKey === memberFilter
    );
  }, [memberFilter]);

  return (
    <div className="rounded-3xl bg-gradient-to-br from-[#0D9488]/45 via-[#1D4ED8]/30 to-[#D97706]/35 p-[1.5px] shadow-md">
      <div className="overflow-hidden rounded-[calc(1.5rem-1.5px)] bg-white/95 p-5 backdrop-blur-md sm:p-8">
        {/* Encabezado del Módulo A.2 con SVG + Tarjetas de resumen */}
        <div className="flex flex-col justify-between gap-6 border-b border-stone-200/80 pb-6 lg:flex-row lg:items-center">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <IsometricTeamMiniSvg />
            <div>
              <span className="font-mono text-xs font-bold tracking-wide text-[#0F766E] tabular-nums">
                Módulo A.2 · Lo que sabe hacer el equipo
              </span>
              <h3 className="font-display mt-1 text-xl font-bold tracking-tight text-[#0F172A] sm:text-2xl">
                A.2 Cuadro de habilidades técnicas del equipo de trabajo
              </h3>
              <p className="mt-1.5 max-w-2xl text-xs leading-relaxed text-slate-600 sm:text-sm">
                Las habilidades reales que dominamos en el equipo para ayudar con
                las computadoras y el sistema, junto con la prueba de cada una.
              </p>
            </div>
          </div>

          <div className="grid shrink-0 grid-cols-2 gap-3 sm:w-auto">
            <div className="rounded-2xl border border-[#1D4ED8]/20 bg-[#EFF6FF]/85 px-4 py-3 text-center">
              <p className="font-mono text-2xl font-bold text-[#1D4ED8] tabular-nums">
                2
              </p>
              <p className="mt-0.5 text-[11px] font-semibold text-slate-600">
                especialistas TI
              </p>
            </div>
            <div className="rounded-2xl border border-[#D97706]/25 bg-[#FFFBEB]/90 px-4 py-3 text-center">
              <p className="font-mono text-2xl font-bold text-[#B45309] tabular-nums">
                8
              </p>
              <p className="mt-0.5 text-[11px] font-semibold text-slate-600">
                competencias verificadas
              </p>
            </div>
          </div>
        </div>

        {/* Barra de filtro rápido arriba de A.2 */}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-stone-200/80 bg-[#FAF8F3]/90 px-4 py-3">
          <span className="text-xs font-semibold text-[#0F172A]">
            Ver habilidades según la persona:
          </span>

          <div className="flex flex-wrap items-center gap-2">
            {A2_FILTERS.map((filter) => {
              const isActive = memberFilter === filter.key;
              return (
                <button
                  key={filter.key}
                  type="button"
                  onClick={() => setMemberFilter(filter.key)}
                  aria-pressed={isActive}
                  className={`inline-flex cursor-pointer items-center gap-2 rounded-xl border px-3.5 py-2 text-xs font-semibold transition-all whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'border-[#0F766E] bg-gradient-to-r from-[#1D4ED8] to-[#0D9488] text-white shadow-sm'
                      : 'border-stone-200 bg-white text-slate-700 hover:border-[#0D9488]/50 hover:text-[#0F766E]'
                  }`}
                >
                  {filter.key === 'Samuel Tovar' && (
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#1D4ED8] font-mono text-[10px] font-bold text-white">
                      ST
                    </span>
                  )}
                  {filter.key === 'Carlos Mendoza' && (
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#0F766E] font-mono text-[10px] font-bold text-white">
                      CM
                    </span>
                  )}
                  <span>{filter.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tabla responsiva de 3 columnas obligatorias */}
        <div className="mt-5 overflow-hidden rounded-2xl border border-stone-200/90 shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[780px] border-collapse text-left">
              <thead>
                <tr className="bg-gradient-to-r from-[#1D4ED8] via-[#0F766E] to-[#0D9488] text-white">
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
                    Habilidad técnica que domina
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3.5 text-xs font-bold tracking-wide"
                  >
                    Evidencia
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200/80 bg-white">
                <AnimatePresence mode="popLayout">
                  {filteredTeamSkills.map((row) => {
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
                        className="group transition-colors hover:bg-[#FAF8F3]/90"
                      >
                        {/* Columna 1: Nombre del integrante con Avatar estilizado */}
                        <td className="w-[24%] px-4 py-4 align-middle">
                          <div className="flex items-center gap-3">
                            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-stone-100 font-mono text-[11px] font-bold text-slate-600 tabular-nums">
                              {String(row.id).padStart(2, '0')}
                            </span>
                            <div
                              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-mono text-xs font-bold text-white shadow-sm ${
                                isSamuel
                                  ? 'bg-gradient-to-br from-[#2563EB] to-[#1E3A8A]'
                                  : 'bg-gradient-to-br from-[#14B8A6] to-[#0F766E]'
                              }`}
                            >
                              {row.iniciales}
                            </div>
                            <div>
                              <p className="text-xs font-bold text-[#0F172A] sm:text-sm">
                                {row.integrante}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Columna 2: Habilidad técnica que domina */}
                        <td className="w-[38%] px-4 py-4 align-middle">
                          <div className="flex items-start gap-2.5">
                            <span
                              className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${
                                isSamuel
                                  ? 'bg-[#1D4ED8]/10 text-[#1D4ED8]'
                                  : 'bg-[#0D9488]/12 text-[#0F766E]'
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

                        {/* Columna 3: Evidencia en tarjeta visual destacada con CheckCircle2 */}
                        <td className="w-[38%] px-4 py-4 align-middle">
                          <div className="flex items-start gap-2.5 rounded-xl border border-emerald-200/80 bg-gradient-to-r from-emerald-50/90 to-teal-50/70 px-3.5 py-2.5 shadow-xs">
                            <CheckCircle2
                              className="mt-0.5 h-4 w-4 shrink-0 text-[#059669]"
                              aria-hidden="true"
                            />
                            <p className="text-xs leading-relaxed text-slate-700">
                              {row.evidencia}
                            </p>
                          </div>
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
