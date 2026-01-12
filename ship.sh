#!/bin/bash
set -e # Stop on error

echo "📦 1. Preparando cambios para GitHub..."
git add .

# Check if there are changes to commit
if ! git diff --cached --quiet; then
  # Use provided message if available, otherwise use a generic but natural one
  if [ -n "$1" ]; then
    COMMIT_MSG="$1"
  else
    # Lista de mensajes naturales para variabilidad
    MESSAGES=(
      "Actualización de funciones y refinamiento de la interfaz"
      "Mejoras de rendimiento y ajustes en la experiencia de usuario"
      "Sincronización de cambios y optimización del sistema"
      "Nuevos ajustes implementados en el puente de mando"
    )
    # Selecciona uno al azar si no hay mensaje
    COMMIT_MSG="${MESSAGES[$RANDOM % ${#MESSAGES[@]}]}"
  fi
  git commit -m "$COMMIT_MSG"
  echo "✅ Cambios confirmados: $COMMIT_MSG"
else
  echo "✨ Todo está al día. No hay cambios pendientes."
fi

echo "🚀 2. Sincronizando con el repositorio remoto..."
git push

echo "🚀 El código está en GitHub. Vercel iniciará el despliegue automático."

echo "✅ ¡LISTO! El código está sincronizado y en camino a producción."
