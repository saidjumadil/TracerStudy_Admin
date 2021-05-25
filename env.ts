/*
|--------------------------------------------------------------------------
| Validating Environment Variables
|--------------------------------------------------------------------------
|
| In this file we define the rules for validating environment variables.
| By performing validation we ensure that your application is running in
| a stable environment with correct configuration values.
|
| This file is read automatically by the framework during the boot lifecycle
| and hence do not rename or move this file to a different location.
|
*/

import Env from '@ioc:Adonis/Core/Env'

export default Env.rules({
  HOST: Env.schema.string({ format: 'host' }),
  PORT: Env.schema.number(),
  APP_KEY: Env.schema.string(),
  APP_NAME: Env.schema.string(),
  CACHE_VIEWS: Env.schema.boolean(),
  SESSION_DRIVER: Env.schema.string(),
  NODE_ENV: Env.schema.enum(['development', 'production', 'testing'] as const),

  // konfigurasi database
  DB_CONNECTION: Env.schema.string(),

  // Admin
  DB_HOST_Admin: Env.schema.string({ format: 'host' }),
  DB_PORT_Admin: Env.schema.number(),
  DB_USER_Admin: Env.schema.string(),
  DB_PASSWORD_Admin: Env.schema.string.optional(),
  DB_DATABASE_Admin: Env.schema.string(),

  // d3
  DB_HOST_D3: Env.schema.string({ format: 'host' }),
  DB_PORT_D3: Env.schema.number(),
  DB_USER_D3: Env.schema.string(),
  DB_PASSWORD_D3: Env.schema.string.optional(),
  DB_DATABASE_D3: Env.schema.string(),
  // profesi
  DB_HOST_PROFESI: Env.schema.string({ format: 'host' }),
  DB_PORT_PROFESI: Env.schema.number(),
  DB_USER_PROFESI: Env.schema.string(),
  DB_PASSWORD_PROFESI: Env.schema.string.optional(),
  DB_DATABASE_PROFESI: Env.schema.string(),

  // pasca s2
  DB_HOST_PASCA_S2: Env.schema.string({ format: 'host' }),
  DB_PORT_PASCA_S2: Env.schema.number(),
  DB_USER_PASCA_S2: Env.schema.string(),
  DB_PASSWORD_PASCA_S2: Env.schema.string.optional(),
  DB_DATABASE_PASCA_S2: Env.schema.string(),

  // pasca s3
  DB_HOST_PASCA_S3: Env.schema.string({ format: 'host' }),
  DB_PORT_PASCA_S3: Env.schema.number(),
  DB_USER_PASCA_S3: Env.schema.string(),
  DB_PASSWORD_PASCA_S3: Env.schema.string.optional(),
  DB_DATABASE_PASCA_S3: Env.schema.string(),

  // mail
  SMTP_HOST: Env.schema.string({ format: 'host' }),
  MAIL_USERNAME: Env.schema.string(),
  MAIL_PASSWORD: Env.schema.string(),

  // optional
  WS_ALUMNI_D3: Env.schema.string.optional(),
  WS_ALUMNI_S1: Env.schema.string.optional(),
  WS_ALUMNI_PROFESI: Env.schema.string.optional(),
  WS_ALUMNI_PASCA_S2: Env.schema.string.optional(),
  WS_ALUMNI_PASCA_S3: Env.schema.string.optional(),
  WS_FAKULTAS: Env.schema.string.optional(),
  WS_PRODI: Env.schema.string.optional(),
  WS_MAPPING_PRODI: Env.schema.string.optional(),
  WS_PROFESI: Env.schema.string.optional(),
  API_IPK: Env.schema.string.optional(),
})
