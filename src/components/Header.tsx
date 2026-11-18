import { User } from 'lucide-react';
import { motion } from 'motion/react';

export type ActiveTab = 'inicio' | 'organizacion' | 'estudiante';

interface HeaderProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  onOpenProfileModal: () => void;
}

const NAV_ITEMS: { id: ActiveTab; label: string }[] = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'organizacion', label: 'Organización' },
  { id: 'estudiante', label: 'Estudiante' },
];

export default function Header({
  activeTab,
  onSelectTab,
  onOpenProfileModal,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-stone-200/80 bg-[#FAF8F3]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-4 px-4 py-3.5 sm:gap-8 sm:px-8">
        {/* Zone 1: Brand wordmark (single-line text) */}
        <button
          type="button"
          onClick={() => onSelectTab('inicio')}
          className="font-display cursor-pointer text-sm font-bold tracking-tight text-[#0F172A] transition-colors hover:text-[#1D4ED8] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1D4ED8] whitespace-nowrap shrink-0 sm:text-lg lg:text-xl"
        >
          Proyecto Socio Tecnológico
        </button>

        {/* Zone 2: Center navigation links */}
        <nav
          aria-label="Navegación principal"
          className="flex items-center gap-4 sm:gap-8"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectTab(item.id)}
                aria-current={isActive ? 'page' : undefined}
                className={`relative cursor-pointer py-1.5 text-sm font-medium transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1D4ED8] whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'text-[#0F172A]'
                    : 'text-slate-500 hover:text-[#0F172A]'
                }`}
              >
                {item.label}
                {isActive && (
                  <motion.span
                    layoutId="active-nav-underline"
                    transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                    className="absolute inset-x-0 -bottom-[1px] h-[2px] bg-gradient-to-r from-[#1D4ED8] via-[#0D9488] to-[#D97706]"
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Right profile icon button */}
        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={onOpenProfileModal}
            aria-label="Ver datos de contacto del estudiante"
            title="Contacto del estudiante"
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-stone-200 bg-white text-[#1D4ED8] shadow-xs transition-all duration-150 hover:border-[#0D9488]/50 hover:bg-[#0D9488] hover:text-white hover:shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D4ED8]"
          >
            <User className="h-4.5 w-4.5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </header>
  );
}
