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
                cta={[
                    {
                        label: "Escaneo Gratuito",
                        onClick: () => setIsModalOpen(true),
                        variant: 'primary'
                    },
                    {
                        label: "Whatsapp",
                        onClick: () => window.open('https://wa.me/573102957754?text=Hola!%20Me%20interesa%20conocer%20m%C3%A1s%20sobre%20sus%20servicios%20%F0%9F%9A%80', '_blank'),
                        variant: 'whatsapp'
                    }
                ]}
            />

            <LeadMagnetModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </>
    );
};
