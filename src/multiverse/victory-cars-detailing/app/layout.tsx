import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import React from 'react';
import GlobalLayoutComponents from './components/GlobalLayoutComponents';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });

export const metadata: Metadata = {
  title: 'Victory Cars S.A.S. | Detailing & Paint Protection',
  description: 'El Aliado Profesional que Lleva tu Vehículo a su Máxima Expresión de Brillo y Detalle.',
};

// Forced hot reload to fix CSS caching
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={`${inter.variable} font-sans bg-brand-dark-blue text-brand-slate selection:bg-brand-cyan selection:text-brand-dark-blue antialiased`}>
        {children}
        <GlobalLayoutComponents />
      </body>
    </html>
  );
}
