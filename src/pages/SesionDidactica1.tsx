import { useState } from 'react';
import {
  ArrowLeft,
  ChevronRight,
  Cpu,
  HardDrive,
  Headphones,
  HeartHandshake,
  MessageSquareHeart,
  Network,
  ShieldCheck,
  Users,
  Wrench,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import {
  ModuloB1SituacionActual,
  ModuloB2EquipoTrabajo,
} from '../components/BlandasModulos';
import {
  ModuloA1CasoEstudio,
  ModuloA2EquipoTrabajo,
} from '../components/TecnicasModulos';

export interface SesionDidacticaProps {
  onBack?: () => void;
}

type SkillTab = 'tecnicas' | 'blandas';

interface ContextTip {
  id: string;
  title: string;
  summary: string;
  actionNote: string;
  icon: typeof Cpu;
  glowClass: string;
  iconBgClass: string;
  accentText: string;
  ringColor: string;
}

const TECHNICAL_TIPS: ContextTip[] = [
  {
    id: 'diagnostico-hardware',
    title: 'Diagnóstico de los 18 equipos críticos',
    summary:
      'Evaluar placa base, módulos RAM, discos mecánicos fatigados y fuentes de poder antes de emitir un dictamen técnico.',
    actionNote:
      'Prioriza la recuperación de datos de los asesores turísticos antes de intervenir o reasignar estaciones.',
    icon: HardDrive,
    glowClass: 'shadow-[0_10px_28px_-6px_rgba(29,78,216,0.45)]',
    iconBgClass:
      'bg-gradient-to-br from-[#2563EB] to-[#1E3A8A] text-white border border-blue-300/40',
    accentText: 'text-[#1D4ED8]',
    ringColor: 'hover:border-[#1D4ED8]/50',
  },
  {
    id: 'soporte-remoto',
    title: 'Soporte remoto a 3 sucursales',
    summary:
      'Administrar mesas de ayuda GLPI y conexiones AnyDesk para asistir a Bolívar, Mérida y Margarita sin detener operaciones.',
    actionNote:
      'Estandariza guías de verificación de red local para resolver fallas de conectividad en menos de 15 minutos.',
    icon: Network,
    glowClass: 'shadow-[0_10px_28px_-6px_rgba(13,148,136,0.45)]',
    iconBgClass:
      'bg-gradient-to-br from-[#14B8A6] to-[#0F766E] text-white border border-teal-200/40',
    accentText: 'text-[#0F766E]',
    ringColor: 'hover:border-[#0D9488]/50',
  },
  {
    id: 'despliegue-convenio',
    title: 'Control de software y convenio',
    summary:
      'Definir imágenes del sistema operativo, permisos de usuario y plan de migración para la nueva dotación tecnológica.',
    actionNote:
      'Evita actualizaciones empíricas de los usuarios aplicando perfiles restringidos y bitácoras de inventario.',
    icon: ShieldCheck,
    glowClass: 'shadow-[0_10px_28px_-6px_rgba(217,119,6,0.45)]',
    iconBgClass:
      'bg-gradient-to-br from-[#F59E0B] to-[#B45309] text-white border border-amber-200/40',
    accentText: 'text-[#B45309]',
    ringColor: 'hover:border-[#D97706]/50',
  },
];

const SOFT_TIPS: ContextTip[] = [
  {
    id: 'empatia-frustracion',
    title: 'Empatía ante la frustración laboral',
    summary:
      'Escuchar con paciencia y validar el malestar de trabajadores afectados por equipos obsoletos e interrupciones frecuentes.',
    actionNote:
      'Transforma cada reporte en una oportunidad de confianza explicando tiempos reales y soluciones temporales.',
    icon: HeartHandshake,
    glowClass: 'shadow-[0_10px_28px_-6px_rgba(13,148,136,0.45)]',
    iconBgClass:
      'bg-gradient-to-br from-[#14B8A6] to-[#0F766E] text-white border border-teal-200/40',
    accentText: 'text-[#0F766E]',
    ringColor: 'hover:border-[#0D9488]/50',
  },
  {
    id: 'comunicacion-asertiva',
    title: 'Comunicación clara sin tecnicismos',
    summary:
      'Guiar por teléfono o videoconferencia al personal de las regiones usando instrucciones sencillas, amables y verificables.',
    actionNote:
      'Confirma que el usuario comprendió cada paso para evitar bloqueos y reducir la sensación de abandono remoto.',
    icon: Headphones,
    glowClass: 'shadow-[0_10px_28px_-6px_rgba(29,78,216,0.45)]',
    iconBgClass:
      'bg-gradient-to-br from-[#2563EB] to-[#1E3A8A] text-white border border-blue-300/40',
    accentText: 'text-[#1D4ED8]',
    ringColor: 'hover:border-[#1D4ED8]/50',
  },
  {
    id: 'gestion-cambio',
    title: 'Liderazgo y gestión del cambio',
    summary:
      'Alinear a Gerencia General, la empresa proveedora del convenio y los 48 trabajadores frente a los nuevos protocolos STU.',
    actionNote:
      'Fomenta la colaboración para que quienes improvisaron parches adopten canales formales de soporte.',
    icon: Users,
    glowClass: 'shadow-[0_10px_28px_-6px_rgba(217,119,6,0.45)]',
    iconBgClass:
      'bg-gradient-to-br from-[#F59E0B] to-[#B45309] text-white border border-amber-200/40',
    accentText: 'text-[#B45309]',
    ringColor: 'hover:border-[#D97706]/50',
  },
];

export default function SesionDidactica1({ onBack }: SesionDidacticaProps) {
  const [activeTab, setActiveTab] = useState<SkillTab>('tecnicas');
  const [selectedTipId, setSelectedTipId] = useState<string | null>(
    'diagnostico-hardware'
  );
  const [tecnicasImgError, setTecnicasImgError] = useState(false);
  const [blandasImgError, setBlandasImgError] = useState(false);

  const handleTabChange = (nextTab: SkillTab) => {
    setActiveTab(nextTab);
    setSelectedTipId(
      nextTab === 'tecnicas' ? 'diagnostico-hardware' : 'empatia-frustracion'
    );
  };

  return (
    <div className="relative overflow-hidden">
      {/* Fondo sutil con micropatrón técnico y líneas de circuito */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage:
            'radial-gradient(circle at 12% 8%, rgba(29, 78, 216, 0.08) 0%, transparent 38%), radial-gradient(circle at 88% 18%, rgba(13, 148, 136, 0.09) 0%, transparent 36%), radial-gradient(circle at 50% 85%, rgba(217, 119, 6, 0.06) 0%, transparent 40%), radial-gradient(rgba(15, 23, 42, 0.06) 1px, transparent 1px)',
          backgroundSize: '100% 100%, 100% 100%, 100% 100%, 26px 26px',
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto max-w-[1200px] px-4 py-8 sm:px-8 sm:py-12"
      >
        {/* Botón superior con micro-interacción */}
        {onBack && (
          <div className="mb-6 flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={onBack}
              className="group inline-flex cursor-pointer items-center gap-2.5 rounded-xl border border-stone-200/90 bg-white/85 px-4 py-2.5 text-xs font-semibold text-[#0F172A] shadow-sm backdrop-blur-md transition-all duration-150 hover:-translate-x-0.5 hover:border-[#1D4ED8]/50 hover:text-[#1D4ED8] hover:shadow-[0_8px_20px_-6px_rgba(29,78,216,0.28)] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8] whitespace-nowrap shrink-0"
            >
              <ArrowLeft
                className="h-4 w-4 transition-transform duration-150 group-hover:-translate-x-0.5"
                aria-hidden="true"
              />
              <span>Volver a Inicio</span>
            </button>

            <span className="hidden text-xs font-medium text-slate-500 sm:inline">
              Organización «Aventura en los paisajes» · Unidad STU
            </span>
          </div>
        )}

        {/* 1. Encabezado de la Sesión con borde degradado y trazos de circuito */}
        <section
          aria-labelledby="sesion1-heading"
          className="rounded-3xl bg-gradient-to-br from-[#1D4ED8]/40 via-[#0D9488]/35 to-[#D97706]/40 p-[1.5px] shadow-lg"
        >
          <div className="relative overflow-hidden rounded-[calc(1.5rem-1.5px)] bg-white/90 p-6 backdrop-blur-xl sm:p-10">
            {/* Líneas decorativas de circuito SVG en el fondo del encabezado */}
            <svg
              aria-hidden="true"
              viewBox="0 0 800 260"
              fill="none"
              className="pointer-events-none absolute top-0 right-0 h-full w-full opacity-[0.14]"
              preserveAspectRatio="xMidYMid slice"
            >
              <path
                d="M520 20H640L675 55H780"
                stroke="#1D4ED8"
                strokeWidth="1.5"
              />
              <path
                d="M480 85H610L645 120H760"
                stroke="#0D9488"
                strokeWidth="1.5"
              />
              <path
                d="M560 190H665L695 160H790"
                stroke="#D97706"
                strokeWidth="1.5"
              />
              <circle cx="520" cy="20" r="4" fill="#1D4ED8" />
              <circle cx="780" cy="55" r="4" fill="#1D4ED8" />
              <circle cx="480" cy="85" r="4" fill="#0D9488" />
              <circle cx="760" cy="120" r="4" fill="#0D9488" />
              <circle cx="560" cy="190" r="4" fill="#D97706" />
            </svg>

            <div className="relative z-10 grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12">
              <div className="flex flex-col justify-between lg:col-span-7">
                <div>
                  <p className="text-xs font-semibold text-[#0F766E]">
                    Sesión didáctica 01 · Servicio de Soporte Técnico al Usuario
                  </p>
                  <h1
                    id="sesion1-heading"
                    className="font-display mt-2.5 text-3xl font-bold tracking-tight text-[#0F172A] text-balance sm:text-4xl lg:text-[2.5rem] lg:leading-[1.1]"
                  >
                    Sesión Didáctica 1: El STU y las Habilidades Técnicas y Blandas
                  </h1>

                  <p className="mt-5 max-w-2xl text-[15px] leading-[1.75] text-slate-600 sm:text-base">
                    En la Organización de Turismo Nacional{' '}
                    <strong className="font-semibold text-[#0F172A]">
                      «Aventura en los paisajes»
                    </strong>
                    , el Departamento de Tecnología —integrado por un Ingeniero
                    en Sistemas y un Técnico en Informática— respalda a 48
                    trabajadores y 40 equipos distribuidos en 4 sedes. Un STU
                    efectivo combina precisión técnica con trato humano y
                    comunicación empática.
                  </p>
                </div>

                <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-stone-200/80 pt-5 text-xs text-slate-600">
                  <span>
                    <strong className="font-semibold text-[#1D4ED8]">
                      Módulo A:
                    </strong>{' '}
                    Habilidades Técnicas
                  </span>
                  <span aria-hidden="true" className="text-stone-300">
                    ·
                  </span>
                  <span>
                    <strong className="font-semibold text-[#0F766E]">
                      Módulo B:
                    </strong>{' '}
                    Habilidades Blandas
                  </span>
                  <span aria-hidden="true" className="text-stone-300">
                    ·
                  </span>
                  <span>
                    <strong className="font-mono text-[#B45309] tabular-nums">
                      04
                    </strong>{' '}
                    Tableros de trabajo
                  </span>
                </div>
              </div>

              {/* Panel táctico de resumen STU con indicadores 3D con brillo */}
              <div className="lg:col-span-5">
                <div className="flex h-full flex-col justify-between rounded-2xl border border-stone-200/90 bg-[#FAF8F3]/90 p-5 backdrop-blur-md sm:p-6">
                  <div className="flex items-center justify-between border-b border-stone-200/80 pb-3.5">
                    <span className="font-display text-sm font-bold text-[#0F172A]">
                      Arquitectura del Soporte STU
                    </span>
                    <span className="font-mono text-xs font-semibold text-[#1D4ED8] tabular-nums">
                      4 Sedes · 2 Especialistas
                    </span>
                  </div>

                  <div className="my-5 grid grid-cols-1 gap-3.5">
                    <button
                      type="button"
                      onClick={() => handleTabChange('tecnicas')}
                      className={`group flex cursor-pointer items-center justify-between gap-3 rounded-xl border p-3.5 text-left transition-all duration-150 ${
                        activeTab === 'tecnicas'
                          ? 'border-[#1D4ED8]/45 bg-white shadow-[0_10px_25px_-8px_rgba(29,78,216,0.28)]'
                          : 'border-stone-200/80 bg-white/70 hover:border-[#1D4ED8]/35 hover:bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#2563EB] to-[#1E3A8A] text-white shadow-[0_8px_20px_-4px_rgba(29,78,216,0.55)]">
                          <Cpu className="h-5 w-5" aria-hidden="true" />
                        </div>
                        <div>
                          <p className="font-display text-sm font-bold text-[#0F172A]">
                            Pilar 01 · Habilidades Técnicas
                          </p>
                          <p className="mt-0.5 text-xs text-slate-500">
                            Hardware, diagnóstico, redes y soporte GLPI
                          </p>
                        </div>
                      </div>
                      <ChevronRight
                        className="h-4 w-4 shrink-0 text-slate-400 transition-transform group-hover:translate-x-0.5 group-hover:text-[#1D4ED8]"
                        aria-hidden="true"
                      />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleTabChange('blandas')}
                      className={`group flex cursor-pointer items-center justify-between gap-3 rounded-xl border p-3.5 text-left transition-all duration-150 ${
                        activeTab === 'blandas'
                          ? 'border-[#0D9488]/50 bg-white shadow-[0_10px_25px_-8px_rgba(13,148,136,0.28)]'
                          : 'border-stone-200/80 bg-white/70 hover:border-[#0D9488]/35 hover:bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#14B8A6] to-[#0F766E] text-white shadow-[0_8px_20px_-4px_rgba(13,148,136,0.55)]">
                          <MessageSquareHeart
                            className="h-5 w-5"
                            aria-hidden="true"
                          />
                        </div>
                        <div>
                          <p className="font-display text-sm font-bold text-[#0F172A]">
                            Pilar 02 · Habilidades Blandas
                          </p>
                          <p className="mt-0.5 text-xs text-slate-500">
                            Empatía, escucha activa y comunicación asertiva
                          </p>
                        </div>
                      </div>
                      <ChevronRight
                        className="h-4 w-4 shrink-0 text-slate-400 transition-transform group-hover:translate-x-0.5 group-hover:text-[#0F766E]"
                        aria-hidden="true"
                      />
                    </button>
                  </div>

                  <div className="grid grid-cols-3 gap-2 border-t border-stone-200/80 pt-3.5 text-center">
                    <div>
                      <p className="font-mono text-base font-bold text-[#1D4ED8] tabular-nums">
                        40
                      </p>
                      <p className="text-[11px] text-slate-500">Equipos</p>
                    </div>
                    <div>
                      <p className="font-mono text-base font-bold text-[#B45309] tabular-nums">
                        18
                      </p>
                      <p className="text-[11px] text-slate-500">Críticos</p>
                    </div>
                    <div>
                      <p className="font-mono text-base font-bold text-[#0F766E] tabular-nums">
                        48
                      </p>
                      <p className="text-[11px] text-slate-500">Usuarios</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Selector de Pestañas estilo Control de Mando */}
        <section aria-label="Control de mando de habilidades" className="mt-10">
          <div className="rounded-3xl bg-gradient-to-r from-[#1D4ED8]/30 via-[#0D9488]/25 to-[#D97706]/30 p-[1.5px] shadow-md">
            <div
              role="tablist"
              aria-label="Categorías de habilidades del STU"
              className="grid grid-cols-1 gap-2 rounded-[calc(1.5rem-1.5px)] bg-white/85 p-2 backdrop-blur-xl sm:grid-cols-2"
            >
              <button
                type="button"
                role="tab"
                id="tab-tecnicas"
                aria-selected={activeTab === 'tecnicas'}
                aria-controls="panel-tecnicas"
                onClick={() => handleTabChange('tecnicas')}
                className={`group relative flex cursor-pointer items-center justify-between gap-3 rounded-2xl px-6 py-4 text-left transition-all duration-200 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8] ${
                  activeTab === 'tecnicas'
                    ? 'text-white'
                    : 'text-slate-600 hover:bg-stone-100/80 hover:text-[#0F172A]'
                }`}
              >
                {activeTab === 'tecnicas' && (
                  <motion.span
                    layoutId="sesion1-command-tab"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                    className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#1D4ED8] via-[#1E40AF] to-[#0F766E] shadow-[0_12px_28px_-6px_rgba(29,78,216,0.55)]"
                  />
                )}
                <div className="relative z-10 flex items-center gap-3.5">
                  <span
                    className={`flex h-10 w-10 items-center justify-center rounded-xl transition-all ${
                      activeTab === 'tecnicas'
                        ? 'bg-white/20 text-white shadow-[0_0_16px_rgba(255,255,255,0.35)] animate-pulse'
                        : 'bg-[#1D4ED8]/10 text-[#1D4ED8] group-hover:scale-105'
                    }`}
                  >
                    <Wrench className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <span className="font-display block text-base font-bold tracking-tight">
                      Habilidades Técnicas
                    </span>
                    <span
                      className={`block text-xs ${
                        activeTab === 'tecnicas'
                          ? 'text-blue-100'
                          : 'text-slate-500'
                      }`}
                    >
                      Hardware, diagnóstico, redes y GLPI
                    </span>
                  </div>
                </div>
                <span
                  className={`relative z-10 font-mono text-xs font-bold tabular-nums ${
                    activeTab === 'tecnicas'
                      ? 'text-amber-200'
                      : 'text-slate-400'
                  }`}
                >
                  A.1 – A.2
                </span>
              </button>

              <button
                type="button"
                role="tab"
                id="tab-blandas"
                aria-selected={activeTab === 'blandas'}
                aria-controls="panel-blandas"
                onClick={() => handleTabChange('blandas')}
                className={`group relative flex cursor-pointer items-center justify-between gap-3 rounded-2xl px-6 py-4 text-left transition-all duration-200 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F766E] ${
                  activeTab === 'blandas'
                    ? 'text-white'
                    : 'text-slate-600 hover:bg-stone-100/80 hover:text-[#0F172A]'
                }`}
              >
                {activeTab === 'blandas' && (
                  <motion.span
                    layoutId="sesion1-command-tab"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                    className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#0F766E] via-[#0D9488] to-[#D97706] shadow-[0_12px_28px_-6px_rgba(13,148,136,0.55)]"
                  />
                )}
                <div className="relative z-10 flex items-center gap-3.5">
                  <span
                    className={`flex h-10 w-10 items-center justify-center rounded-xl transition-all ${
                      activeTab === 'blandas'
                        ? 'bg-white/20 text-white shadow-[0_0_16px_rgba(255,255,255,0.35)] animate-pulse'
                        : 'bg-[#0D9488]/10 text-[#0F766E] group-hover:scale-105'
                    }`}
                  >
                    <MessageSquareHeart
                      className="h-5 w-5"
                      aria-hidden="true"
                    />
                  </span>
                  <div>
                    <span className="font-display block text-base font-bold tracking-tight">
                      Habilidades Blandas
                    </span>
                    <span
                      className={`block text-xs ${
                        activeTab === 'blandas'
                          ? 'text-teal-50'
                          : 'text-slate-500'
                      }`}
                    >
                      Empatía, mediación y atención humana
                    </span>
                  </div>
                </div>
                <span
                  className={`relative z-10 font-mono text-xs font-bold tabular-nums ${
                    activeTab === 'blandas'
                      ? 'text-amber-100'
                      : 'text-slate-400'
                  }`}
                >
                  B.1 – B.2
                </span>
              </button>
            </div>
          </div>

          {/* 3. Contenido de cada pestaña con imagen .png realista 3D, tips técnicos y tableros reservados */}
          <div className="mt-6 rounded-3xl border border-stone-200/90 bg-white/85 p-6 shadow-sm backdrop-blur-xl sm:p-10">
            <AnimatePresence mode="wait">
              {activeTab === 'tecnicas' ? (
                <motion.div
                  key="panel-tecnicas"
                  role="tabpanel"
                  id="panel-tecnicas"
                  aria-labelledby="tab-tecnicas"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  className="min-h-[500px]"
                >
                  {/* Contenedor visual grande con imagen /tecnicas.png */}
                  <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
                    <div className="lg:col-span-5">
                      <p className="text-xs font-semibold text-[#1D4ED8]">
                        Dimensión operativa · Ingeniería y mantenimiento
                      </p>
                      <h2 className="font-display mt-2 text-2xl font-bold tracking-tight text-[#0F172A] sm:text-3xl">
                        Habilidades Técnicas (Hard Skills)
                      </h2>
                      <p className="mt-3.5 text-sm leading-relaxed text-slate-600 sm:text-[15px]">
                        Engloban los conocimientos especializados en diagnóstico
                        de placas base, recuperación de equipos lentos, redes
                        locales, sistemas operativos y gestión de incidencias
                        para sostener las 4 sedes de «Aventura en los paisajes».
                      </p>
                    </div>

                    <div className="lg:col-span-7">
                      <div className="rounded-3xl bg-gradient-to-br from-[#1D4ED8]/45 via-[#0D9488]/30 to-[#D97706]/35 p-[2px] shadow-2xl">
                        <div className="relative overflow-hidden rounded-[calc(1.5rem-2px)] bg-[#0F172A]">
                          {!tecnicasImgError ? (
                            <img
                              src="/tecnicas.png"
                              alt="Técnico de soporte trabajando en diagnóstico de hardware, herramientas y redes"
                              referrerPolicy="no-referrer"
                              onError={() => setTecnicasImgError(true)}
                              className="h-64 w-full object-cover transition-transform duration-500 ease-out hover:scale-[1.02] sm:h-80 lg:h-[340px]"
                            />
                          ) : (
                            <div className="flex h-64 w-full flex-col items-center justify-center bg-gradient-to-br from-[#1E3A8A] via-[#1D4ED8] to-[#0F766E] p-8 text-center text-white sm:h-80 lg:h-[340px]">
                              <Cpu
                                className="h-10 w-10 text-amber-200"
                                aria-hidden="true"
                              />
                              <p className="font-display mt-3 text-lg font-bold">
                                Entorno de Hardware y Diagnóstico STU
                              </p>
                              <p className="mt-1 text-xs text-blue-100">
                                Recurso local: /tecnicas.png
                              </p>
                            </div>
                          )}

                          <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0F172A]/90 via-[#0F172A]/45 to-transparent px-6 pt-14 pb-5">
                            <p className="text-xs font-medium text-amber-300">
                              Laboratorio de diagnóstico · Sede Central
                            </p>
                            <p className="font-display mt-0.5 text-base font-semibold text-white">
                              Hardware, redes y soporte técnico especializado
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Tarjetas interactivas de contexto / tips técnicos */}
                  <div className="mt-10 border-t border-stone-200/80 pt-8">
                    <div className="mb-5 flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
                      <div>
                        <p className="text-xs font-semibold text-[#0F766E]">
                          Claves aplicadas al caso de estudio
                        </p>
                        <h3 className="font-display mt-1 text-lg font-bold text-[#0F172A]">
                          ¿Por qué son decisivas estas habilidades técnicas?
                        </h3>
                      </div>
                      <span className="text-xs text-slate-500">
                        Selecciona una tarjeta para ver la recomendación práctica
                      </span>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                      {TECHNICAL_TIPS.map((tip) => {
                        const TipIcon = tip.icon;
                        const isSelected = selectedTipId === tip.id;

                        return (
                          <button
                            key={tip.id}
                            type="button"
                            onClick={() =>
                              setSelectedTipId(isSelected ? null : tip.id)
                            }
                            aria-expanded={isSelected}
                            className={`group flex cursor-pointer flex-col justify-between rounded-2xl border bg-white/95 p-5 text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${
                              isSelected
                                ? 'border-[#1D4ED8]/50 shadow-md ring-1 ring-[#1D4ED8]/20'
                                : `border-stone-200/90 ${tip.ringColor}`
                            }`}
                          >
                            <div>
                              <div className="flex items-center justify-between gap-3">
                                <div
                                  className={`flex h-11 w-11 items-center justify-center rounded-xl transition-transform duration-200 group-hover:scale-105 ${tip.iconBgClass} ${tip.glowClass}`}
                                >
                                  <TipIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                </div>
                                <span
                                  className={`font-mono text-xs font-semibold ${tip.accentText}`}
                                >
                                  {isSelected ? 'Activo' : 'Tip técnico'}
                                </span>
                              </div>

                              <h4 className="font-display mt-4 text-base font-bold text-[#0F172A]">
                                {tip.title}
                              </h4>
                              <p className="mt-2 text-xs leading-relaxed text-slate-600">
                                {tip.summary}
                              </p>
                            </div>

                            {isSelected && (
                              <div className="mt-4 rounded-xl border border-stone-200/80 bg-[#FAF8F3] p-3 text-xs leading-relaxed text-slate-700">
                                <strong className={`font-semibold ${tip.accentText}`}>
                                  Acción clave:
                                </strong>{' '}
                                {tip.actionNote}
                              </div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Dos cuadros interactivos (A.1 y A.2) */}
                  <div className="mt-10 space-y-8">
                    <ModuloA1CasoEstudio />
                    <ModuloA2EquipoTrabajo />
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="panel-blandas"
                  role="tabpanel"
                  id="panel-blandas"
                  aria-labelledby="tab-blandas"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  className="min-h-[500px]"
                >
                  {/* Contenedor visual grande con imagen /blandas.png */}
                  <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
                    <div className="lg:col-span-5">
                      <p className="text-xs font-semibold text-[#0F766E]">
                        Dimensión humana · Servicio y colaboración
                      </p>
                      <h2 className="font-display mt-2 text-2xl font-bold tracking-tight text-[#0F172A] sm:text-3xl">
                        Habilidades Blandas (Soft Skills)
                      </h2>
                      <p className="mt-3.5 text-sm leading-relaxed text-slate-600 sm:text-[15px]">
                        Comprenden la inteligencia emocional, la empatía frente a
                        la frustración operativa, la comunicación asertiva con las
                        sucursales regionales y la capacidad de mediar ante cambios
                        tecnológicos sin generar fricciones.
                      </p>
                    </div>

                    <div className="lg:col-span-7">
                      <div className="rounded-3xl bg-gradient-to-br from-[#0D9488]/45 via-[#1D4ED8]/30 to-[#D97706]/40 p-[2px] shadow-2xl">
                        <div className="relative overflow-hidden rounded-[calc(1.5rem-2px)] bg-[#0F172A]">
                          {!blandasImgError ? (
                            <img
                              src="/blandas.png"
                              alt="Equipo de soporte técnico colaborando con empatía y comunicación efectiva"
                              referrerPolicy="no-referrer"
                              onError={() => setBlandasImgError(true)}
                              className="h-64 w-full object-cover transition-transform duration-500 ease-out hover:scale-[1.02] sm:h-80 lg:h-[340px]"
                            />
                          ) : (
                            <div className="flex h-64 w-full flex-col items-center justify-center bg-gradient-to-br from-[#0F766E] via-[#0D9488] to-[#B45309] p-8 text-center text-white sm:h-80 lg:h-[340px]">
                              <HeartHandshake
                                className="h-10 w-10 text-amber-200"
                                aria-hidden="true"
                              />
                              <p className="font-display mt-3 text-lg font-bold">
                                Comunicación, Empatía y Trabajo en Equipo
                              </p>
                              <p className="mt-1 text-xs text-teal-100">
                                Recurso local: /blandas.png
                              </p>
                            </div>
                          )}

                          <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0F172A]/90 via-[#0F172A]/45 to-transparent px-6 pt-14 pb-5">
                            <p className="text-xs font-medium text-amber-300">
                              Atención centrada en los 48 trabajadores
                            </p>
                            <p className="font-display mt-0.5 text-base font-semibold text-white">
                              Escucha activa, empatía y resolución colaborativa
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Tarjetas interactivas de contexto / tips interpersonales */}
                  <div className="mt-10 border-t border-stone-200/80 pt-8">
                    <div className="mb-5 flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
                      <div>
                        <p className="text-xs font-semibold text-[#B45309]">
                          Factor humano en el soporte TI
                        </p>
                        <h3 className="font-display mt-1 text-lg font-bold text-[#0F172A]">
                          ¿Por qué son decisivas estas habilidades blandas?
                        </h3>
                      </div>
                      <span className="text-xs text-slate-500">
                        Selecciona una tarjeta para ver la recomendación práctica
                      </span>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                      {SOFT_TIPS.map((tip) => {
                        const TipIcon = tip.icon;
                        const isSelected = selectedTipId === tip.id;

                        return (
                          <button
                            key={tip.id}
                            type="button"
                            onClick={() =>
                              setSelectedTipId(isSelected ? null : tip.id)
                            }
                            aria-expanded={isSelected}
                            className={`group flex cursor-pointer flex-col justify-between rounded-2xl border bg-white/95 p-5 text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${
                              isSelected
                                ? 'border-[#0D9488]/55 shadow-md ring-1 ring-[#0D9488]/20'
                                : `border-stone-200/90 ${tip.ringColor}`
                            }`}
                          >
                            <div>
                              <div className="flex items-center justify-between gap-3">
                                <div
                                  className={`flex h-11 w-11 items-center justify-center rounded-xl transition-transform duration-200 group-hover:scale-105 ${tip.iconBgClass} ${tip.glowClass}`}
                                >
                                  <TipIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                </div>
                                <span
                                  className={`font-mono text-xs font-semibold ${tip.accentText}`}
                                >
                                  {isSelected ? 'Activo' : 'Tip humano'}
                                </span>
                              </div>

                              <h4 className="font-display mt-4 text-base font-bold text-[#0F172A]">
                                {tip.title}
                              </h4>
                              <p className="mt-2 text-xs leading-relaxed text-slate-600">
                                {tip.summary}
                              </p>
                            </div>

                            {isSelected && (
                              <div className="mt-4 rounded-xl border border-stone-200/80 bg-[#FAF8F3] p-3 text-xs leading-relaxed text-slate-700">
                                <strong className={`font-semibold ${tip.accentText}`}>
                                  Acción clave:
                                </strong>{' '}
                                {tip.actionNote}
                              </div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Dos cuadros interactivos (B.1 y B.2) */}
                  <div className="mt-10 space-y-8">
                    <ModuloB1SituacionActual />
                    <ModuloB2EquipoTrabajo />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>
      </motion.div>
    </div>
  );
}
