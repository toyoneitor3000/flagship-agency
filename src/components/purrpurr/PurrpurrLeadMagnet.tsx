'use client';

import { useState } from "react";
import { PurrpurrGuide } from "./PurrpurrGuide";
import { LeadMagnetModal } from "./LeadMagnetModal";

export const PurrpurrLeadMagnet = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <PurrpurrGuide
                mode="floating"
                tip="SYSTEM_ALERT: Performance optimization required. Execute full diagnostic?"
                cta={{
                    label: "Escaneo Gratuito",
                    onClick: () => setIsModalOpen(true)
                }}
            />

            <LeadMagnetModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </>
    );
};
