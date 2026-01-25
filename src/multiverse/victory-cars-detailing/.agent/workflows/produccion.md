---
description: Automatización de despliegue a producción (GitHub + Vercel handling)
---


// turbo-all

1. Agregar todos los cambios
git add .

2. Realizar commit (Mensaje automático)
git commit -m "Producción: Actualización y despliegue"

3. Subir cambios a GitHub (Repo remoto)
git push origin main

4. Ejecutar procesamiento local (Build)
npm run deploy

5. Verificación de Dominio (CRÍTICO)
Al finalizar, NO dar el link que sale en la consola de Vercel. 
El link oficial SIEMPRE es: https://victorycarsdetailing.com
