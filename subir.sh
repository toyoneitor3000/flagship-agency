#!/bin/bash
set -e # Stop on error

echo "📦 1. Preparando cambios para GitHub..."
git add .

# Check if there are changes to commit
if ! git diff --cached --quiet; then
  # Use provided message if available, otherwise PROMPT for one
  if [ -n "$1" ]; then
    COMMIT_MSG="$1"
  else
    # Prompt user for input, allowing for voice dictation or manual entry
    echo "📝 Por favor, ingresa un mensaje detallado para el commit (esto será noticia pública):"
    read -r USER_MSG
    
    if [ -n "$USER_MSG" ]; then
        COMMIT_MSG="$USER_MSG"
    else
        echo "⚠️ No se ingresó mensaje. Usando fecha y hora como referencia."
        COMMIT_MSG="Actualización: $(date '+%Y-%m-%d %H:%M:%S')"
    fi
  fi
  
  git commit -m "$COMMIT_MSG"
  echo "✅ Cambios confirmados: $COMMIT_MSG"
else
  echo "✨ Todo está al día en git. Procediendo al despliegue..."
fi

echo "🚀 2. Sincronizando con el repositorio remoto..."
git push

echo "⚙️  3. Iniciando despliegue manual desde el equipo local (npm run deploy)..."
npm run deploy

echo "✅ ¡LISTO! El código ha sido procesado, subido y deplegado a producción."
