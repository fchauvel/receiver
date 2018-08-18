FROM debian:jessie

MAINTAINER "franck.chauvel@sintef.no"

RUN apt-get -qq update
RUN apt-get -qq -y install git curl

# Install NodeJS
RUN curl -sL https://deb.nodesource.com/setup_8.x | bash
RUN apt-get -qq -y install nodejs

# Install SensApp::Receiver
RUN git clone https://github.com/fchauvel/receiver.git
WORKDIR receiver
RUN npm install

EXPOSE 3000

CMD node app/start -p 3000
