const CONFIG_MAP = {
  host: 'DB_HOST',
  port: 'DB_PORT',
  user: 'DB_USERNAME',
  password: 'DB_PASSWORD',
}

const getConnectionVars = (e, connVarSource) => {
  if (!e || !connVarSource) {
    return {}
  }

  const ret = {}

  Object.keys(CONFIG_MAP).forEach(key => {
    const srcKey = CONFIG_MAP[key]
    if (connVarSource[srcKey] && connVarSource[srcKey] !== e[key]) {
      ret[key] = connVarSource[srcKey]
    }
  })

  return ret
}

const buildConfig = ({ connection }) => ({
  client: 'pg',
  connection: {
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'postgres',
    ...connection,
  },
  migrations: {
    tableName: 'knex_migrations'
  },
  searchPath: [ 'public' ],
  acquireConnectionTimeout: 10000,
  seeds: {
    directory: './migrations/seeds',
  }
})

const envs = {
  development: buildConfig({
    connection: {
      database: 'mailmask-local',
    },
  }),
  test: buildConfig({
    connection: {
      database: 'mailmask-test',
    }
  }),
  live: buildConfig({
    connection: {
      database: 'mailmask-live',
      ssl: { rejectUnauthorized: false },
      ...getConnectionVars({}, process.env)
    }
  }),
  selfhost: buildConfig({
    connection: {
      database: 'mailmask-selfhost',
      ssl: true,
      ...getConnectionVars({}, process.env)
    }
  })
}

// for all packages which use this programmatically we allow config-based override here
envs.getConfig = ({ env, config }) => {
  const e = envs[env]

  e.connection = {
    ...e.connection,
    ...getConnectionVars(e.connection, config)
  }

  return e
}

// for knex CLI to work
module.exports = envs
