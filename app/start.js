/*
 * SensApp::Receiver
 *
 * Copyright (C) 2017 SINTEF Digital
 * All rights reserved.
 *
 * This software may be modified and distributed under the terms
 * of the MIT license.  See the LICENSE file for details.
 *
 */

const options = [
    { name: "version", alias: 'v', type: Boolean },
    { name: "port", alias: "p", type: Number, defaultValue: 3000},
    { name: "host", alias: "h", type: String, defaultValue: "localhost" }
];

const commandLineArgs = require('command-line-args');
const commandLine = commandLineArgs(options);



const Receiver = require("./receiver")

var receiver = new Receiver(commandLine.port)
receiver.listenOn(commandLine.port)





