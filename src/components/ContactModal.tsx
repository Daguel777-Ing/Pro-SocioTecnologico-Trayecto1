import { useEffect, useState } from 'react';
import { Check, Copy, Mail, Phone, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import type { StudentProfile } from '../data/portfolioData';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: StudentProfile;
  onGoToStudent: () => void;
}

export default function ContactModal({
  isOpen,
  onClose,
  student,
  onGoToStudent,
}: ContactModalProps) {
  const [copiedField, setCopiedField] = useState<'telefono' | 'correo' | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleCopy = async (value: string, field: 'telefono' | 'correo') => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 1800);
    } catch {
      // Clipboard fallback ignored cleanly
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="contact-modal-title"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#0B1220]/45 backdrop-blur-xs"
          />

          {/* Dialog surface */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-xl sm:p-7"
          >
            <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <p className="text-xs font-medium text-[#1D4ED8]">
                  Contacto académico
                </p>
                <h2
                  id="contact-modal-title"
                  className="font-display mt-1 text-xl font-semibold tracking-tight text-[#0B1220]"
                >
                  {student.nombre || 'Estudiante'}
                </h2>
                <p className="mt-0.5 text-xs text-slate-500">
                  {student.carrera}
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Cerrar modal de contacto"
                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-[#0B1220] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8]"
              >
                <X className="h-4.5 w-4.5" aria-hidden="true" />
              </button>
            </div>

            <div className="mt-5 space-y-3">
              {/* Teléfono */}
              <div className="flex items-center justify-between gap-3 rounded-xl border border-stone-200/80 bg-[#FAF8F3] px-4 py-3">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#0D9488]/10 text-[#0F766E]">
                    <Phone className="h-4 w-4" aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-slate-500">Teléfono</p>
                    <p className="font-mono text-sm font-medium text-[#0F172A] tabular-nums truncate">
                      {student.telefono}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy(student.telefono, 'telefono')}
                  aria-label="Copiar teléfono"
                  className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-white hover:text-[#0F766E] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0D9488]"
                >
                  {copiedField === 'telefono' ? (
                    <Check className="h-4 w-4 text-emerald-600" aria-hidden="true" />
                  ) : (
                    <Copy className="h-4 w-4" aria-hidden="true" />
                  )}
                </button>
              </div>

              {/* Correo electrónico */}
              <div className="flex items-center justify-between gap-3 rounded-xl border border-stone-200/80 bg-[#FAF8F3] px-4 py-3">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#1D4ED8]/10 text-[#1D4ED8]">
                    <Mail className="h-4 w-4" aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-slate-500">Correo electrónico</p>
                    <p className="text-sm font-medium text-[#0F172A] truncate">
                      {student.correo}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy(student.correo, 'correo')}
                  aria-label="Copiar correo electrónico"
                  className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-white hover:text-[#1D4ED8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8]"
                >
                  {copiedField === 'correo' ? (
                    <Check className="h-4 w-4 text-emerald-600" aria-hidden="true" />
                  ) : (
                    <Copy className="h-4 w-4" aria-hidden="true" />
                  )}
                </button>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between gap-3 border-t border-slate-100 pt-4">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onGoToStudent();
                }}
                className="cursor-pointer text-xs font-medium text-[#1D4ED8] transition-colors hover:text-[#1E40AF] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8]"
              >
                Ver perfil académico completo
              </button>
              <button
                type="button"
                onClick={onClose}
                className="cursor-pointer rounded-lg bg-[#0B1220] px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-slate-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B1220] whitespace-nowrap shrink-0"
              >
                Cerrar
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
