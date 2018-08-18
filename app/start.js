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

const About = require("./about");
const Settings = require("./settings");
const Receiver = require("./receiver");
const RabbitMQ = require("./queues");
const UI = require("./ui");

var about = About.fromPackageJson();
var settings = Settings.fromCommandLine(process.argv);

console.log(settings)

var messageQueue = new RabbitMQ(settings.queueHost,
				settings.queuePort,
				settings.queueName);

var ui = new UI(console, about);

var receiver = new Receiver(settings, ui, messageQueue)
receiver.listen()





