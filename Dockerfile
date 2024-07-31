# Node.js 18-alpine bazaviy rasmidan foydalanamiz
FROM node:18-alpine

# Ishchi katalogni yaratamiz va unga o'tamiz
WORKDIR /app

# package.json va package-lock.json fayllarini ishchi katalogga nusxalaymiz
COPY package*.json ./

# Node.js qaramliklarini o'rnatamiz
RUN npm install

# Barcha kodni ishchi katalogga nusxalaymiz
COPY . .

# Ilovani build qilish
RUN npm run build

# Build qilingan fayllarni servis qiladigan web serverni o'rnatamiz
RUN npm install -g serve

# Build qilingan ilovani serve qilish
CMD ["serve", "-s", "dist"]

# 3000-portni ochamiz (standart port)
EXPOSE 3004
