# Dockerfile
FROM node:18-alpine

WORKDIR /app

# Copia dependências
COPY package*.json ./

RUN npm install --omit=dev

# Copia restante
COPY . .

# Porta da aplicação
EXPOSE 3000

CMD ["node", "src/server.js"]