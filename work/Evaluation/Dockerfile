FROM    nginx:stable-alpine
COPY    ./   /build/
ARG     ENV=production
ARG     TOKEN=1
RUN     set -xe;\
        cd /build;\
        sed -i 's/dl-cdn.alpinelinux.org/mirrors.ustc.edu.cn/g' /etc/apk/repositories;\
        apk update;\
        apk add nodejs npm curl;\
        curl -H "AUTHORIZATION:Bearer $TOKEN" -o src/config.js http://config.stuhome.com/$ENV/kase/config.js;\
        cat src/config.js;\
        npm install --registry=https://registry.npm.taobao.org;\
        npm run build;\
        apk del nodejs npm curl;\
        cp -r dist/* /usr/share/nginx/html/
