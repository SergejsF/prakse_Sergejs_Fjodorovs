FROM node:18-alpine

# Darba direktorija iestatīšana
WORKDIR /app

# Kopē tikai package failus un uzstāda atkarības
COPY package*.json ./
RUN npm ci --only=production

# Kopē pārējo projekta saturu
COPY . .

# Lietotne izmanto portu 3001
EXPOSE 3001

# Sāk serveri ar npm start
CMD ["npm", "start"]
