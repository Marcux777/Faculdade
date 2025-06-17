#!/bin/sh

set -e

echo "Instalando dependências..."
npm install

echo "Gerando cliente Prisma..."
npx prisma generate

echo "Aplicando migrações..."
npx prisma migrate deploy

echo "Compilando código TypeScript..."
npm run build

echo "Iniciando servidor..."
node dist/server.js
