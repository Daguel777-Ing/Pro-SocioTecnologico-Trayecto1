import { useState } from 'react';
import { Check, Pencil, UserCheck, X } from 'lucide-react';
import { motion } from 'motion/react';
import type { StudentProfile } from '../data/portfolioData';

interface EstudiantePageProps {
  student: StudentProfile;
  onUpdateStudent: (updated: StudentProfile) => void;
}

const FIELD_CONFIG: { key: keyof StudentProfile; label: string; mono?: boolean }[] = [
  { key: 'nombre', label: 'Nombre completo' },
  { key: 'cedula', label: 'Cédula de identidad', mono: true },
  { key: 'materia', label: 'Materia / Asignatura' },
  { key: 'carrera', label: 'Carrera' },
  { key: 'semestre', label: 'Semestre / Trayecto' },
  { key: 'seccion', label: 'Sección', mono: true },
  { key: 'institucion', label: 'Institución universitaria' },
  { key: 'docente', label: 'Profesor / Docente' },
  { key: 'telefono', label: 'Teléfono de contacto', mono: true },
  { key: 'correo', label: 'Correo electrónico' },
];

export default function EstudiantePage({
  student,
  onUpdateStudent,
}: EstudiantePageProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [draft, setDraft] = useState<StudentProfile>(student);

  const handleStartEdit = () => {
    setDraft(student);
    setIsEditing(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateStudent(draft);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setDraft(student);
    setIsEditing(false);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
      className="mx-auto max-w-[1200px] px-4 py-12 sm:px-8 sm:py-16"
    >
      <div className="flex flex-col justify-between gap-4 border-b border-stone-200 pb-6 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-semibold text-[#1D4ED8]">
            Expediente académico
          </p>
          <h1 className="font-display mt-2 text-3xl font-bold tracking-tight text-[#0F172A] sm:text-4xl">
            Estudiante
          </h1>
          <p className="mt-2 max-w-xl text-sm text-slate-600 sm:text-base">
            Identificación personal, datos de la asignatura y canales de
            contacto del autor del portafolio.
          </p>
        </div>

        {!isEditing && (
          <button
            type="button"
            onClick={handleStartEdit}
            className="inline-flex cursor-pointer items-center gap-2 self-start rounded-lg border border-stone-200 bg-white px-4 py-2 text-xs font-medium text-[#0F172A] shadow-xs transition-colors hover:border-[#1D4ED8]/40 hover:text-[#1D4ED8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8] whitespace-nowrap shrink-0 sm:self-auto"
          >
            <Pencil className="h-3.5 w-3.5" aria-hidden="true" />
            Editar datos
          </button>
        )}
      </div>

      {isEditing ? (
        <form
          onSubmit={handleSave}
          className="mt-8 rounded-2xl border border-stone-200 bg-white p-6 shadow-xs sm:p-8"
        >
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {FIELD_CONFIG.map((field) => (
              <label key={field.key} className="block">
                <span className="text-xs font-medium text-slate-600">
                  {field.label}
                </span>
                <input
                  type={field.key === 'correo' ? 'email' : 'text'}
                  value={draft[field.key]}
                  onChange={(e) =>
                    setDraft((prev) => ({
                      ...prev,
                      [field.key]: e.target.value,
                    }))
                  }
                  className="mt-1.5 w-full rounded-lg border border-stone-200 bg-[#FAF8F3] px-3.5 py-2.5 text-sm text-[#0F172A] transition-colors focus:border-[#1D4ED8] focus:bg-white focus:outline-none"
                />
              </label>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-end gap-3 border-t border-stone-100 pt-5">
            <button
              type="button"
              onClick={handleCancel}
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-stone-200 bg-white px-4 py-2 text-xs font-medium text-slate-600 transition-colors hover:bg-stone-50 whitespace-nowrap shrink-0"
            >
              <X className="h-3.5 w-3.5" aria-hidden="true" />
              Cancelar
            </button>
            <button
              type="submit"
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg bg-[#1D4ED8] px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-[#0F766E] whitespace-nowrap shrink-0"
            >
              <Check className="h-3.5 w-3.5" aria-hidden="true" />
              Guardar cambios
            </button>
          </div>
        </form>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Summary identity column with custom student workspace illustration */}
          <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-xs lg:col-span-4">
            <div className="aspect-square w-full overflow-hidden bg-[#FAF8F3]">
              {!imageError ? (
                <img
                  src="/src/assets/images/illus_estudiante_1794525321294.jpg"
                  alt="Ilustración del espacio de estudio de ingeniería en sistemas"
                  referrerPolicy="no-referrer"
                  onError={() => setImageError(true)}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-[#1D4ED8]/10 text-[#1D4ED8]">
                  <UserCheck className="h-10 w-10" aria-hidden="true" />
                </div>
              )}
            </div>
            <div className="p-6">
              <h2 className="font-display text-2xl font-bold tracking-tight text-[#0F172A]">
                {student.nombre}
              </h2>
              <p className="mt-1 text-sm text-slate-600">{student.carrera}</p>
              <div className="mt-5 space-y-2.5 border-t border-stone-100 pt-4 text-sm">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-slate-500">Cédula</span>
                  <span className="font-mono font-medium text-[#1D4ED8] tabular-nums">
                    {student.cedula}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-slate-500">Sección</span>
                  <span className="font-mono font-medium text-[#0F766E] tabular-nums">
                    {student.seccion}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed academic records */}
          <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-xs lg:col-span-8 sm:p-8">
            <h3 className="font-display text-lg font-semibold text-[#0F172A]">
              Información de la cursada
            </h3>
            <dl className="mt-6 grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2">
              {FIELD_CONFIG.map((field) => (
                <div
                  key={field.key}
                  className="border-b border-stone-100 pb-3.5"
                >
                  <dt className="text-xs text-slate-500">{field.label}</dt>
                  <dd
                    className={`mt-1 text-sm font-medium text-[#0F172A] ${
                      field.mono ? 'font-mono tabular-nums' : ''
                    }`}
                  >
                    {student[field.key]}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      )}
    </motion.section>
  );
}
