FROM node:18-alpine

# Darba direktorija iestatīšana
WORKDIR /app

# Kopē tikai package failus un uzstāda atkarības (iekļauj dev dependences, nodemon nepieciešams dev režīmā)
COPY package*.json ./
# Izmantojam npm install vietā npm ci, lai izstrādes attēlā nebūtu jāprasa lockfailu sinhronizācija
RUN npm install

# Kopē pārējo projekta saturu
COPY . .

# Lietotne izmanto portu 3001
EXPOSE 3001

# Sāk serveri ar npm start
CMD ["npm", "start"]
