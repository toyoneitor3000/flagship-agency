'use client';

import { useState } from 'react';
import { Building3D } from '@/components/purrpurr/Building3D';

export default function ArchitectureClientPage() {
    const [growthLevel, setGrowthLevel] = useState(100);
    const [selectedFloor, setSelectedFloor] = useState<number | null>(null);

    return (
        <Building3D
            growthLevel={growthLevel}
            setGrowthLevel={setGrowthLevel}
            selectedFloor={selectedFloor}
            setSelectedFloor={setSelectedFloor}
        />
    );
}
