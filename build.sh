tag=20230721.1
docker build -t registry.cn-shanghai.aliyuncs.com/jwh/sql_platform:$tag .
docker push registry.cn-shanghai.aliyuncs.com/jwh/sql_platform:$tag
echo $tag
