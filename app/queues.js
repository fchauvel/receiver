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

const amqp = require('amqplib/callback_api');



class RabbitMQ {

    constructor (queueHost, queuePort, queueName) {
	this.queueURL = "amqp://" + queueHost + ":" + queuePort.toString();
	this.queueName = queueName;
    }

    publish (data) {
	const queueURL = 
	
	amqp.connect(queueURL, function (err, connection) {
	    connection.createChannel(function(err, channel) {
		channel.assertQueue(this.queueName, {durable: true});
		channel.sendToQueue(this.queueName, Buffer.from(data), {persistent: true});
	    });
	    console.log(" [x] Sent '%s'", data);
	});
    }
	
}

module.exports = RabbitMQ
