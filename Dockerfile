# multistage docker build, to reduce overall image size
FROM node:12.4.0-alpine as builder

# create directory to hold the code
WORKDIR /usr/src/app

# copy package.json and run install before copying the source code
# docker will cache this time consuming step and it won't rerun unless new packages are added
COPY package*.json ./
RUN npm install

# copy over the source code
COPY . .

# build the distribution version of code
RUN npm run build

FROM nginx:1.17.8

# copy the distribution folder to nginx root 
COPY --from=builder /usr/src/app/dist  /usr/share/nginx/html/

CMD ["nginx", "-g", "daemon off;"]
