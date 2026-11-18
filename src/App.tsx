import { useEffect, useState } from 'react';
import ContactModal from './components/ContactModal';
import Header, { type ActiveTab } from './components/Header';
import {
  DEFAULT_STUDENT_PROFILE,
  type StudentProfile,
} from './data/portfolioData';
import EstudiantePage from './pages/EstudiantePage';
import InicioPage from './pages/InicioPage';
import OrganizacionPage from './pages/OrganizacionPage';

const STORAGE_KEY = 'portafolio_student_profile_v1';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('inicio');
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [student, setStudent] = useState<StudentProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...DEFAULT_STUDENT_PROFILE, ...JSON.parse(saved) };
      }
    } catch {
      // Fallback to default profile
    }
    return DEFAULT_STUDENT_PROFILE;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(student));
    } catch {
      // Ignore storage errors
    }
  }, [student]);

  return (
    <div className="editorial-canvas flex min-h-screen flex-col text-[#0F172A]">
      <Header
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onOpenProfileModal={() => setIsContactModalOpen(true)}
      />

      <main className="flex-1">
        {activeTab === 'inicio' && <InicioPage />}
        {activeTab === 'organizacion' && <OrganizacionPage />}
        {activeTab === 'estudiante' && (
          <EstudiantePage student={student} onUpdateStudent={setStudent} />
        )}
      </main>

      <footer className="border-t border-stone-200/80 bg-[#FAF8F3]/80">
        <div className="mx-auto flex max-w-[1200px] flex-col items-start justify-between gap-2 px-4 py-5 text-xs text-slate-500 sm:flex-row sm:items-center sm:px-8">
          <span>
            Portafolio Universitario · Organización de Turismo Nacional
            «Aventura en los paisajes»
          </span>
          <span>Caso de estudio y sesiones didácticas</span>
        </div>
      </footer>

      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        student={student}
        onGoToStudent={() => setActiveTab('estudiante')}
      />
    </div>
  );
}
