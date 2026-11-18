export interface SesionDidacticaProps {
  onBack?: () => void;
}

export default function SesionDidactica1({ onBack }: SesionDidacticaProps) {
  return (
    <section className="mx-auto max-w-[1200px] px-4 py-12 sm:px-8">
      <div className="rounded-2xl border border-slate-200 bg-white p-8">
        <h1 className="font-display text-3xl font-bold text-[#0B1220]">
          Sesión didáctica 1
        </h1>
        <p className="mt-3 text-sm text-slate-600">
          Archivo preparado para el contenido de la Sesión didáctica 1.
        </p>
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="mt-6 cursor-pointer rounded-lg bg-[#0B1220] px-4 py-2 text-xs font-medium text-white"
          >
            Volver al inicio
          </button>
        )}
      </div>
    </section>
  );
}
