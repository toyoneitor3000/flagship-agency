'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ComparisonSliderProps {
  beforeImage: string;
  afterImage: string;
  label?: string;
}

/**
 * Improved before/after comparison slider.
 * - Uses CSS clip‑path for a clean reveal without resizing images.
 * - Supports mouse, touch, and keyboard (range input) interactions.
 * - Adds subtle hover effects and a more polished handle.
 */
export const ComparisonSlider = ({
  beforeImage,
  afterImage,
  label,
}: ComparisonSliderProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50); // 0‑100 %
  const [isDragging, setIsDragging] = useState(false);

  // Update position based on mouse / touch coordinates
  const updatePosition = (clientX: number) => {
    if (!containerRef.current) return;
    const { left, width } = containerRef.current.getBoundingClientRect();
    const percent = ((clientX - left) / width) * 100;
    setPosition(Math.min(Math.max(percent, 0), 100));
  };

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = () => {
    setIsDragging(true);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    updatePosition(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const touch = e.touches[0];
    updatePosition(touch.clientX);
  };

  const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPosition(Number(e.target.value));
  };

  useEffect(() => {
    const imgs = containerRef.current?.querySelectorAll('img');
    imgs?.forEach((img) => (img.draggable = false));
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto my-16 select-none">
      {label && (
        <h3 className="text-xl md:text-2xl text-center mb-8 text-apple-text font-semibold tracking-tight">
          {label}
        </h3>
      )}

      <div
        className="relative w-full h-[600px] md:h-[800px] rounded-[2rem] overflow-hidden shadow-md group border border-apple-border"
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        onMouseUp={handleMouseUp}
        onTouchEnd={handleTouchEnd}
      >
        {/* After image – full background */}
        <div className="absolute inset-0">
          <Image 
            src={afterImage} 
            alt="After" 
            fill 
            unoptimized={true}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
            className="object-cover" 
          />
          <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-md border border-apple-border text-apple-text px-4 py-2 rounded-full text-xs font-semibold tracking-widest shadow-sm">
            DESPUÉS
          </div>
        </div>

        {/* Before image – clipped with clip‑path */}
        <div
          className="absolute inset-0"
          style={{
            clipPath: `polygon(0 0, ${position}% 0, ${position}% 100%, 0 100%)`,
          }}
        >
          <Image 
            src={beforeImage} 
            alt="Before" 
            fill 
            unoptimized={true}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
            className="object-cover" 
          />
          <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md border border-apple-border text-apple-text px-4 py-2 rounded-full text-xs font-semibold tracking-widest shadow-sm">
            ANTES
          </div>
        </div>

        {/* Slider handle */}
        <div
          className="absolute top-0 bottom-0 w-px bg-white z-20 flex items-center justify-center cursor-ew-resize shadow-[0_0_10px_rgba(0,0,0,0.2)]"
          style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        >
          <div className="bg-white backdrop-blur-xl border border-apple-border p-3 rounded-full text-apple-text shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-grab active:cursor-grabbing">
            <div className="flex items-center space-x-1">
              <ChevronLeft size={18} className="text-apple-subtext" />
              <div className="w-0.5 h-6 bg-apple-border rounded-full" />
              <ChevronRight size={18} className="text-apple-subtext" />
            </div>
          </div>
        </div>

        {/* Hidden range input for keyboard users */}
        <input
          type="range"
          min={0}
          max={100}
          value={position}
          onChange={handleRangeChange}
          className="sr-only"
          aria-label="Slider position"
        />
      </div>
    </div>
  );
};

export default ComparisonSlider;
