import config from './config'

const dashboardConfig = ({
    apps: [{
        appId: config.APP_ID,
        appName: config.APPLICATION_NAME,
        masterKey: config.MASTER_KEY,
        serverURL: config.SERVER_URL,
    }],
    port: config.PORT,
    trustProxy: 1,
    users: [{
        user: config.DASHBOARD_USERNAME,
        pass: config.DASHBOARD_PASSWORD,
    }],
})

const dashboardOptions = ({
    options: {
        allowInsecureHTTP: false,
        cookieSessionSecret: config.DASHBOARD_SECRET,
    },
})

const displayEnvironment = () => {
    // Display all environmental variables on start.
    console.log('-------- Environmental Variables: ---------------------') // eslint-disable-line no-console
    for (const key in config) {
        if (typeof config[key] === 'string') {
            // Redact most of the value of anything with KEY or SECRET in the key
            const value = (key.includes('KEY')
                           || key.includes('SECRET')
                           || key.includes('TOKEN')
                           || key.includes('DATABASE')
                           || key.includes('PASSWORD'))
                ? '****** Redacted *****' + config[key].slice(-6)
                : config[key]
            console.log(key + ' : ' + value) // eslint-disable-line no-console
        }
    }
    console.log('------------------------------ End of Environment.') // eslint-disable-line no-console
    console.log('Started Parse Dashboard at', config.ROOT_URL + '/dashboard') // eslint-disable-line no-console
    console.log('Started Pocket Prep Server at', config.SERVER_URL) // eslint-disable-line no-console
}

const requireHTTPS = (req, res, next) => {
    // The 'x-forwarded-proto' check is for Heroku
    (!req.secure
     && (req.get('x-forwarded-proto') !== 'https')
     && (!req.get('host').includes('localhost')))
        ? res.redirect('https://' + req.get('host') + req.url)
        : next()
}

export {
    dashboardConfig,
    dashboardOptions,
    displayEnvironment,
    requireHTTPS,
}
