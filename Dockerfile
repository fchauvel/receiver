FROM node:8.11.4-stretch

MAINTAINER "franck.chauvel@sintef.no"

RUN apt-get -qq update

# Install SensApp::Receiver
COPY . /receiver
WORKDIR receiver
RUN npm install

EXPOSE 3000

CMD node app/start -p 3000
