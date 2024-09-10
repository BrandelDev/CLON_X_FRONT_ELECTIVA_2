# Usa una imagen base de Node.js para construir el proyecto Angular
FROM node:20 AS build

# Establece el directorio de trabajo
WORKDIR /usr/src/app

# Copia package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código
COPY . .

# Construye la aplicación Angular
RUN npm run build --prod

# Usa una imagen base de Nginx para servir la aplicación
FROM nginx:alpine

# Copia los archivos construidos a la ubicación de Nginx
COPY --from=build /usr/src/app/dist/clon-x-front/browser /usr/share/nginx/html

# Expone el puerto en el que Nginx estará sirviendo
EXPOSE 80

# Comando para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]