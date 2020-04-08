const buildConfig = ({ connection, ...props }) => ({
  client: 'pg',
  connection: {
    ...connection,
  },
  migrations: {
    tableName: 'knex_migrations'
  },
  searchPath: [ 'public' ],
  acquireConnectionTimeout: 10000,
  ...props,
})

module.exports = ({ env, config }) => {
  const connProps = {
    host: config.DB_HOST || 'localhost',
    user: config.DB_USERNAME || 'postgres',
    password: config.DB_PASSWORD || 'postgres',
    port: config.DB_PORT || 5432,
  }

  const envs = {
    development: buildConfig({
      connection: {
        database: 'camomail-local',
        ...connProps,
      },
      seeds: {
        directory: './migrations/seeds',
        ...connProps,
      }
    }),
    test: buildConfig({
      connection: {
        database: 'camomail-test',
        ...connProps,
      }
    }),
    live: buildConfig({
      connection: {
        database: 'camomail-live',
        ssl: true,
        ...connProps,
      }
    })
  }

  return envs[env]
}

