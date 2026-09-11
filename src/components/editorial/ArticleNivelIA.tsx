"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, Share2, Check, ShieldCheck, Zap, 
  ExternalLink, X, Building2, Sparkles, MessageCircle, Mail
} from "lucide-react";

export const ArticleNivelIA = () => {
  const [showAuthorModal, setShowAuthorModal] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(progress);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <article className="min-h-screen bg-[#FAF9F5] dark:bg-[#0C0D0E] text-[#1A1A1A] dark:text-[#E8E6E3] font-sans antialiased selection:bg-[#E8DCC4] dark:selection:bg-[#2A2D30] transition-colors duration-300">
      
      {/* BARRA DE PROGRESO DE LECTURA */}
      <div 
        className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-amber-600 via-indigo-600 to-[#00FF9C] z-50 transition-all duration-150"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* HEADER EDITORIAL SUPERIOR ESTILO NEW YORK TIMES */}
      <div className="border-b border-zinc-300/70 dark:border-zinc-800/80 bg-[#FAF9F5]/90 dark:bg-[#0C0D0E]/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <Link 
            href="/news" 
            className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>The Purrpurr Dispatch</span>
          </Link>

          <div className="flex items-center gap-3">
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono border border-zinc-300 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copied ? "Enlace copiado" : "Compartir"}</span>
            </button>
            <button 
              onClick={() => setShowAuthorModal(true)}
              className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 hover:opacity-90 transition-opacity cursor-pointer shadow-sm"
            >
              Autor
            </button>
          </div>
        </div>
      </div>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        
        {/* MASTHEAD DE EDICIÓN ESPECIAL */}
        <header className="text-center mb-10 pb-8 border-b-2 border-zinc-900 dark:border-zinc-100">
          <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-widest text-zinc-500 border-b border-zinc-200 dark:border-zinc-800 pb-2 mb-6">
            <span>Investigación Tecnológica & Negocios Digitales</span>
            <span>Vol. IV • No. 28</span>
            <span>Septiembre 2026</span>
          </div>

          <p className="text-[11px] font-mono tracking-[0.25em] uppercase text-amber-700 dark:text-amber-400 font-bold mb-3">
            Reportaje Especial • Ensayo de Portada
          </p>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] text-zinc-950 dark:text-white mb-6">
            El Mito de los 30 Segundos y el Verdadero &ldquo;Nivel IA&rdquo;
          </h1>

          <p className="font-serif italic text-lg sm:text-2xl text-zinc-600 dark:text-zinc-300 max-w-2xl mx-auto leading-snug">
            Por qué las empresas que pretenden dominar su mercado no se construyen con un prompt descartable, sino con un sistema operativo digital.
          </p>

          {/* BYLINE CON PERFIL INTERACTIVO DE CAMILO TOLOZA */}
          <div className="mt-8 pt-6 border-t border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setShowAuthorModal(true)}
                className="group flex items-center gap-2.5 text-left text-zinc-900 dark:text-white font-bold hover:text-indigo-600 dark:hover:text-[#00FF9C] transition-colors cursor-pointer"
              >
                <div className="w-8 h-8 rounded-full bg-zinc-950 dark:bg-zinc-100 text-white dark:text-zinc-900 flex items-center justify-center font-serif text-sm font-black shadow-sm group-hover:scale-105 transition-transform">
                  CT
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="underline decoration-zinc-400 dark:decoration-zinc-600 underline-offset-4">Por Camilo Toloza</span>
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  </div>
                  <span className="text-[10px] font-normal text-zinc-500 block">Arquitecto Digital & Fundador de Purrpurr</span>
                </div>
              </button>
            </div>

            <div className="flex items-center gap-4 text-[11px]">
              <span>8 min de lectura</span>
              <span>•</span>
              <span>Bogotá, Colombia</span>
            </div>
          </div>
        </header>

        {/* TL;DR / SÍNTESIS EJECUTIVA */}
        <div className="my-8 p-6 bg-zinc-100 dark:bg-zinc-900/60 border-l-4 border-zinc-900 dark:border-zinc-200 rounded-r-xl font-serif text-sm sm:text-base leading-relaxed text-zinc-700 dark:text-zinc-300 italic">
          <strong className="not-italic font-sans text-xs uppercase tracking-wider font-bold text-zinc-900 dark:text-zinc-100 block mb-1">
            En Síntesis:
          </strong>
          La masificación de herramientas generativas ha creado la ilusión de que un negocio en internet puede resolverse en medio minuto con un botón. Mientras el mercado se inunda de maquetas rotas y costos ocultos de plataformas tradicionales, los líderes que realmente facturan están adoptando un enfoque opuesto: utilizar la inteligencia artificial como acelerador de ingeniería para desplegar sistemas propietarios, transaccionales y blindados.
        </div>

        {/* CUERPO DEL ARTÍCULO */}
        <div className="space-y-8 text-base sm:text-lg leading-relaxed text-zinc-800 dark:text-zinc-200 font-serif">
          
          {/* PRIMER PÁRRAFO CON CAPITULAR */}
          <p className="leading-relaxed">
            <span className="float-left font-serif text-6xl sm:text-7xl leading-none pr-3 pt-1 font-black text-zinc-950 dark:text-white">
              N
            </span>
            o pasa un solo día en 2026 sin que un fundador, un comerciante o un director de operaciones vea un video de quince segundos prometiendo la utopía definitiva: <em>&ldquo;Escribe tres palabras y una inteligencia artificial construirá tu tienda online completa en treinta segundos&rdquo;</em>. El auge de generadores como Lovable, Bolt.new, v0 o las herramientas automáticas de Wix y Hostinger ha alimentado una expectativa colectiva tan seductora como peligrosa: la idea de que la arquitectura de un negocio digital ha dejado de requerir rigor técnico.
          </p>

          <p>
            Sin embargo, en las mesas de trabajo donde se revisan balances contables, carritos abandonados y conciliaciones bancarias, la realidad cuenta una historia radicalmente distinta. Lo que la inteligencia artificial produce en treinta segundos no es una empresa; es un cascarón visual. Una maqueta de píxeles estáticos que se desmorona en el instante exacto en que un cliente de carne y hueso intenta realizar una transacción real con una tarjeta débito en Colombia.
          </p>

          {/* SECCIÓN I */}
          <h2 className="font-sans font-black text-2xl sm:text-3xl text-zinc-950 dark:text-white pt-8 tracking-tight border-t border-zinc-200 dark:border-zinc-800">
            I. La Ilusión de la Inmediatez y el Fenómeno del &ldquo;Código Slop&rdquo;
          </h2>

          <p>
            En la industria del software internacional, el año 2026 ha consolidado un término revelador: <em>&ldquo;AI Slop&rdquo;</em>. Describe aquel código generado mecánicamente por modelos de lenguaje que parece impecable en una captura de pantalla, pero que carece de memoria arquitectónica, coherencia relacional y auditoría de seguridad.
          </p>

          <p>
            Cualquiera puede pedirle a una IA que dibuje una cuadrícula de productos con un botón de compra. Pero la IA no posee cuenta bancaria, no firma contratos de agregación financiera y no entiende las particularidades del ecosistema transaccional local.
          </p>

          {/* PULL QUOTE 1 */}
          <blockquote className="my-10 py-6 border-y-2 border-zinc-900 dark:border-zinc-100 text-center font-serif italic text-xl sm:text-2xl text-zinc-950 dark:text-white leading-snug">
            &ldquo;Pedirle a una IA generativa que construya tu tienda sin supervisión de ingeniería es el equivalente a imprimir un plano arquitectónico en una servilleta y esperar que soporte un terremoto.&rdquo;
          </blockquote>

          {/* SECCIÓN II */}
          <h2 className="font-sans font-black text-2xl sm:text-3xl text-zinc-950 dark:text-white pt-8 tracking-tight border-t border-zinc-200 dark:border-zinc-800">
            II. El Muro Técnico: Lo que la IA No Resuelve
          </h2>

          <p>
            Cuando un negocio real pretende facturar a diario, se estrella inevitablemente contra cinco barreras técnicas que ninguna herramienta generativa autónoma resuelve:
          </p>

          <div className="space-y-4 font-sans text-sm sm:text-base my-6">
            <div className="p-5 rounded-xl bg-zinc-100 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800">
              <h3 className="font-bold text-zinc-950 dark:text-white text-base mb-1 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-indigo-500" />
                1. La Pasarela Local y la Firma Criptográfica
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 font-serif text-sm leading-relaxed">
                Conectar pasarelas como Wompi (Bancolombia) o Bold no es pegar un enlace de pago. Requiere programar un webhook en el servidor capaz de validar firmas criptográficas (<code>checksum / event_signature</code>). Sin este protocolo escrito a nivel de ingeniería, un tercero malintencionado puede simular pagos aprobados por PSE y despachar pedidos fraudulentos sin que ingrese un solo peso a la cuenta.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-zinc-100 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800">
              <h3 className="font-bold text-zinc-950 dark:text-white text-base mb-1 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-emerald-500" />
                2. Legalidad Tributaria y Facturación DIAN
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 font-serif text-sm leading-relaxed">
                En Colombia, toda venta formal está sujeta a la <strong>Resolución 165 de la DIAN</strong> y a la <strong>Ley 1581 de 2012</strong> (Habeas Data). Una tienda que no emita soportes electrónicos válidos o que almacene datos de tarjetahabientes sin políticas de cifrado se expone a sanciones administrativas severas.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-zinc-100 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800">
              <h3 className="font-bold text-zinc-950 dark:text-white text-base mb-1 flex items-center gap-2">
                <Zap className="w-5 h-5 text-amber-500" />
                3. Concurrencia de Inventario y Control de Stock
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 font-serif text-sm leading-relaxed">
                Si dos clientes compran el último par de zapatos al mismo segundo, una maqueta generativa colapsa o sobrevende. Se requiere una base de datos relacional con bloqueo transaccional (ACID) y estados de orden automatizados.
              </p>
            </div>
          </div>

          {/* SECCIÓN III */}
          <h2 className="font-sans font-black text-2xl sm:text-3xl text-zinc-950 dark:text-white pt-8 tracking-tight border-t border-zinc-200 dark:border-zinc-800">
            III. La Economía Oculta de Plataformas Tradicionales
          </h2>

          <p>
            Frente al fracaso de las herramientas gratuitas de IA, la respuesta instintiva de muchos comerciantes es recurrir a las plataformas clásicas como Shopify o WordPress. Pero aquí surge la segunda trampa: el <em>impuesto invisible</em> a la operación.
          </p>

          <p>
            En Colombia, donde Shopify Payments no opera nativamente, una tienda mediana sobre Shopify enfrenta un drenaje financiero constante:
          </p>

          {/* TABLA COMPARATIVA EDITORIAL */}
          <div className="my-8 overflow-x-auto">
            <table className="w-full text-left font-sans text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b-2 border-zinc-900 dark:border-zinc-100 text-zinc-900 dark:text-white font-mono uppercase tracking-wider">
                  <th className="py-3 pr-4">Concepto</th>
                  <th className="py-3 px-4">Shopify Tradicional</th>
                  <th className="py-3 pl-4 text-indigo-600 dark:text-[#00FF9C] font-bold">Sistema Purrpurr (Next.js)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800 text-zinc-600 dark:text-zinc-300">
                <tr>
                  <td className="py-3 pr-4 font-semibold text-zinc-900 dark:text-white">Suscripción Base</td>
                  <td className="py-3 px-4 font-mono">$39 USD/mes (~$1.950.000 COP/año)</td>
                  <td className="py-3 pl-4 font-mono text-emerald-600 dark:text-[#00FF9C] font-bold">$0 COP (Código Propio)</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-semibold text-zinc-900 dark:text-white">Penalización Pasarela</td>
                  <td className="py-3 px-4 font-mono">2.0% extra sobre cada venta</td>
                  <td className="py-3 pl-4 font-mono text-emerald-600 dark:text-[#00FF9C] font-bold">0% extra (Tarifa directa Wompi)</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-semibold text-zinc-900 dark:text-white">Apps de Reseñas / WhatsApp</td>
                  <td className="py-3 px-4 font-mono">~$40 USD/mes (~$2.000.000 COP/año)</td>
                  <td className="py-3 pl-4 font-mono text-emerald-600 dark:text-[#00FF9C] font-bold">Incluidas nativamente</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-semibold text-zinc-900 dark:text-white">Propiedad del Código</td>
                  <td className="py-3 px-4">Alquiler forzado (Vendor Lock-in)</td>
                  <td className="py-3 pl-4 font-bold text-zinc-900 dark:text-white">100% tuyo en GitHub</td>
                </tr>
                <tr className="bg-zinc-100/70 dark:bg-zinc-900/70 font-bold">
                  <td className="py-3.5 pr-4 text-zinc-950 dark:text-white">Costo Operativo Anual</td>
                  <td className="py-3.5 px-4 font-mono text-rose-600">~$4.500.000 – $6.000.000 COP</td>
                  <td className="py-3.5 pl-4 font-mono text-emerald-600 dark:text-[#00FF9C] text-base">$1.260.000 COP / Año</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* SECCIÓN IV */}
          <h2 className="font-sans font-black text-2xl sm:text-3xl text-zinc-950 dark:text-white pt-8 tracking-tight border-t border-zinc-200 dark:border-zinc-800">
            IV. La Tesis del &ldquo;Nivel IA&rdquo; en Purrpurr
          </h2>

          <p>
            Frente a este escenario, en Purrpurr planteamos una postura técnica tajante: <strong>no le tememos a la inteligencia artificial; somos sus directores de orquesta</strong>.
          </p>

          <p>
            El verdadero <em>&ldquo;Nivel IA&rdquo;</em> no consiste en entregarle la tarjeta de crédito a una plataforma de moda para que escupa una plantilla genérica. Consiste en utilizar la inteligencia artificial como un multiplicador interno de ingeniería:
          </p>

          <ul className="list-disc pl-6 space-y-2 font-serif">
            <li>Lo que a una consultora tradicional le toma ocho semanas y quince millones de pesos en picar código repetitivo, nosotros lo resolvemos en tres semanas.</li>
            <li>Esa ganancia de eficiencia no se traduce en código descartable, sino en <strong>reducir radicalmente el costo de acceso a una arquitectura de élite</strong>.</li>
            <li>El cliente no paga por las horas que una máquina tarda en maquetar un botón; paga por la <strong>arquitectura transaccional, la seguridad jurídica y el respaldo de un equipo humano</strong> que responde su llamada cuando el dinero está en juego.</li>
          </ul>

          {/* SECCIÓN V */}
          <h2 className="font-sans font-black text-2xl sm:text-3xl text-zinc-950 dark:text-white pt-8 tracking-tight border-t border-zinc-200 dark:border-zinc-800">
            V. De Páginas Web a Sistemas Operativos Digitales
          </h2>

          <p>
            Las empresas que liderarán sus categorías en los próximos años no tienen &ldquo;una página web&rdquo;. Tienen un <strong>sistema operativo digital</strong>. Una plataforma que sincroniza ventas, catálogo, inventario, atención por WhatsApp, fidelización y analítica en un solo núcleo propietario, veloz y sin intermediarios que muerdan sus márgenes.
          </p>

          <p>
            La inteligencia artificial es el motor más potente que ha conocido la historia del software. Pero un motor de Fórmula 1 sin un chasis de ingeniería, sin frenos y sin piloto, solo sirve para estrellarse más rápido.
          </p>

          <p className="font-sans font-bold text-zinc-950 dark:text-white pt-4">
            Esa es la diferencia entre un prototipo de treinta segundos y una empresa construida para perdurar.
          </p>

        </div>

        {/* FIRMA DE AUTOR Y TARJETA AL PIE */}
        <footer className="mt-16 pt-10 border-t-2 border-zinc-900 dark:border-zinc-100">
          <div className="bg-zinc-100 dark:bg-zinc-900 p-6 sm:p-8 rounded-2xl flex flex-col sm:flex-row items-center gap-6">
            <div className="w-20 h-20 rounded-2xl bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 flex items-center justify-center font-serif text-3xl font-black shrink-0 shadow-lg">
              CT
            </div>
            
            <div className="space-y-2 text-center sm:text-left">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <h4 className="font-sans font-bold text-lg text-zinc-900 dark:text-white">Camilo Toloza</h4>
                <span className="hidden sm:inline text-zinc-400">•</span>
                <span className="text-xs font-mono text-zinc-500">Fundador & Creative Lead en Purrpurr</span>
              </div>
              <p className="font-serif text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Arquitecto digital con más de 12 años transformando marcas e infraestructuras técnicas en sistemas escalables. Lidera el desarrollo de Purrpurr y ecosistemas como Speedlight Culture y Financars.
              </p>
              <button
                onClick={() => setShowAuthorModal(true)}
                className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-indigo-600 dark:text-[#00FF9C] hover:underline pt-1 cursor-pointer"
              >
                <span>Conoce el perfil completo y el propósito de Purrpurr</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* CTA FINAL DE CONVERSIÓN */}
          <div className="mt-12 text-center p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-zinc-900 to-black text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <Sparkles className="w-40 h-40 text-white" />
            </div>
            <div className="relative z-10 max-w-xl mx-auto space-y-4">
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#00FF9C] font-bold">
                Construcción de Alto Impacto
              </span>
              <h3 className="font-serif text-2xl sm:text-4xl font-black leading-tight">
                ¿Tu negocio necesita un juguete de IA o un sistema operativo real?
              </h3>
              <p className="text-zinc-400 text-sm font-sans leading-relaxed">
                Desplegamos tu infraestructura de E-Commerce en Next.js con pasarela Wompi/Bold nativa, código propietario y soporte garantizado.
              </p>
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  href="/#invitation"
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#00FF9C] text-zinc-950 font-bold text-xs uppercase tracking-wider hover:bg-[#00dda0] transition-transform hover:scale-105 shadow-lg shadow-[#00FF9C]/20"
                >
                  Iniciar Proyecto
                </Link>
                <Link
                  href="/cockpit/proposals"
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-zinc-800 text-white font-bold text-xs uppercase tracking-wider hover:bg-zinc-700 transition-colors border border-zinc-700"
                >
                  Ver Cotizador
                </Link>
              </div>
            </div>
          </div>
        </footer>

      </main>

      {/* MODAL DE BIOGRAFÍA EMPRESARIAL & PROPÓSITO DE PURRPURR */}
      <AnimatePresence>
        {showAuthorModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl max-w-2xl w-full p-6 sm:p-10 shadow-2xl overflow-y-auto max-h-[90vh] relative"
            >
              <button
                onClick={() => setShowAuthorModal(false)}
                className="absolute top-6 right-6 p-2 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-start gap-5 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 flex items-center justify-center font-serif text-2xl font-black shrink-0 shadow-md">
                  CT
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-bold font-sans text-zinc-950 dark:text-white">Camilo Toloza</h3>
                    <span className="text-[10px] font-mono bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full font-bold">
                      Verified Author
                    </span>
                  </div>
                  <p className="text-xs font-mono text-zinc-500 mt-0.5">
                    Fundador & Arquitecto Digital en Purrpurr • Bogotá, Colombia
                  </p>
                </div>
              </div>

              {/* TRAYECTORIA Y PERFIL EMPRESARIAL */}
              <div className="space-y-6 text-sm text-zinc-700 dark:text-zinc-300 font-sans leading-relaxed">
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-widest text-zinc-400 font-bold mb-2">
                    Perfil Profesional
                  </h4>
                  <p>
                    Arquitecto digital y líder creativo con más de 12 años de experiencia transformando visiones complejas en ecosistemas digitales escalables. Especialista en orquestar infraestructuras técnicas de alto rendimiento y estrategias de marca que fusionan la ingeniería de vanguardia con una estética de nivel superior.
                  </p>
                </div>

                {/* HITOS Y PROYECTOS */}
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-widest text-zinc-400 font-bold mb-2">
                    Ecosistemas & Proyectos Liderados
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200/60 dark:border-zinc-700/60">
                      <span className="font-bold block text-zinc-900 dark:text-white">Purrpurr Development</span>
                      <span className="text-zinc-500">Agencia boutique de software e infraestructura digital a medida.</span>
                    </div>
                    <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200/60 dark:border-zinc-700/60">
                      <span className="font-bold block text-zinc-900 dark:text-white">Speedlight Ecosystem</span>
                      <span className="text-zinc-500">Comunidad automotriz y plataforma marketplace de vehículos.</span>
                    </div>
                    <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200/60 dark:border-zinc-700/60">
                      <span className="font-bold block text-zinc-900 dark:text-white">Victory Cars Detailing</span>
                      <span className="text-zinc-500">Ecosistema web de estética y protección automotriz de lujo.</span>
                    </div>
                    <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200/60 dark:border-zinc-700/60">
                      <span className="font-bold block text-zinc-900 dark:text-white">Financars</span>
                      <span className="text-zinc-500">Fintech automotriz con modelo de custodia y subasta invertida.</span>
                    </div>
                  </div>
                </div>

                {/* EL PROPÓSITO DE PURRPURR */}
                <div className="p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-900/50">
                  <h4 className="text-xs font-mono uppercase tracking-widest text-indigo-700 dark:text-indigo-400 font-bold mb-1.5 flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5" />
                    El Propósito de Purrpurr
                  </h4>
                  <p className="text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed">
                    Purrpurr nació para erradicar la mediocridad técnica y el cobro abusivo de intermediarios en el comercio digital. Nuestra misión es dotar a empresas y fundadores de <strong>Sistemas Operativos Digitales</strong>: plataformas ultrarrápidas, con código propietario que les pertenece al 100%, conectadas directamente al sistema bancario y aceleradas por inteligencia artificial de vanguardia, sin depender de plantillas vulnerables ni de mensualidades en dólares.
                  </p>
                </div>

                {/* ACCIONES Y CONTACTO */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-zinc-200 dark:border-zinc-800">
                  <a
                    href="https://wa.me/573102957754?text=Hola%20Camilo,%20leí%20tu%20artículo%20sobre%20el%20Nivel%20IA%20y%20quiero%20conversar%20sobre%20un%20proyecto"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Hablar por WhatsApp
                  </a>

                  <a
                    href="mailto:camilotolosa1136@gmail.com?subject=Conversación%20sobre%20Sistemas%20Operativos%20Digitales%20Purrpurr"
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-white font-bold text-xs transition-colors border border-zinc-300 dark:border-zinc-700"
                  >
                    <Mail className="w-4 h-4" />
                    Enviar Correo
                  </a>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </article>
  );
};
