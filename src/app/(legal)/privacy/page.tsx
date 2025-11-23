import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Política de Privacidad',
};

export default function PrivacyPage() {
  return (
    <>
      <h1>Política de Privacidad</h1>
      <p>Última actualización: {new Date().toLocaleDateString()}</p>
      <h2>1. Recolección de Datos</h2>
      <p>Recopilamos información mínima necesaria para operar el servicio, incluyendo datos técnicos de navegación y datos proporcionados voluntariamente en formularios.</p>
      <h2>2. Uso de la Información</h2>
      <p>Utilizamos tus datos exclusivamente para mejorar la experiencia del usuario y comunicarnos contigo sobre actualizaciones del servicio.</p>
      <h2>3. Protección de Datos</h2>
      <p>Implementamos medidas de seguridad de estándar industrial para proteger tu información contra accesos no autorizados.</p>
    </>
  );
}