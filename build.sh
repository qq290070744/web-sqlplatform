tag=satge-20230807
docker build -t registry.cn-shanghai.aliyuncs.com/jwh/web_sql_platform:$tag .
docker push registry.cn-shanghai.aliyuncs.com/jwh/web_sql_platform:$tag
echo $tag
