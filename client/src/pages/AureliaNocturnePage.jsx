import React, { useState, useEffect } from 'react';
import NocturneHUDNav from '../components/aurelia-nocturne/NocturneHUDNav';
import NocturneHero from '../components/aurelia-nocturne/NocturneHero';
import NocturneCollection from '../components/aurelia-nocturne/NocturneCollection';
import NocturneExhibition from '../components/aurelia-nocturne/NocturneExhibition';
import NocturneCaliberVisualizer from '../components/aurelia-nocturne/NocturneCaliberVisualizer';
import NocturneAtelierLedger from '../components/aurelia-nocturne/NocturneAtelierLedger';
import NocturneFooter from '../components/aurelia-nocturne/NocturneFooter';
import NocturneAllocationModal from '../components/aurelia-nocturne/NocturneAllocationModal';

export default function AureliaNocturnePage() {
  const [isTritium, setIsTritium] = useState(false);
  const [allocationModalOpen, setAllocationModalOpen] = useState(false);
  const [preselectedPiece, setPreselectedPiece] = useState('');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const prevTitle = document.title;
    document.title = 'Aurelia Nocturne • Haute Horlogerie Genève | AJDesigners Concept';

    return () => {
      document.title = prevTitle;
    };
  }, []);

  const handleOpenAllocation = (pieceTitle = '') => {
    if (typeof pieceTitle === 'string' && pieceTitle.length > 0) {
      setPreselectedPiece(pieceTitle);
    }
    setAllocationModalOpen(true);
  };

  return (
    <div className="bg-[#050507] text-gray-100 min-h-screen selection:bg-[#C89B53] selection:text-black font-sans relative">
      {/* 1. HUD & ASTRONOMICAL NAVIGATION */}
      <NocturneHUDNav
        onOpenAllocation={() => handleOpenAllocation('')}
        isTritiumMode={isTritium}
      />

      {/* 2. THE FIRST-SCREEN HERO EXPERIENCE (VIRTUAL CROWN + DAY/NIGHT TRITIUM) */}
      <NocturneHero
        onOpenAllocation={() => handleOpenAllocation('')}
        isTritium={isTritium}
        setIsTritium={setIsTritium}
      />

      {/* 3. THE CURATED COLLECTION (3 BESPOKE REFERENCES) */}
      <NocturneCollection
        onSelectPieceForAllocation={handleOpenAllocation}
      />

      {/* 4. THE THREE-ACT MECHANICAL EXHIBITION (CRUCIBLE, MOONPHASE, FINISSAGE) */}
      <NocturneExhibition />

      {/* 5. INTERACTIVE EXPLODED CALIBER VISUALIZER */}
      <NocturneCaliberVisualizer />

      {/* 6. VALLEE DE JOUX ATELIER & CRYPTOGRAPHIC PROVENANCE LEDGER */}
      <NocturneAtelierLedger />

      {/* 7. HAUTE HORLOGERIE FOOTER & PORTFOLIO BRIDGE */}
      <NocturneFooter
        onOpenAllocation={() => handleOpenAllocation('')}
      />

      {/* 8. ENCRYPTED PRIVATE SALON ALLOCATION APPLICATION MODAL */}
      <NocturneAllocationModal
        isOpen={allocationModalOpen}
        onClose={() => setAllocationModalOpen(false)}
        preselectedPiece={preselectedPiece}
      />
    </div>
  );
}
