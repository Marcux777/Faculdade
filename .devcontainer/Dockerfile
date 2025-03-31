# Utiliza uma imagem oficial do Node.js (versão 16 com base no Alpine para uma imagem mais leve)
FROM node:16-alpine

# instala o Git
RUN apk add --no-cache git

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos de dependências para o diretório de trabalho
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante dos arquivos da aplicação para o container
COPY . .

# Expõe a porta que a aplicação utilizará (por exemplo, 3000)
EXPOSE 3000

# Comando para iniciar a aplicação (ajuste conforme necessário, por exemplo, "npm start")
CMD ["npm", "start"]
