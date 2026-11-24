import { Fragment, useState } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  ClipboardCheck,
  Cpu,
  ExternalLink,
  FileText,
  HardDrive,
  Laptop,
  MapPin,
  MonitorCheck,
  MonitorSmartphone,
  Network,
  ShieldAlert,
  TicketCheck,
  Wrench,
} from 'lucide-react';
import { motion } from 'motion/react';
import { INVENTARIO_TECNICO } from '../data/inventarioData';

const DASHBOARD_URL =
  'https://datastudio.google.com/embed/reporting/12cb78d3-4221-4f5c-9dc6-d832217e809d/page/3nZDG';

interface EquipmentDistribution {
  id: string;
  sede: string;
  city: string;
  count: number;
  supportType: string;
  isHeadquarters?: boolean;
}

const EQUIPMENT_DISTRIBUTION: EquipmentDistribution[] = [
  {
    id: 'central',
    sede: 'Sede Central',
    city: 'Caracas',
    count: 16,
    supportType: 'Soporte presencial',
    isHeadquarters: true,
  },
  {
    id: 'guayana',
    sede: 'Sucursal Guayana',
    city: 'Bolívar',
    count: 8,
    supportType: 'Soporte remoto',
  },
  {
    id: 'andes',
    sede: 'Sucursal Andes',
    city: 'Mérida',
    count: 8,
    supportType: 'Soporte remoto',
  },
  {
    id: 'insular',
    sede: 'Sucursal Insular',
    city: 'Margarita',
    count: 8,
    supportType: 'Soporte remoto',
  },
];

const SUPPORT_STEPS = [
  {
    step: '01',
    label: 'Paso 1',
    title: 'Reporte Estandarizado',
    description:
      'El usuario registra la falla en GLPI; se prohíben las solicitudes informales por WhatsApp o pasillo.',
    accent: 'text-[#1D4ED8]',
    iconBg: 'bg-[#1D4ED8] text-white',
    borderAccent: 'border-t-[#1D4ED8]',
    icon: TicketCheck,
  },
  {
    step: '02',
    label: 'Paso 2',
    title: 'Triaje y Diagnóstico Remoto',
    description:
      'El técnico evalúa el ticket y se conecta vía AnyDesk (si el equipo tiene red) para intentar resolverlo a distancia, especialmente vital para las sucursales.',
    accent: 'text-[#0F766E]',
    iconBg: 'bg-[#0F766E] text-white',
    borderAccent: 'border-t-[#0D9488]',
    icon: MonitorSmartphone,
  },
  {
    step: '03',
    label: 'Paso 3',
    title: 'Intervención Física',
    description:
      'Si es hardware, en la Sede Central se repara en sitio. En sucursales, se gestiona el envío del repuesto y se guía al usuario localmente.',
    accent: 'text-[#B45309]',
    iconBg: 'bg-[#D97706] text-white',
    borderAccent: 'border-t-[#D97706]',
    icon: Wrench,
  },
  {
    step: '04',
    label: 'Paso 4',
    title: 'Cierre y SLA',
    description:
      'Se documenta la solución en GLPI y el usuario completa una breve encuesta de conformidad para cerrar el ticket.',
    accent: 'text-[#3730A3]',
    iconBg: 'bg-[#3730A3] text-white',
    borderAccent: 'border-t-[#4338CA]',
    icon: ClipboardCheck,
  },
];

type InventoryFilter = 'todos' | 'operativos' | 'criticos';

