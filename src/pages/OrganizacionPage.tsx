import { useState } from 'react';
import {
  Award,
  BriefcaseBusiness,
  Building2,
  Calculator,
  Compass,
  Cpu,
  Crown,
  Droplets,
  Eye,
  Headset,
  Landmark,
  MapPin,
  MountainSnow,
  Sun,
  Target,
  Users,
} from 'lucide-react';
import { motion } from 'motion/react';
import DiagnosticoTecnologico from '../components/DiagnosticoTecnologico';
import {
  ORGANIZATIONAL_LOCATIONS,
  ORGANIZATIONAL_UNITS,
  TOTAL_WORKERS,
  type OrganizationalUnit,
} from '../data/portfolioData';

const LOCATION_STYLES: Record<
  string,
  {
    icon: typeof MapPin;
    cardClass: string;
    iconBox: string;
    kickerClass: string;
    svgPath: string;
    svgColor: string;
  }
> = {
  'sede-central': {
    icon: Landmark,
    cardClass:
      'border-[#1D4ED8]/55 bg-gradient-to-br from-[#EFF6FF] via-white to-[#FAF8F3] shadow-md ring-1 ring-[#1D4ED8]/15',
    iconBox: 'bg-[#1D4ED8] text-white shadow-xs',
    kickerClass: 'text-[#1D4ED8]',
    svgPath: 'M0 32 L36 14 L72 24 L112 6 L160 26 L200 18 L200 44 L0 44 Z',
    svgColor: 'text-[#1D4ED8]/10',
  },
  'sucursal-guayana': {
    icon: Droplets,
    cardClass: 'border-stone-200 bg-white shadow-xs hover:border-[#0D9488]/45',
    iconBox: 'bg-[#0D9488]/12 text-[#0F766E]',
    kickerClass: 'text-[#0F766E]',
    svgPath: 'M0 24 Q40 8 80 22 T160 18 L200 28 L200 44 L0 44 Z',
    svgColor: 'text-[#0D9488]/10',
  },
  'sucursal-andes': {
    icon: MountainSnow,
    cardClass: 'border-stone-200 bg-white shadow-xs hover:border-[#4338CA]/40',
    iconBox: 'bg-[#4338CA]/10 text-[#3730A3]',
    kickerClass: 'text-[#3730A3]',
    svgPath: 'M0 36 L44 10 L86 28 L134 4 L176 26 L200 16 L200 44 L0 44 Z',
    svgColor: 'text-[#4338CA]/10',
  },
  'sucursal-insular': {
    icon: Sun,
    cardClass: 'border-stone-200 bg-white shadow-xs hover:border-[#D97706]/45',
    iconBox: 'bg-[#D97706]/12 text-[#B45309]',
    kickerClass: 'text-[#B45309]',
    svgPath: 'M0 28 Q35 18 70 28 T140 28 T200 26 L200 44 L0 44 Z',
    svgColor: 'text-[#D97706]/12',
  },
};

const UNIT_STYLES: Record<
  string,
  {
    icon: typeof Building2;
    iconBox: string;
    cardSurface: string;
    countBadge: string;
    accentText: string;
  }
> = {
  'gerencia-general': {
    icon: Crown,
    iconBox: 'bg-[#D97706]/12 text-[#B45309]',
    cardSurface:
      'border-[#D97706]/45 bg-gradient-to-b from-[#FFFBEB]/75 via-white to-white shadow-sm',
    countBadge: 'text-[#B45309]',
    accentText: 'text-[#B45309]',
  },
  tecnologia: {
    icon: Cpu,
    iconBox: 'bg-[#1D4ED8] text-white shadow-xs',
    cardSurface:
      'border-[#1D4ED8]/55 bg-gradient-to-b from-[#EFF6FF]/95 via-white to-white shadow-md ring-1 ring-[#1D4ED8]/15',
    countBadge: 'text-[#1D4ED8]',
    accentText: 'text-[#1D4ED8]',
  },
  'planificacion-turistica': {
    icon: Compass,
    iconBox: 'bg-[#0D9488]/12 text-[#0F766E]',
    cardSurface: 'border-stone-200 bg-white shadow-xs',
    countBadge: 'text-[#0F766E]',
    accentText: 'text-[#0F766E]',
  },
  'administracion-presupuesto': {
    icon: Calculator,
    iconBox: 'bg-[#4338CA]/10 text-[#3730A3]',
    cardSurface: 'border-stone-200 bg-white shadow-xs',
    countBadge: 'text-[#3730A3]',
    accentText: 'text-[#3730A3]',
  },
  'atencion-usuario-ventas': {
    icon: Headset,
    iconBox: 'bg-[#0D9488]/12 text-[#0F766E]',
    cardSurface: 'border-stone-200 bg-white shadow-xs',
    countBadge: 'text-[#0F766E]',
    accentText: 'text-[#0F766E]',
  },
};

