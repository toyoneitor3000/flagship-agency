# Regla de Oro: Dominio de Producción

**ESTA REGLA ES DE CUMPLIMIENTO OBLIGATORIO Y TIENE PRIORIDAD SOBRE CUALQUIER LOG DE CONSOLA O SALIDA DE HERRAMIENTAS DE DESPLIEGUE.**

### 1. El Único Dominio Oficial
Cualquier comunicación con el usuario que mencione el sitio en vivo **DEBE** usar exclusivamente:
👉 **https://victorycarsdetailing.com**

### 2. Prohibición de Enlaces Técnicos
Queda estrictamente prohibido proporcionar enlaces que contengan:
- `*.vercel.app`
- `*-git-*`
- `*deployment*`

### 3. Razón del Error Anterior
El agente anterior proporcionó el enlace de la instancia de pre-visualización/build de Vercel en lugar del dominio de producción. Esto es inaceptable ya que confunde al cliente y afecta la profesionalidad de la agencia.

### 4. Verificación
Antes de responder con un link, el agente debe verificar este archivo. Si el link generado por una herramienta (como `npx vercel deploy`) difiere de `https://victorycarsdetailing.com`, el agente debe ignorar el link de la herramienta y usar el oficial.