export default function DiagnosticoTecnologico() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filter, setFilter] = useState<InventoryFilter>('todos');
  const [openSpecIds, setOpenSpecIds] = useState<Record<string, boolean>>({});

  const filteredDevices = INVENTARIO_TECNICO.filter((item) => {
    if (filter === 'operativos') return item.severity === 'ok';
    if (filter === 'criticos') return item.severity !== 'ok';
    return true;
  });

  const visibleRows = filteredDevices.slice(
    0,
    isExpanded ? filteredDevices.length : 6
  );

  const toggleSpecRow = (id: string) => {
    setOpenSpecIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <motion.section
      id="diagnostico-tecnologico"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
      aria-labelledby="tech-diagnosis-heading"
      className="mt-14 scroll-mt-24"
    >
      <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xs sm:p-10">
        {/* Encabezado principal */}
        <div className="flex flex-col justify-between gap-4 border-b border-stone-100 pb-6 lg:flex-row lg:items-end">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#1D4ED8]">
              <MonitorCheck className="h-4 w-4" aria-hidden="true" />
              <span>Auditoría de infraestructura · 40 equipos</span>
            </div>
            <h2
              id="tech-diagnosis-heading"
              className="font-display mt-2 text-2xl font-bold tracking-tight text-[#0F172A] sm:text-3xl"
            >
              Diagnóstico Tecnológico e Inventario
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-slate-600">
            <span>
              Total:{' '}
              <strong className="font-mono text-sm font-semibold text-[#0F172A] tabular-nums">
                40
              </strong>
            </span>
            <span aria-hidden="true" className="text-stone-300">
              ·
            </span>
            <span>
              Operativos:{' '}
              <strong className="font-mono text-sm font-semibold text-[#0F766E] tabular-nums">
                22
              </strong>
            </span>
            <span aria-hidden="true" className="text-stone-300">
              ·
            </span>
            <span>
              Críticos / Fallas:{' '}
              <strong className="font-mono text-sm font-semibold text-[#B45309] tabular-nums">
                18
              </strong>
            </span>
          </div>
        </div>

        {/* 1. Ubicación Física de los Equipos (Texto y Tarjetas resumen) */}
        <div className="mt-8" aria-labelledby="distribucion-equipos-heading">
          <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-semibold text-[#0F766E]">
                01. Distribución territorial
              </p>
              <h3
                id="distribucion-equipos-heading"
                className="font-display mt-1 text-xl font-bold tracking-tight text-[#0F172A] sm:text-2xl"
              >
                Ubicación Física de los Equipos
              </h3>
            </div>
            <p className="text-xs text-slate-500">
              40 computadores asignados en 4 sedes nacionales
            </p>
          </div>

          <p className="mt-3 max-w-4xl text-[15px] leading-[1.75] text-slate-700 sm:text-base">
            La organización cuenta con un inventario de 40 equipos informáticos
            distribuidos entre la Sede Central y las 3 sucursales. Tras una
            auditoría reciente, se determinó que 22 equipos se encuentran
            operativos, mientras que 18 equipos presentan fallas severas o son
            tecnológicamente obsoletos, limitando la productividad de los
            trabajadores.
          </p>

          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {EQUIPMENT_DISTRIBUTION.map((item) => (
              <div
                key={item.id}
                className={`flex flex-col justify-between rounded-xl border p-5 transition-transform duration-150 hover:-translate-y-0.5 ${
                  item.isHeadquarters
                    ? 'border-[#1D4ED8]/45 bg-gradient-to-br from-[#EFF6FF] via-white to-[#FAF8F3] shadow-sm'
                    : 'border-stone-200 bg-[#FAF8F3]/70'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                      item.isHeadquarters
                        ? 'bg-[#1D4ED8] text-white'
                        : 'border border-stone-200 bg-white text-[#0F766E]'
                    }`}
                  >
                    <MapPin className="h-4 w-4" aria-hidden="true" />
                  </div>
                  <span
                    className={`font-mono text-2xl font-bold tabular-nums ${
                      item.isHeadquarters ? 'text-[#1D4ED8]' : 'text-[#0F172A]'
                    }`}
                  >
                    {String(item.count).padStart(2, '0')}
                  </span>
                </div>

                <div className="mt-4">
                  <h4 className="font-display text-base font-bold text-[#0F172A]">
                    {item.sede}{' '}
                    <span className="font-normal text-slate-500">
                      ({item.city})
                    </span>
                  </h4>
                  <p className="mt-1 text-xs font-medium text-slate-600">
                    {item.count} equipos · {item.supportType}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Gráficas Estadísticas (Dashboard) */}
        <div
          className="mt-12 border-t border-stone-100 pt-9"
          aria-labelledby="dashboard-estadisticas-heading"
        >
          <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-semibold text-[#1D4ED8]">
                02. Analítica de incidencias
              </p>
              <h3
                id="dashboard-estadisticas-heading"
                className="font-display mt-1 text-xl font-bold tracking-tight text-[#0F172A] sm:text-2xl"
              >
                Gráficas Estadísticas
              </h3>
            </div>
            <p className="text-xs text-slate-500">
              Tablero interactivo de fallas y estado de la plataforma
            </p>
          </div>

          <div className="mt-5 overflow-hidden rounded-xl border border-stone-200 bg-[#FAF8F3] shadow-xs">
            <div className="flex items-center justify-between gap-4 border-b border-stone-200/80 bg-white/85 px-4 py-2.5 text-xs text-slate-600">
              <span className="font-medium text-[#0F172A]">
                Dashboard de Diagnóstico Tecnológico (Looker Studio)
              </span>
              <a
                href={DASHBOARD_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-medium text-[#1D4ED8] transition-colors hover:text-[#0F766E] whitespace-nowrap shrink-0"
              >
                <span>Abrir en pantalla completa</span>
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </div>

            <div className="w-full bg-white">
              <iframe
                title="Tablero interactivo de Diagnóstico Tecnológico e Inventario"
                width="100%"
                height="600px"
                src={DASHBOARD_URL}
                frameBorder="0"
                allowFullScreen
                sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
                className="block h-[500px] w-full border-0 sm:h-[600px]"
              />
            </div>
          </div>
        </div>

        {/* 3. Inventario Detallado de Equipos (Auditoría Técnica Completa) */}
        <div
          className="mt-12 border-t border-stone-100 pt-9"
          aria-labelledby="inventario-detallado-heading"
        >
          <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
            <div>
              <p className="text-xs font-semibold text-[#B45309]">
                03. Auditoría técnica universitaria ({INVENTARIO_TECNICO.length}{' '}
                equipos)
              </p>
              <h3
                id="inventario-detallado-heading"
                className="font-display mt-1 text-xl font-bold tracking-tight text-[#0F172A] sm:text-2xl"
              >
                Inventario Detallado de Equipos
              </h3>
              <p className="mt-1 text-xs text-slate-500">
                Haz clic en «Ver ficha técnica» para consultar tarjeta madre,
                expansión, memoria y diagnóstico de falla.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {/* Interactive segmented filter */}
              <div
                role="group"
                aria-label="Filtrar equipos por estado"
                className="inline-flex items-center gap-1 rounded-lg border border-stone-200 bg-[#FAF8F3] p-1"
              >
                <button
                  type="button"
                  onClick={() => setFilter('todos')}
                  className={`cursor-pointer rounded-md px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                    filter === 'todos'
                      ? 'bg-white text-[#0F172A] shadow-xs'
                      : 'text-slate-600 hover:text-[#0F172A]'
                  }`}
                >
                  Todos (40)
                </button>
                <button
                  type="button"
                  onClick={() => setFilter('operativos')}
                  className={`cursor-pointer rounded-md px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                    filter === 'operativos'
                      ? 'bg-white text-[#0F766E] shadow-xs'
                      : 'text-slate-600 hover:text-[#0F172A]'
                  }`}
                >
                  Operativos (22)
                </button>
                <button
                  type="button"
                  onClick={() => setFilter('criticos')}
                  className={`cursor-pointer rounded-md px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                    filter === 'criticos'
                      ? 'bg-white text-rose-700 shadow-xs'
                      : 'text-slate-600 hover:text-[#0F172A]'
                  }`}
                >
                  Críticos / Fallas (18)
                </button>
              </div>

              <p className="font-mono text-xs text-slate-500 tabular-nums whitespace-nowrap">
                Mostrando {visibleRows.length} de {filteredDevices.length}
              </p>
            </div>
          </div>

          <div
            id="tabla-inventario-equipos"
            className="mt-5 overflow-x-auto rounded-xl border border-stone-200 bg-white"
          >
            <table className="min-w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-stone-200 bg-[#FAF8F3] text-xs font-semibold text-slate-600">
                  <th scope="col" className="px-4 py-3.5 whitespace-nowrap">
                    ID
                  </th>
                  <th scope="col" className="px-4 py-3.5 whitespace-nowrap">
                    Ubicación (Sede + Puesto)
                  </th>
                  <th scope="col" className="px-4 py-3.5 whitespace-nowrap">
                    Equipo y Procesador
                  </th>
                  <th scope="col" className="px-4 py-3.5 whitespace-nowrap">
                    SO y Arquitectura
                  </th>
                  <th scope="col" className="px-4 py-3.5 whitespace-nowrap">
                    Estado
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3.5 text-right whitespace-nowrap"
                  >
                    Ficha técnica
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {visibleRows.map((row, idx) => {
                  const isSpecOpen = Boolean(openSpecIds[row.id]);
                  return (
                    <Fragment key={row.id}>
                      <motion.tr
                        initial={idx >= 6 ? { opacity: 0, y: 4 } : false}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.16,
                          delay:
                            idx >= 6 ? Math.min((idx - 6) * 0.01, 0.18) : 0,
                        }}
                        className={`transition-colors ${
                          isSpecOpen
                            ? 'bg-[#EFF6FF]/45'
                            : 'hover:bg-[#FAF8F3]/60'
                        }`}
                      >
                        {/* ID */}
                        <td className="font-mono px-4 py-3.5 align-top text-xs font-semibold text-[#1D4ED8] tabular-nums whitespace-nowrap">
                          {row.id}
                        </td>

                        {/* Ubicación (Sede + Puesto) */}
                        <td className="px-4 py-3.5 align-top">
                          <p className="text-xs font-semibold text-[#0F172A] whitespace-nowrap">
                            {row.sede}
                          </p>
                          <p className="mt-0.5 text-xs text-slate-600">
                            {row.puesto}
                          </p>
                        </td>

                        {/* Equipo y Procesador (con generación) */}
                        <td className="px-4 py-3.5 align-top">
                          <p className="text-xs font-semibold text-[#0F172A] whitespace-nowrap">
                            {row.equipo}
                          </p>
                          <p className="mt-0.5 text-xs text-slate-600 whitespace-nowrap">
                            {row.procesador}
                          </p>
                        </td>

                        {/* SO y Arquitectura */}
                        <td className="px-4 py-3.5 align-top">
                          <p className="text-xs font-medium text-slate-800 whitespace-nowrap">
                            {row.sistemaOperativo}
                          </p>
                          <p className="font-mono mt-0.5 text-[11px] text-slate-500 tabular-nums whitespace-nowrap">
                            {row.arquitectura}
                          </p>
                        </td>

                        {/* Estado */}
                        <td className="px-4 py-3.5 align-top whitespace-nowrap">
                          <span
                            className={`inline-flex items-center gap-1.5 text-xs font-semibold ${
                              row.severity === 'ok'
                                ? 'text-[#0F766E]'
                                : row.severity === 'warning'
                                  ? 'text-[#B45309]'
                                  : 'text-rose-700'
                            }`}
                          >
                            {row.severity === 'ok' && (
                              <CheckCircle2
                                className="h-4 w-4 shrink-0"
                                aria-hidden="true"
                              />
                            )}
                            {row.severity === 'warning' && (
                              <HardDrive
                                className="h-4 w-4 shrink-0"
                                aria-hidden="true"
                              />
                            )}
                            {row.severity === 'critical' && (
                              <AlertTriangle
                                className="h-4 w-4 shrink-0"
                                aria-hidden="true"
                              />
                            )}
                            <span>{row.estado}</span>
                          </span>
                        </td>

                        {/* Botón Ver ficha técnica */}
                        <td className="px-4 py-3.5 text-right align-top whitespace-nowrap">
                          <button
                            type="button"
                            onClick={() => toggleSpecRow(row.id)}
                            aria-expanded={isSpecOpen}
                            aria-controls={`ficha-${row.id}`}
                            className={`inline-flex cursor-pointer items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                              isSpecOpen
                                ? 'border-[#1D4ED8] bg-[#1D4ED8] text-white'
                                : 'border-stone-200 bg-white text-[#0F172A] hover:border-[#1D4ED8]/50 hover:text-[#1D4ED8]'
                            }`}
                          >
                            <FileText className="h-3.5 w-3.5" aria-hidden="true" />
                            <span>
                              {isSpecOpen ? 'Ocultar ficha' : 'Ver ficha técnica'}
                            </span>
                          </button>
                        </td>
                      </motion.tr>

                      {/* Fila desplegable con ficha técnica completa */}
                      {isSpecOpen && (
                        <tr
                          id={`ficha-${row.id}`}
                          className="bg-[#FAF8F3]/90"
                        >
                          <td colSpan={6} className="px-4 py-4 sm:px-6">
                            <div className="grid grid-cols-1 gap-4 rounded-xl border border-stone-200 bg-white p-4 sm:p-5 md:grid-cols-2 lg:grid-cols-4">
                              <div className="space-y-1">
                                <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1D4ED8]">
                                  <Cpu className="h-3.5 w-3.5" aria-hidden="true" />
                                  <span>Tarjeta Madre</span>
                                </div>
                                <p className="text-xs font-medium text-[#0F172A]">
                                  {row.tarjetaMadre}
                                </p>
                              </div>

                              <div className="space-y-1">
                                <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#0F766E]">
                                  <Network
                                    className="h-3.5 w-3.5"
                                    aria-hidden="true"
                                  />
                                  <span>Video y Tarjetas de Red</span>
                                </div>
                                <p className="text-xs leading-relaxed text-slate-700">
                                  {row.tarjetasExpansion}
                                </p>
                              </div>

                              <div className="space-y-1">
                                <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#3730A3]">
                                  <HardDrive
                                    className="h-3.5 w-3.5"
                                    aria-hidden="true"
                                  />
                                  <span>RAM y Almacenamiento</span>
                                </div>
                                <p className="font-mono text-xs leading-relaxed text-slate-700 tabular-nums">
                                  {row.ramAlmacenamiento}
                                </p>
                              </div>

                              <div className="space-y-1">
                                <div
                                  className={`flex items-center gap-1.5 text-[11px] font-semibold ${
                                    row.severity === 'ok'
                                      ? 'text-[#0F766E]'
                                      : row.severity === 'warning'
                                        ? 'text-[#B45309]'
                                        : 'text-rose-700'
                                  }`}
                                >
                                  <AlertTriangle
                                    className="h-3.5 w-3.5"
                                    aria-hidden="true"
                                  />
                                  <span>Diagnóstico Técnico</span>
                                </div>
                                <p className="text-xs leading-relaxed text-slate-700">
                                  {row.diagnostico}
                                </p>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filteredDevices.length > 6 && (
            <div className="mt-5 flex justify-center">
              <button
                type="button"
                onClick={() => setIsExpanded((prev) => !prev)}
                aria-expanded={isExpanded}
                aria-controls="tabla-inventario-equipos"
                className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-stone-300 bg-[#FAF8F3] px-5 py-2.5 text-sm font-medium text-[#0F172A] shadow-xs transition-all duration-150 hover:border-[#1D4ED8] hover:bg-[#EFF6FF] hover:text-[#1D4ED8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8] whitespace-nowrap shrink-0"
              >
                <span>
                  {isExpanded
                    ? 'Ver menos'
                    : `Ver inventario completo (${filteredDevices.length} equipos)`}
                </span>
                {isExpanded ? (
                  <ChevronUp className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <ChevronDown className="h-4 w-4" aria-hidden="true" />
                )}
              </button>
            </div>
          )}
        </div>

        {/* 4. Software de Atención de Fallas (Tarjetas informativas) */}
        <div
          className="mt-12 border-t border-stone-100 pt-9"
          aria-labelledby="software-atencion-heading"
        >
          <div>
            <p className="text-xs font-semibold text-[#1D4ED8]">
              04. Herramientas operativas del Departamento de Tecnología
            </p>
            <h3
              id="software-atencion-heading"
              className="font-display mt-1 text-xl font-bold tracking-tight text-[#0F172A] sm:text-2xl"
            >
              Software de Atención de Fallas
            </h3>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
            <div className="flex items-start gap-4 rounded-xl border border-[#1D4ED8]/30 bg-[#EFF6FF]/65 p-6">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#1D4ED8] text-white shadow-xs">
                <TicketCheck className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <p className="text-xs font-semibold text-[#1D4ED8]">
                  Sistema de Tickets
                </p>
                <h4 className="font-display mt-1 text-lg font-bold text-[#0F172A]">
                  Implementación de GLPI
                </h4>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-700">
                  Gestión centralizada de incidencias, inventario tecnológico y
                  base de conocimientos para unificar los reportes de todas las
                  sedes.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-xl border border-[#0D9488]/30 bg-[#0D9488]/6 p-6">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#0F766E] text-white shadow-xs">
                <Laptop className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <p className="text-xs font-semibold text-[#0F766E]">
                  Soporte Remoto
                </p>
                <h4 className="font-display mt-1 text-lg font-bold text-[#0F172A]">
                  AnyDesk o TeamViewer
                </h4>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-700">
                  Intervención directa y segura sobre los equipos de las 3
                  sucursales del interior sin necesidad de traslados físicos
                  inmediatos.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 5. Cumplimiento de Normas de Atención al Usuario (Esquema de trabajo por pasos) */}
        <div
          className="mt-12 border-t border-stone-100 pt-9"
          aria-labelledby="protocolo-soporte-heading"
        >
          <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-[#3730A3]">
                <ShieldAlert className="h-4 w-4" aria-hidden="true" />
                <span>05. Protocolo de soporte técnico</span>
              </div>
              <h3
                id="protocolo-soporte-heading"
                className="font-display mt-1 text-xl font-bold tracking-tight text-[#0F172A] sm:text-2xl"
              >
                Cumplimiento de Normas de Atención al Usuario
              </h3>
            </div>
            <p className="text-xs text-slate-500">
              Flujo obligatorio de atención en 4 etapas
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SUPPORT_STEPS.map((item) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={item.step}
                  className={`flex flex-col justify-between rounded-xl border border-stone-200 border-t-2 ${item.borderAccent} bg-[#FAF8F3]/75 p-5`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-3">
                      <div
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${item.iconBg}`}
                      >
                        <IconComponent className="h-4 w-4" aria-hidden="true" />
                      </div>
                      <span
                        className={`font-mono text-xs font-bold tabular-nums ${item.accent}`}
                      >
                        {item.label}
                      </span>
                    </div>

                    <h4 className="font-display mt-4 text-base font-bold text-[#0F172A]">
                      {item.title}
                    </h4>
                    <p className="mt-2 text-xs leading-relaxed text-slate-600 sm:text-[13px]">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
