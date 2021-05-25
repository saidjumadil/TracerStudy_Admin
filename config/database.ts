/**
 * Config source: https://git.io/JesV9
 *
 * Feel free to let us know via PR, if you find something broken in this config
 * file.
 */

import Env from '@ioc:Adonis/Core/Env'
import { DatabaseConfig } from '@ioc:Adonis/Lucid/Database'

const databaseConfig: DatabaseConfig = {
  /*
  |--------------------------------------------------------------------------
  | Connection
  |--------------------------------------------------------------------------
  |
  | The primary connection for making database queries across the application
  | You can use any key from the `connections` object defined in this same
  | file.
  |
  */
  connection: Env.get('DB_CONNECTION'),

  connections: {
    /*
    |--------------------------------------------------------------------------
    | MySQL config
    |--------------------------------------------------------------------------
    |
    | Configuration for MySQL database. Make sure to install the driver
    | from npm when using this connection
    |
    | npm i mysql
    |
    */

    //data base Admin
    cdc_tracerstudy_admin: {
      client: 'mysql',
      connection: {
        host: Env.get('DB_HOST_Admin', 'localhost'),
        port: Env.get('DB_PORT_Admin', ''),
        user: Env.get('DB_USER_Admin', 'root'),
        password: Env.get('DB_PASSWORD_Admin', ''),
        database: Env.get('DB_DATABASE_Admin', 'cdc_tracerstudy_admin'),
      },
      migrations: {
        naturalSort: true,
      },
      healthCheck: true,
      debug: true,
    },
    //data base D3
    cdc_tracerstudy_d3: {
      client: 'mysql',
      connection: {
        host: Env.get('DB_HOST_D3', 'localhost'),
        port: Env.get('DB_PORT_D3', ''),
        user: Env.get('DB_USER_D3', 'root'),
        password: Env.get('DB_PASSWORD_D3', ''),
        database: Env.get('DB_DATABASE_D3', 'cdc_tracerstudy_d3'),
      },
      migrations: {
        naturalSort: true,
      },
      healthCheck: true,
      debug: true,
    },

    //data base PROFESI
    cdc_tracerstudy_profesi: {
      client: 'mysql',
      connection: {
        host: Env.get('DB_HOST_PROFESI', 'localhost'),
        port: Env.get('DB_PORT_PROFESI', ''),
        user: Env.get('DB_USER_PROFESI', 'root'),
        password: Env.get('DB_PASSWORD_PROFESI', ''),
        database: Env.get('DB_DATABASE_PROFESI', 'cdc_tracerstudy_profesi'),
      },
      migrations: {
        naturalSort: true,
      },
      healthCheck: true,
      debug: true,
    },

    //data base PASCA S2
    cdc_tracerstudy_pasca_s2: {
      client: 'mysql',
      connection: {
        host: Env.get('DB_HOST_PASCA_S2', 'localhost'),
        port: Env.get('DB_PORT_PASCA_S2', ''),
        user: Env.get('DB_USER_PASCA_S2', 'root'),
        password: Env.get('DB_PASSWORD_PASCA_S2', ''),
        database: Env.get('DB_DATABASE_PASCA_S2', 'cdc_tracerstudy_pasca_s2'),
      },
      migrations: {
        naturalSort: true,
      },
      healthCheck: true,
      debug: true,
    },

    //data base PASCA S3
    cdc_tracerstudy_pasca_s3: {
      client: 'mysql',
      connection: {
        host: Env.get('DB_HOST_PASCA_S3', 'localhost'),
        port: Env.get('DB_PORT_PASCA_S3', ''),
        user: Env.get('DB_USER_PASCA_S3', 'root'),
        password: Env.get('DB_PASSWORD_PASCA_S3', ''),
        database: Env.get('DB_DATABASE_PASCA_S3', 'cdc_tracerstudy_pasca_s3'),
      },
      migrations: {
        naturalSort: true,
      },
      healthCheck: true,
      debug: true,
    },
  },
}

export default databaseConfig
