FROM mysql:8.0

COPY ./teamworker.sql /docker-entrypoint-initdb.d/

EXPOSE 3306

# docker build -t teamworker .
# docker run --env-file .env -d --name teamworker_db -p 3306:3306 teamworker

# docker start teamworker_db
# docker stop teamworker_db

# docker exec -it teamworker_db mysql -u admin -p