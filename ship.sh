#!/bin/bash
set -e # Stop on error

echo "📦 1. Synchronizing with GitHub..."
git add .

# Check if there are changes to commit
if ! git diff --cached --quiet; then
  TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')
  git commit -m "Deployment update: $TIMESTAMP"
  echo "✅ Changes committed."
else
  echo "✨ No new local changes to commit."
fi

echo "🚀 2. Pushing code to repository..."
git push

echo "🏗️  3. Starting Local Build & Vercel Deploy..."
# Execute the existing deploy script
npm run deploy

echo "✅ DONE! Code matches GitHub and is live on Vercel."
