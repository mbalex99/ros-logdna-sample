import { BasicServer, Logger as ROSLogger } from 'realm-object-server'
import * as path from 'path'

var LogDNA = require('logdna');

const server = new BasicServer()

class LogDNALogger extends ROSLogger {
    private logDNAlogger: any
    constructor(){
        super()
        const creds = require('../creds.json')
        if (!creds) {
            throw new Error(`Please create a creds.json. See README.md for more information`)
        }
        const ingestionKey = creds["LOG_DNA_INGESTION_KEY"]
        this.logDNAlogger = LogDNA.setupDefaultLogger(ingestionKey, {
            hostname: 'locahost'
        })
    }
    log(level: string, msg: string, ctx?: object) {
        console.log(`${level}: ${msg}`)
        this.logDNAlogger.log(msg, {level: level, app: 'my-log-dna-ros-app'})
    }
}

server.start({
        dataPath: path.join(__dirname, '../data'),
        logger: new LogDNALogger()
    })
    .then(() => {
        console.log(`Realm Object Server was started on ${server.address}`)
    })
    .catch(err => {
        console.error(`Error starting Realm Object Server: ${err.message}`)
    })
