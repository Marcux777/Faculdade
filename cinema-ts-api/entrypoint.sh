#!/bin/sh

set -e

# Garante que o diretório de uploads exista e tenha permissões adequadas
echo "Configurando diretório de uploads..."
mkdir -p /app/uploads
chmod -R 777 /app/uploads

# Adiciona o curl
apk add --no-cache curl

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
