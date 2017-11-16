# Realm Object Server - LogDNA Integration

![Realm Logo](/screenshots/logo.png)

![LogDNA and Node Logo](/screenshots/logo+node.png)

Add incredibly powerful Machine Learning to your Sync Server via Realm Object Server and LogDNA! Proactively manage your ROS production environment in real time.

1. Run `npm install` or `yarn`
2. Create a file called `creds.json` right next to `package.json`

```javascript
{
    "LOG_DNA_INGESTION_KEY": "YOUR LOG DNA INGESTION KEY" // replace your key 
}
```

3. Run `npm start` 
4. Go to your dashbaord and view your logs on https://app.logdna.com/

![LogDNA Dashboard](/screenshots/dashboard.png)

Voila! Powerful Realtime Logging with Machine Learning and Search Capabilities.

## How was this done?

1. import `Logger` from `realm-object-server`

```typescript
import { Logger } from 'realm-object-server'
```

2. Subclass it and override the `log` event

```typescript
class LogDNALogger extends ROSLogger {
    constructor(){
        super()
    }
    log(level: string, msg: string, ctx?: object) {
        console.log(`${level}: ${msg}`)
    }
}
```

3. Add your custom logging code in the log method. In this case it's with LogDNA:

```typescript
const LogDNA = require('logdna')

const logDNALogger = LogDNA.setupDefaultLogger(ingestionKey, {
    hostname: 'locahost'
})

log(level: string, msg: string, ctx?: object) {
    console.log(`${level}: ${msg}`) // lets print to our console
    logDNALogger.log(`msg`, { level: level })
}
```

> Unfortunately LogDNA doesn't come with a TypeScript definition :-(

4. Feed it into the server! 

```typescript
server.start({
        dataPath: path.join(__dirname, '../data'),
        logger: new LogDNALogger()
    })
```