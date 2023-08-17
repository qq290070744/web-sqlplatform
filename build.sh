tag=satge-20230817.2
npm run build:stage
docker build -t registry.cn-shanghai.aliyuncs.com/jwh/web_sql_platform:$tag .
docker push registry.cn-shanghai.aliyuncs.com/jwh/web_sql_platform:$tag
echo $tag