function getUnitTotal(unit: OrganizationalUnit): number {
  return unit.roles.reduce((acc, r) => acc + r.count, 0);
}

export default function OrganizacionPage() {
  const [imageError, setImageError] = useState(false);

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
      className="mx-auto max-w-[1200px] px-4 py-10 sm:px-8 sm:py-14"
    >
      {/* Institutional intro split with architectural illustration */}
      <div className="grid grid-cols-1 items-stretch gap-8 border-b border-stone-200 pb-10 lg:grid-cols-12">
        <div className="flex flex-col justify-between lg:col-span-6">
          <div>
            <p className="text-xs font-semibold text-[#0F766E]">
              Estructura organizativa · Presencia nacional
            </p>
            <h1 className="font-display mt-2 text-center text-2xl font-bold tracking-tight text-[#0F172A] sm:text-3xl lg:text-[2.1rem] lg:leading-[1.2]">
              <span className="block">Organización de Turismo Nacional</span>
              <span className="mt-1 inline-block whitespace-nowrap bg-gradient-to-r from-[#0F766E] via-[#059669] to-[#D97706] bg-clip-text text-[clamp(1.25rem,2.35vw,2.1rem)] text-transparent">
                "Aventura En Los Paisajes"
              </span>
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base">
              Organización de Turismo Nacional{' '}
              <strong className="font-semibold text-[#0F172A]">
                «Aventura en los paisajes»
              </strong>
              . Distribución geográfica de nuestras cuatro sedes y conformación
              del talento humano en gerencia y departamentos.
            </p>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-stone-200/80 pt-5 text-xs text-slate-600">
            <span>
              <strong className="font-mono text-sm font-semibold text-[#1D4ED8] tabular-nums">
                04
              </strong>{' '}
              Sedes regionales
            </span>
            <span aria-hidden="true" className="text-stone-300">
              ·
            </span>
            <span>
              <strong className="font-mono text-sm font-semibold text-[#B45309] tabular-nums">
                01
              </strong>{' '}
              Gerencia General
            </span>
            <span aria-hidden="true" className="text-stone-300">
              ·
            </span>
            <span>
              <strong className="font-mono text-sm font-semibold text-[#0F766E] tabular-nums">
                04
              </strong>{' '}
              Departamentos
            </span>
            <span aria-hidden="true" className="text-stone-300">
              ·
            </span>
            <span>
              <strong className="font-mono text-sm font-semibold text-[#0F172A] tabular-nums">
                {TOTAL_WORKERS}
              </strong>{' '}
              Trabajadores
            </span>
          </div>

          <nav
            aria-label="Secciones de Organización"
            className="mt-4 flex flex-wrap items-center gap-2"
          >
            <a
              href="#sedes-organizacion"
              className="rounded-lg border border-stone-200 bg-white px-3 py-1.5 text-xs font-medium text-[#0F172A] transition-colors hover:border-[#0D9488] hover:text-[#0F766E] whitespace-nowrap shrink-0"
            >
              01. Sedes
            </a>
            <a
              href="#equipo-trabajo"
              className="rounded-lg border border-stone-200 bg-white px-3 py-1.5 text-xs font-medium text-[#0F172A] transition-colors hover:border-[#1D4ED8] hover:text-[#1D4ED8] whitespace-nowrap shrink-0"
            >
              02. Equipo de Trabajo
            </a>
            <a
              href="#diagnostico-tecnologico"
              className="rounded-lg border border-[#1D4ED8]/30 bg-[#EFF6FF] px-3 py-1.5 text-xs font-semibold text-[#1D4ED8] transition-colors hover:bg-[#1D4ED8] hover:text-white whitespace-nowrap shrink-0"
            >
              03. Diagnóstico Tecnológico
            </a>
          </nav>
        </div>

        <div className="lg:col-span-6">
          <div className="relative h-56 w-full overflow-hidden rounded-2xl border border-stone-200 bg-[#FAF8F3] shadow-xs sm:h-64 lg:h-full lg:min-h-[240px]">
            {!imageError ? (
              <img
                src="/organizacion.png"
                alt="Ilustración arquitectónica de sede principal y tres sucursales regionales"
                referrerPolicy="no-referrer"
                onError={() => setImageError(true)}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#0D9488]/15 to-[#D97706]/15 p-8">
                <Building2
                  className="h-10 w-10 text-[#0F766E]"
                  aria-hidden="true"
                />
              </div>
            )}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0F172A]/80 via-[#0F172A]/30 to-transparent px-5 pt-10 pb-4">
              <p className="text-xs font-medium text-amber-200">
                Red institucional venezolana
              </p>
              <p className="font-display text-sm font-semibold text-white">
                Caracas · Bolívar · Mérida · Nueva Esparta
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Identidad Corporativa: Misión, Visión y Valores */}
      <section
        id="identidad-corporativa"
        aria-labelledby="identidad-heading"
        className="mt-10 scroll-mt-24 sm:mt-12"
      >
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-semibold text-[#B45309]">
              Propósito y principios institucionales
            </p>
            <h2
              id="identidad-heading"
              className="font-display mt-1.5 text-2xl font-bold tracking-tight text-[#0F172A] sm:text-3xl"
            >
              Identidad Corporativa
            </h2>
          </div>
          <p className="text-sm text-slate-600">
            Misión, visión y valores que guían el turismo social venezolano.
          </p>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Misión */}
          <motion.article
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.24, delay: 0.03, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col rounded-2xl border border-stone-200 bg-white p-6 shadow-xs transition-transform duration-150 hover:-translate-y-0.5"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#0D9488]/12 text-[#0F766E]">
                <Target className="h-5 w-5" aria-hidden="true" />
              </div>
              <span className="font-mono text-xs font-semibold text-[#0F766E] tabular-nums">
                01
              </span>
            </div>

            <h3 className="font-display mt-5 text-xl font-bold tracking-tight text-[#0F172A]">
              Misión
            </h3>
            <p className="mt-3 text-sm leading-[1.7] text-slate-600">
              Diseñar, organizar y promover planes vacacionales y recreacionales
              accesibles para estudiantes de educación básica y universitaria,
              así como para los trabajadores de organismos públicos,
              garantizando el derecho al esparcimiento mientras estimulamos el
              turismo y la economía local en cada región de Venezuela.
            </p>
          </motion.article>

          {/* Visión */}
          <motion.article
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.24, delay: 0.07, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col rounded-2xl border border-stone-200 bg-white p-6 shadow-xs transition-transform duration-150 hover:-translate-y-0.5"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#1D4ED8]/10 text-[#1D4ED8]">
                <Eye className="h-5 w-5" aria-hidden="true" />
              </div>
              <span className="font-mono text-xs font-semibold text-[#1D4ED8] tabular-nums">
                02
              </span>
            </div>

            <h3 className="font-display mt-5 text-xl font-bold tracking-tight text-[#0F172A]">
              Visión
            </h3>
            <p className="mt-3 text-sm leading-[1.7] text-slate-600">
              Consolidarnos como la organización líder en turismo social a nivel
              nacional, reconocida por conectar de manera sostenible a las
              familias venezolanas con nuestros destinos emblemáticos,
              respaldada por una gestión moderna, eficiente y una atención
              cercana en todas nuestras sedes.
            </p>
          </motion.article>

          {/* Valores */}
          <motion.article
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.24, delay: 0.11, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col rounded-2xl border border-stone-200 bg-white p-6 shadow-xs transition-transform duration-150 hover:-translate-y-0.5"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#D97706]/12 text-[#B45309]">
                <Award className="h-5 w-5" aria-hidden="true" />
              </div>
              <span className="font-mono text-xs font-semibold text-[#B45309] tabular-nums">
                03
              </span>
            </div>

            <h3 className="font-display mt-5 text-xl font-bold tracking-tight text-[#0F172A]">
              Valores
            </h3>
            <ul className="mt-3 divide-y divide-stone-100 text-sm text-slate-600">
              <li className="py-2 first:pt-0">
                <strong className="font-semibold text-[#0F172A]">
                  Inclusión Social:
                </strong>{' '}
                Turismo económico y al alcance de todos.
              </li>
              <li className="py-2">
                <strong className="font-semibold text-[#0F172A]">
                  Compromiso Regional:
                </strong>{' '}
                Impulso directo a los servicios y comunidades locales.
              </li>
              <li className="py-2">
                <strong className="font-semibold text-[#0F172A]">
                  Calidad de Servicio:
                </strong>{' '}
                Atención empática, organizada y oportuna al usuario.
              </li>
              <li className="py-2 last:pb-0">
                <strong className="font-semibold text-[#0F172A]">
                  Sostenibilidad:
                </strong>{' '}
                Respeto y preservación de los paisajes naturales venezolanos.
              </li>
            </ul>
          </motion.article>
        </div>
      </section>

      {/* 1. Sección de Sedes: 4 tarjetas visuales */}
      <section
        id="sedes-organizacion"
        aria-labelledby="locations-heading"
        className="mt-12 scroll-mt-24 sm:mt-14"
      >
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-semibold text-[#0F766E]">
              Cobertura geográfica
            </p>
            <h2
              id="locations-heading"
              className="font-display mt-1.5 text-2xl font-bold tracking-tight text-[#0F172A] sm:text-3xl"
            >
              Sedes de la organización
            </h2>
          </div>
          <p className="text-sm text-slate-600">
            Sede principal de dos pisos y tres sucursales en el interior del país.
          </p>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {ORGANIZATIONAL_LOCATIONS.map((loc, idx) => {
            const style = LOCATION_STYLES[loc.id] ?? {
              icon: MapPin,
              cardClass: 'border-stone-200 bg-white shadow-xs',
              iconBox: 'bg-slate-100 text-[#0F172A]',
              kickerClass: 'text-slate-500',
              svgPath: 'M0 32 L200 32 L200 44 L0 44 Z',
              svgColor: 'text-slate-200/40',
            };
            const IconComponent = style.icon;

            return (
              <motion.article
                key={loc.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.24,
                  delay: 0.04 * idx,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`relative flex flex-col justify-between overflow-hidden rounded-2xl border p-5 transition-transform duration-150 hover:-translate-y-0.5 ${style.cardClass}`}
              >
                <div className="relative z-10">
                  <div className="flex items-start justify-between gap-3">
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${style.iconBox}`}
                    >
                      <IconComponent className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <span className="font-mono text-xs font-semibold text-slate-400 tabular-nums">
                      0{idx + 1}
                    </span>
                  </div>

                  <p
                    className={`mt-4 text-xs font-semibold ${style.kickerClass}`}
                  >
                    {loc.isHeadquarters
                      ? 'Sede Principal · Centro operativo'
                      : 'Sucursal Regional'}
                  </p>

                  <h3 className="font-display mt-1 text-lg font-bold tracking-tight text-[#0F172A]">
                    {loc.name}
                  </h3>

                  <div className="mt-2.5 flex items-start gap-1.5 text-sm font-medium text-slate-800">
                    <MapPin
                      className={`mt-0.5 h-4 w-4 shrink-0 ${style.kickerClass}`}
                      aria-hidden="true"
                    />
                    <span>{loc.region}</span>
                  </div>

                  <p className="mt-1.5 text-xs leading-relaxed text-slate-600">
                    {loc.landmark}
                  </p>
                </div>

                <div className="relative z-10 mt-5 border-t border-stone-200/70 pt-3">
                  <p className="text-xs text-slate-500">{loc.roleDetail}</p>
                </div>

                {/* Subtle regional landscape silhouette drawing */}
                <svg
                  aria-hidden="true"
                  viewBox="0 0 200 44"
                  preserveAspectRatio="none"
                  className={`pointer-events-none absolute inset-x-0 bottom-0 h-11 w-full ${style.svgColor}`}
                >
                  <path d={style.svgPath} fill="currentColor" />
                </svg>
              </motion.article>
            );
          })}
        </div>
      </section>

      {/* Organigrama Funcional oficial */}
      <section
        id="organigrama-funcional"
        aria-labelledby="organigrama-heading"
        className="my-8 scroll-mt-24 pt-6"
      >
        <div className="mb-6 flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-semibold text-[#1D4ED8]">
              Estructura jerárquica oficial
            </p>
            <h2
              id="organigrama-heading"
              className="font-display mt-1.5 text-2xl font-bold tracking-tight text-[#0F172A] sm:text-3xl"
            >
              Organigrama Funcional
            </h2>
          </div>
          <p className="text-sm text-slate-600">
            Representación gráfica de la Gerencia General y los cuatro departamentos.
          </p>
        </div>

        <div className="my-8">
          <img
            src="/organigrama.jpg"
            alt="Organigrama Funcional oficial de la Organización de Turismo Nacional Aventura en los Paisajes"
            referrerPolicy="no-referrer"
            onError={(e) => {
              const target = e.currentTarget;
              if (!target.dataset.fallbackApplied) {
                target.dataset.fallbackApplied = 'true';
                target.src = '/assets/aistudio/image_0f92c470.png';
              }
            }}
            className="mx-auto block w-full max-w-5xl rounded-xl border border-stone-200/80 bg-white shadow-lg"
          />
        </div>
      </section>

      {/* 2. Sección de Personal: Organigrama en tarjetas */}
      <section
        id="equipo-trabajo"
        aria-labelledby="team-heading"
        className="mt-14 scroll-mt-24"
      >
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-semibold text-[#1D4ED8]">
              Organigrama funcional
            </p>
            <h2
              id="team-heading"
              className="font-display mt-1.5 text-2xl font-bold tracking-tight text-[#0F172A] sm:text-3xl"
            >
              Equipo de Trabajo
            </h2>
          </div>
          <p className="text-sm text-slate-600">
            Cargos y dotación de personal por gerencia y departamentos.
          </p>
        </div>

        {/* Responsive gallery of departmental cards */}
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {ORGANIZATIONAL_UNITS.map((unit, index) => {
            const style = UNIT_STYLES[unit.id] ?? {
              icon: BriefcaseBusiness,
              iconBox: 'bg-slate-100 text-[#0F172A]',
              cardSurface: 'border-stone-200 bg-white shadow-xs',
              countBadge: 'text-[#0F172A]',
              accentText: 'text-slate-600',
            };
            const IconComponent = style.icon;
            const unitTotal = getUnitTotal(unit);
            const isTecnologia = unit.id === 'tecnologia';

            return (
              <motion.article
                key={unit.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.25,
                  delay: 0.04 * index,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`flex flex-col justify-between rounded-2xl border p-6 transition-transform duration-150 hover:-translate-y-0.5 ${style.cardSurface}`}
              >
                <div>
                  {/* Card top metadata */}
                  <div className="flex items-start justify-between gap-4">
                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${style.iconBox}`}
                    >
                      <IconComponent className="h-5 w-5" aria-hidden="true" />
                    </div>

                    <div className="text-right">
                      <span className="font-mono text-2xl font-bold tracking-tight text-[#0F172A] tabular-nums">
                        {String(unitTotal).padStart(2, '0')}
                      </span>
                      <p className="text-xs text-slate-500">
                        {unitTotal === 1 ? 'persona' : 'personas'}
                      </p>
                    </div>
                  </div>

                  {/* Quiet unboxed kicker */}
                  {unit.keyNote ? (
                    <p
                      className={`mt-4 text-xs font-semibold ${style.accentText}`}
                    >
                      {unit.category} · {unit.keyNote}
                    </p>
                  ) : (
                    <p className="mt-4 text-xs font-medium text-slate-500">
                      {unit.category}
                    </p>
                  )}

                  {/* Department title */}
                  <h3 className="font-display mt-1 text-xl font-bold tracking-tight text-[#0F172A]">
                    {unit.name}
                  </h3>
                  {unit.subtitle && (
                    <p
                      className={`mt-1 text-xs font-medium ${
                        isTecnologia ? 'text-[#1D4ED8]' : 'text-slate-500'
                      }`}
                    >
                      {unit.subtitle}
                    </p>
                  )}

                  {/* Roles & headcount list */}
                  <ul className="mt-5 divide-y divide-stone-200/70 border-t border-stone-200/70">
                    {unit.roles.map((role) => {
                      const isPresident = Boolean(role.isHighlightedRole);
                      return (
                        <li
                          key={role.title}
                          className={`flex items-start justify-between gap-3 py-3 ${
                            isPresident
                              ? '-mx-2.5 rounded-xl bg-[#D97706]/10 px-2.5'
                              : ''
                          }`}
                        >
                          <div className="min-w-0">
                            <p
                              className={`text-sm leading-snug ${
                                isPresident
                                  ? 'font-bold text-[#0F172A]'
                                  : 'font-medium text-slate-800'
                              }`}
                            >
                              {role.title}
                            </p>
                            {role.note && (
                              <p
                                className={`mt-0.5 text-xs leading-relaxed ${
                                  isPresident
                                    ? 'font-medium text-[#B45309]'
                                    : 'text-slate-500'
                                }`}
                              >
                                {role.note}
                              </p>
                            )}
                          </div>

                          <span
                            className={`font-mono shrink-0 text-sm font-semibold tabular-nums ${
                              isPresident ? 'text-[#B45309]' : style.countBadge
                            }`}
                          >
                            {role.count}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {/* Subtle bottom summary line */}
                <div className="mt-4 flex items-center justify-between border-t border-stone-100 pt-3.5 text-xs text-slate-500">
                  <span>Subtotal de unidad</span>
                  <span className="font-mono font-semibold text-[#0F172A] tabular-nums">
                    {unitTotal}{' '}
                    {unitTotal === 1 ? 'trabajador' : 'trabajadores'}
                  </span>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* 3. Totalizador: Banner destacado */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 flex flex-col items-start justify-between gap-6 rounded-2xl bg-[#0F172A] px-6 py-7 text-white shadow-md sm:flex-row sm:items-center sm:px-9"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#1D4ED8] to-[#0D9488] text-white shadow-sm">
              <Users className="h-6 w-6" aria-hidden="true" />
            </div>
            <div>
              <p className="text-xs font-medium text-amber-300">
                Nómina consolidada · 4 sedes nacionales
              </p>
              <h3 className="font-display mt-0.5 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Total de trabajadores: {TOTAL_WORKERS}
              </h3>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-white/15 pt-4 text-xs text-slate-300 sm:border-t-0 sm:pt-0">
            <span>
              Gerencia General:{' '}
              <strong className="font-mono text-white tabular-nums">5</strong>
            </span>
            <span aria-hidden="true" className="text-slate-600">
              ·
            </span>
            <span>
              Tecnología:{' '}
              <strong className="font-mono text-sky-300 tabular-nums">2</strong>
            </span>
            <span aria-hidden="true" className="text-slate-600">
              ·
            </span>
            <span>
              Operaciones y Admin:{' '}
              <strong className="font-mono text-white tabular-nums">41</strong>
            </span>
          </div>
        </motion.div>
      </section>

      {/* 4. Sección de Diagnóstico Tecnológico e Inventario */}
      <DiagnosticoTecnologico />
    </motion.section>
  );
}
