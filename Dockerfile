# Initial image
FROM node:18 AS builder

WORKDIR /app
 
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Final image
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --only=production

COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["node", "dist/index.js"]
