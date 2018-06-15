const path = require('path')
const convict = require('convict')

let conf = convict({
  env: {
    doc: 'The application environment.',
    format: ['production', 'development', 'test'],
    default: 'development',
    env: 'NODE_ENV'
  },
  server: {
    port: {
      doc: 'The port to bind ExpressJS.',
      format: Number,
      default: 3001,
      env: 'PORT'
    }
  },
  database: {
    host: {
      doc: 'The database host name or IP address.',
      format: String,
      default: 'localhost'
    },
    name: {
      doc: 'The database name.',
      format: String,
      default: 'RepoDB'
    }
  },
  queue: {
    port: {
      doc: 'The port to bind Redis.',
      format: Number,
      default: 6379
    },
    host: {
      doc: 'The queue host name or IP address.',
      format: String,
      default: 'localhost'
    },
    prefix: {
      doc: 'Key names in Redis.',
      format: String,
      default: 'q'
    }
  },
  auth: {
    oidc: {
      domain: {
        doc: 'The OIDC provider domain.',
        format: String,
        default: 'yourorg.auth0.com',
        sensitive: false
      },
      client_id: {
        doc: 'The OIDC client identifier.',
        format: String,
        default: 'changeme',
        sensitive: false
      },
      callback_url: {
        doc: 'The endpoint to receive callback from the OIDC provider.',
        format: String,
        default: 'https://localhost:3000/callback',
        sensitive: false
      }
    }
  },
  repository: {
    git: {
      path: {
        doc: 'The location for the cloned repositories.',
        format: String,
        default: '/tmp'
      },
      depth: {
        doc: 'The initial depth during the clone process.',
        format: 'int',
        default: 10000
      },
      commits: {
        doc: 'The amount of commits to return per request.',
        format: 'int',
        default: 1000
      },
      buffer: {
        doc: '',
        format: 'int',
        default: 1024000
      },
      pulling_schedule: {
        doc: 'The interval (seconds) for pulling new commits.',
        format: 'int',
        default: 1800
      }
    }
  },
  logger: {
    path: {
      doc: 'The location for log files.',
      format: String,
      default: 'logs'
    }
  }
})

//process.env.NODE_ENV = conf.get('env')

conf.loadFile(path.join(__dirname, conf.get('env') + '.json')).validate({allowed: 'strict'})

module.exports = conf
