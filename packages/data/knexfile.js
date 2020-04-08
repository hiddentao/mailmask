const buildConfig = ({ connection, ...props }) => ({
  client: 'pg',
  connection: {
    host: 'localhost',
    user: 'postgres',
    password: 'postgres',
    port: 5432,
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
    host: config.DB_HOST,
    user: config.DB_USERNAME,
    password: config.DB_PASSWORD,
    port: config.DB_PORT,
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

