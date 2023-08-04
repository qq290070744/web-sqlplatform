FROM python:3
#FROM 10.71.94.111/devops/sql_platform:20221209
WORKDIR /app
COPY . /app
RUN /bin/cp sources.list /etc/apt/sources.list
RUN mv soar /bin/soar && chmod +x /bin/soar
RUN apt-get update && apt-get install -y percona-toolkit mariadb-client vim screen iputils-ping telnet
RUN pip install --no-cache-dir -r requirements.txt -i https://mirrors.aliyun.com/pypi/simple/
RUN sed -i s#mirrors.aliyun.com#mirrors.cloud.aliyuncs.com#g /etc/apt/sources.list
EXPOSE 8000
ENV TZ Asia/Shanghai
ENV PYTHONENV prod
CMD [ "uvicorn", "main:app" ,"--host","0.0.0.0","--port","8000"]