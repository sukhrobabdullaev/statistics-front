# Rasm yaratish uchun bazaviy image sifatida Node.js rasmidan foydalanamiz
FROM node:14-alpine

# Ishchi katalog yaratish va unga o'tish
WORKDIR /app

# package.json va package-lock.json fayllarini ishchi katalogga nusxalash
COPY package*.json ./

# Node.js paketlarini o'rnatish
RUN npm install

# Ilovaning barcha kodini ishchi katalogga nusxalash
COPY . .

# Ilovani build qilish
RUN npm run build

# 3001 portni ochish
EXPOSE 3000


# Ilovani ishga tushirish
CMD ["npm", "start"]