FROM registry.cn-shanghai.aliyuncs.com/jwh/nginx:1.25
ADD dist /usr/share/nginx/html
ADD default.conf /etc/nginx/conf.d
EXPOSE 80
ENTRYPOINT nginx -g "daemon off;"