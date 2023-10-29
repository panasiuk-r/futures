FROM node:20-alpine
WORKDIR /app
COPY jest.config.js package.json tsconfig.json ./
COPY src ./src
RUN npm install
CMD ["npm", "start"]
EXPOSE 3001