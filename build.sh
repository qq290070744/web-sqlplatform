env=stage
tag=${env}-20240319
npm run build:${env}
docker build -t registry.cn-shanghai.aliyuncs.com/jwh/web_sql_platform:$tag .
docker push registry.cn-shanghai.aliyuncs.com/jwh/web_sql_platform:$tag
echo $tag
