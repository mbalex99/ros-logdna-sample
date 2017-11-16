"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const realm_object_server_1 = require("realm-object-server");
const path = require("path");
var LogDNA = require('logdna');
const server = new realm_object_server_1.BasicServer();
class LogDNALogger extends realm_object_server_1.Logger {
    constructor() {
        super();
        const creds = require('../creds.json');
        const ingestionKey = creds["LOG_DNA_INGESTION_KEY"];
        this.logDNAlogger = LogDNA.setupDefaultLogger(ingestionKey, {
            hostname: 'locahost'
        });
    }
    log(level, msg, ctx) {
        console.log(`${level}: ${msg}`);
        this.logDNAlogger.log(msg, { level: level, app: 'my-log-dna-ros-app' });
    }
}
server.start({
    dataPath: path.join(__dirname, '../data'),
    logger: new LogDNALogger()
})
    .then(() => {
    console.log(`Realm Object Server was started on ${server.address}`);
})
    .catch(err => {
    console.error(`Error starting Realm Object Server: ${err.message}`);
});
//# sourceMappingURL=index.js.map