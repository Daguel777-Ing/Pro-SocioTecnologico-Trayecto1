import { useState } from 'react';
import {
  ArrowUpRight,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Compass,
  Layers,
  Map,
  Network,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import {
  CASE_STUDY_INTRO,
  CASE_STUDY_METRICS,
  CASE_STUDY_SECTIONS,
  CASE_STUDY_TITLE,
  DIDACTIC_SESSIONS,
  truncateWords,
} from '../data/portfolioData';

const METRIC_STYLES = [
  { numColor: 'text-[#1D4ED8]', borderAccent: 'border-t-[#1D4ED8]' },
  { numColor: 'text-[#0F766E]', borderAccent: 'border-t-[#0D9488]' },
  { numColor: 'text-[#B45309]', borderAccent: 'border-t-[#D97706]' },
  { numColor: 'text-[#3730A3]', borderAccent: 'border-t-[#4338CA]' },
];

const SESSION_THEMES = [
  {
    icon: Compass,
    badgeBg: 'bg-[#1D4ED8]/10 text-[#1D4ED8]',
    activeBg: 'border-[#1D4ED8] bg-[#1D4ED8] text-white',
    hoverBorder: 'hover:border-[#1D4ED8]/60',
    numColor: 'text-[#1D4ED8]',
  },
  {
    icon: Map,
    badgeBg: 'bg-[#0D9488]/10 text-[#0F766E]',
    activeBg: 'border-[#0F766E] bg-[#0F766E] text-white',
    hoverBorder: 'hover:border-[#0D9488]/60',
    numColor: 'text-[#0F766E]',
  },
  {
    icon: Network,
    badgeBg: 'bg-[#D97706]/12 text-[#B45309]',
    activeBg: 'border-[#B45309] bg-[#B45309] text-white',
    hoverBorder: 'hover:border-[#D97706]/60',
    numColor: 'text-[#B45309]',
  },
  {
    icon: Layers,
    badgeBg: 'bg-[#4338CA]/10 text-[#3730A3]',
    activeBg: 'border-[#3730A3] bg-[#3730A3] text-white',
    hoverBorder: 'hover:border-[#4338CA]/60',
    numColor: 'text-[#3730A3]',
  },
];

const SECTION_NUM_COLORS = [
  'text-[#1D4ED8]',
  'text-[#0F766E]',
  'text-[#B45309]',
];

export default function InicioPage() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [heroImageError, setHeroImageError] = useState(false);
  const [sessionsImageError, setSessionsImageError] = useState(false);
  const [selectedSessionId, setSelectedSessionId] = useState<number | null>(
    null
  );

  const previewText = truncateWords(CASE_STUDY_INTRO, 50);
  const selectedSession = DIDACTIC_SESSIONS.find(
    (s) => s.id === selectedSessionId
  );

  return (
    <div className="mx-auto max-w-[1200px] px-4 py-10 sm:px-8 sm:py-14">
      {/* Split-screen editorial hero */}
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        aria-labelledby="case-study-heading"
        className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12 lg:gap-12"
      >
        {/* Left column: Title, 50-word excerpt, Ver todo button, subtle decorative drawing */}
        <div className="flex flex-col justify-between lg:col-span-7">
          <div>
            <p className="text-xs font-semibold text-[#0F766E]">
              Turismo social · Gestión de plataforma tecnológica
            </p>

            <h1
              id="case-study-heading"
              className="font-display mt-3 text-4xl font-bold tracking-tight text-[#0F172A] text-balance sm:text-5xl lg:text-[3.5rem] lg:leading-[1.06]"
            >
              {CASE_STUDY_TITLE}
            </h1>

            {/* Hand-crafted minimalist topographic line drawing divider */}
            <svg
              aria-hidden="true"
              viewBox="0 0 320 18"
              fill="none"
              className="mt-4 h-4 w-56 text-[#D97706]"
            >
              <path
                d="M2 12C28 4 54 4 80 11C106 18 132 2 162 9C192 16 218 4 248 10C278 16 298 6 318 9"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <circle cx="80" cy="11" r="3" fill="#1D4ED8" />
              <circle cx="162" cy="9" r="3" fill="#0D9488" />
              <circle cx="248" cy="10" r="3" fill="#D97706" />
            </svg>

            <div className="mt-5 max-w-2xl">
              <p className="text-base leading-relaxed text-slate-700 sm:text-[1.0625rem]">
                {isExpanded ? CASE_STUDY_INTRO : previewText}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => setIsExpanded((prev) => !prev)}
                  aria-expanded={isExpanded}
                  aria-controls="case-study-full-content"
                  className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-[#1D4ED8] px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-all duration-150 hover:-translate-y-0.5 hover:bg-[#0F766E] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8] whitespace-nowrap shrink-0"
                >
                  <BookOpen className="h-4 w-4" aria-hidden="true" />
                  <span>{isExpanded ? 'Ver menos' : 'Ver todo'}</span>
                  {isExpanded ? (
                    <ChevronUp className="h-4 w-4" aria-hidden="true" />
                  ) : (
                    <ChevronDown className="h-4 w-4" aria-hidden="true" />
                  )}
                </button>

                <span className="text-xs font-medium text-slate-500">
                  {isExpanded
                    ? 'Lectura completa desplegada'
                    : 'Resumen inicial de 50 palabras'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right column: Bespoke risograph editorial illustration */}
        <div className="lg:col-span-5">
          <div className="relative h-64 w-full overflow-hidden rounded-2xl border border-stone-200/90 bg-[#0F766E] shadow-sm sm:h-80 lg:h-full lg:min-h-[340px]">
            {!heroImageError ? (
              <img
                src="/src/assets/images/illus_caso_estudio_1794525319577.jpg"
                alt="Ilustración editorial de montañas venezolanas, brújula y estaciones tecnológicas conectadas"
                referrerPolicy="no-referrer"
                onError={() => setHeroImageError(true)}
                className="h-full w-full object-cover transition-transform duration-500 ease-out hover:scale-[1.02]"
              />
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-[#1D4ED8] via-[#0F766E] to-[#B45309] p-6 text-center text-white">
                <Compass className="h-8 w-8 text-amber-200" aria-hidden="true" />
                <p className="font-display mt-3 text-base font-medium">
                  Aventura en los paisajes
                </p>
              </div>
            )}

            <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0F172A]/85 via-[#0F172A]/40 to-transparent px-5 pt-12 pb-5">
              <p className="text-xs font-medium text-amber-200">
                Organización de Turismo Nacional
              </p>
              <p className="font-display mt-0.5 text-base font-semibold text-white">
                «Aventura en los paisajes»
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Expanded Full Case Study Reading Area */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.section
            id="case-study-full-content"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            aria-label="Texto completo del caso de estudio"
            className="mt-10 rounded-2xl border border-stone-200 bg-white p-6 shadow-xs sm:p-10"
          >
            <div className="space-y-10">
              {CASE_STUDY_SECTIONS.map((section, idx) => (
                <article
                  key={section.id}
                  className={
                    idx > 0 ? 'border-t border-stone-100 pt-8' : undefined
                  }
                >
                  {section.heading && (
                    <div className="flex items-baseline gap-3">
                      <span
                        className={`font-mono text-xs font-semibold tabular-nums ${
                          SECTION_NUM_COLORS[idx % SECTION_NUM_COLORS.length]
                        }`}
                      >
                        0{idx + 1}.
                      </span>
                      <h2 className="font-display text-2xl font-bold tracking-tight text-[#0F172A]">
                        {section.heading}
                      </h2>
                    </div>
                  )}

                  {section.paragraphs.length > 0 && (
                    <div className="mt-4 max-w-4xl space-y-4">
                      {section.paragraphs.map((paragraph, pIdx) => (
                        <p
                          key={pIdx}
                          className="text-[15px] leading-[1.75] text-slate-700 sm:text-base"
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  )}

                  {section.bullets && section.bullets.length > 0 && (
                    <ul className="mt-5 grid grid-cols-1 gap-3.5 md:grid-cols-2">
                      {section.bullets.map((bullet, bIdx) => (
                        <li
                          key={bIdx}
                          className="rounded-xl border border-stone-200/80 bg-[#FAF8F3] p-4 text-sm leading-relaxed text-slate-700"
                        >
                          {bullet.label ? (
                            <>
                              <strong className="font-semibold text-[#0F172A]">
                                {bullet.label}:
                              </strong>{' '}
                              {bullet.text}
                            </>
                          ) : (
                            bullet.text
                          )}
                        </li>
                      ))}
                    </ul>
                  )}

                  {section.closingParagraph && (
                    <p className="mt-5 max-w-4xl rounded-xl border border-[#0D9488]/25 bg-[#0D9488]/8 px-5 py-3.5 text-sm font-medium leading-relaxed text-[#0F172A] sm:text-[15px]">
                      {section.closingParagraph}
                    </p>
                  )}
                </article>
              ))}
            </div>

            <div className="mt-8 flex justify-end border-t border-stone-100 pt-5">
              <button
                type="button"
                onClick={() => setIsExpanded(false)}
                className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-stone-200 bg-white px-4 py-2 text-xs font-medium text-slate-700 transition-colors hover:border-[#1D4ED8]/40 hover:text-[#1D4ED8] whitespace-nowrap shrink-0"
              >
                <ChevronUp className="h-3.5 w-3.5" aria-hidden="true" />
                Contraer resumen
              </button>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Full-width 4-column quantitative strip below the hero split */}
      <section
        aria-label="Datos cuantitativos del caso"
        className="mt-10 border-y border-stone-200/90 py-6"
      >
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4 lg:gap-8">
          {CASE_STUDY_METRICS.map((metric, idx) => {
            const style = METRIC_STYLES[idx % METRIC_STYLES.length];
            return (
              <div
                key={metric.label}
                className={`border-t-2 pt-3 ${style.borderAccent}`}
              >
                <p
                  className={`font-mono text-2xl font-semibold tracking-tight tabular-nums sm:text-3xl ${style.numColor}`}
                >
                  {metric.value}
                </p>
                <p className="mt-1 text-sm font-semibold text-[#0F172A]">
                  {metric.label}
                </p>
                <p className="mt-0.5 text-xs text-slate-500">{metric.detail}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4 Didactic Session Buttons Section with editorial panorama illustration */}
      <section aria-labelledby="sessions-heading" className="mt-12 sm:mt-14">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="text-xs font-semibold text-[#B45309]">
              Ruta de aprendizaje
            </p>
            <h2
              id="sessions-heading"
              className="font-display mt-1.5 text-2xl font-bold tracking-tight text-[#0F172A] sm:text-3xl"
            >
              Sesiones didácticas
            </h2>
            <p className="mt-2.5 text-sm leading-relaxed text-slate-600">
              Cuatro unidades académicas diseñadas para analizar y resolver la
              problemática tecnológica de «Aventura en los paisajes».
            </p>
          </div>

          <div className="lg:col-span-7">
            <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-xs">
              {!sessionsImageError ? (
                <img
                  src="/src/assets/images/illus_sesiones_1794525322301.jpg"
                  alt="Ilustración de cuatro bloques progresivos de aprendizaje y conectividad"
                  referrerPolicy="no-referrer"
                  onError={() => setSessionsImageError(true)}
                  className="h-44 w-full object-cover sm:h-52"
                />
              ) : (
                <div className="flex h-44 w-full items-center justify-center bg-gradient-to-r from-[#1D4ED8]/15 via-[#0D9488]/15 to-[#D97706]/15 sm:h-52">
                  <Layers className="h-8 w-8 text-[#1D4ED8]" aria-hidden="true" />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {DIDACTIC_SESSIONS.map((session, index) => {
            const isSelected = selectedSessionId === session.id;
            const theme = SESSION_THEMES[index % SESSION_THEMES.length];
            const IconComponent = theme.icon;

            return (
              <motion.button
                key={session.id}
                type="button"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.25,
                  delay: 0.05 * index,
                  ease: [0.16, 1, 0.3, 1],
                }}
                onClick={() =>
                  setSelectedSessionId((prev) =>
                    prev === session.id ? null : session.id
                  )
                }
                aria-pressed={isSelected}
                className={`group relative flex cursor-pointer flex-col justify-between rounded-2xl border p-6 text-left transition-all duration-150 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8] ${
                  isSelected
                    ? `${theme.activeBg} shadow-md`
                    : `border-stone-200 bg-white text-[#0F172A] shadow-xs ${theme.hoverBorder} hover:shadow-md`
                }`}
              >
                <div className="flex w-full items-center justify-between">
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-xl transition-colors ${
                      isSelected ? 'bg-white/20 text-white' : theme.badgeBg
                    }`}
                  >
                    <IconComponent className="h-4.5 w-4.5" aria-hidden="true" />
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`font-mono text-xs font-semibold tabular-nums ${
                        isSelected ? 'text-white/90' : theme.numColor
                      }`}
                    >
                      {session.code}
                    </span>
                    <ArrowUpRight
                      className={`h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
                        isSelected
                          ? 'text-white'
                          : 'text-slate-400 group-hover:text-[#0F172A]'
                      }`}
                      aria-hidden="true"
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <span className="font-display block text-lg font-bold tracking-tight whitespace-nowrap">
                    {session.title}
                  </span>
                  <span
                    className={`mt-1 block text-xs ${
                      isSelected ? 'text-white/85' : 'text-slate-500'
                    }`}
                  >
                    {session.subtitle}
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Non-intrusive status feedback honoring "no hagas el despliegue todavía" */}
        <AnimatePresence mode="wait">
          {selectedSession && (
            <motion.div
              key={selectedSession.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.18 }}
              className="mt-4 flex flex-col justify-between gap-2 rounded-xl border border-stone-200 bg-white px-5 py-3.5 text-sm text-slate-700 shadow-xs sm:flex-row sm:items-center"
            >
              <p>
                <strong className="font-semibold text-[#0F172A]">
                  {selectedSession.title}
                </strong>{' '}
                — Módulo preparado para su próximo despliegue al incorporar el
                contenido correspondiente.
              </p>
              <button
                type="button"
                onClick={() => setSelectedSessionId(null)}
                className="cursor-pointer self-start text-xs font-medium text-[#1D4ED8] hover:underline sm:self-auto whitespace-nowrap shrink-0"
              >
                Ocultar aviso
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </div>
  );
}
