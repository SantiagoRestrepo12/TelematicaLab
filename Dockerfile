FROM ubuntu:22.04 as build
CMD mkdir /app
COPY ./app /app
WORKDIR /app
RUN apt update
RUN apt install python3.10 -y
RUN apt install python3-pip -y
RUN pip3 install Flask
EXPOSE 80
CMD [ "python3.10", "app.py" ]
