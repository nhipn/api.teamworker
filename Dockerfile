FROM mysql:8.0

COPY ./teamworker.sql /docker-entrypoint-initdb.d/

EXPOSE 3306

# lan dau
# docker build -t teamworker .
# docker run --env-file .env -d --name teamworker_db -p 3306:3306 teamworker

# cac lan sau
# docker start teamworker_db

# docker stop teamworker_db

# docker exec -it teamworker_db mysql -u admin -p