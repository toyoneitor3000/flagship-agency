import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Términos de Servicio',
};

export default function TermsPage() {
  return (
    <>
      <h1>Términos de Servicio</h1>
      <p>Bienvenido a Flagship Platform.</p>
      <h2>1. Aceptación</h2>
      <p>Al acceder a este sitio web, aceptas estar vinculado por estos términos de servicio y todas las leyes y regulaciones aplicables.</p>
      <h2>2. Licencia de Uso</h2>
      <p>Se concede permiso para descargar temporalmente una copia de los materiales para visualización transitoria personal y no comercial.</p>
      <h2>3. Limitaciones</h2>
      <p>En ningún caso Flagship Platform será responsable de daños derivados del uso o la imposibilidad de usar los materiales en este sitio.</p>
    </>
  );
}