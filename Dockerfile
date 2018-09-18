#
# SensApp::Receiver
#
# Copyright (C) 2017 SINTEF Digital
# All rights reserved.
#
# This software may be modified and distributed under the terms
# of the MIT license.  See the LICENSE file for details.
#


FROM node:8.11-alpine

MAINTAINER "franck.chauvel@sintef.no"

WORKDIR /receiver	
COPY . /receiver

# Install SensApp::Receiver
RUN npm install

EXPOSE 3000

CMD node app/start -p 3000
