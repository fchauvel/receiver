FROM debian:jessie

EXPOSE 3000

RUN apt-get -qq update
RUN apt-get -qq -y install git curl

# Install NodeJS
RUN curl -sL https://deb.nodesource.com/setup_8.x | bash
RUN apt-get -qq -y install nodejs


RUN git clone https://github.com/fchauvel/receiver.git
WORKDIR receiver
RUN npm install
CMD node app/server -p 3000
