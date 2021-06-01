/*
|--------------------------------------------------------------------------
| Application middleware
|--------------------------------------------------------------------------
|
| This file is used to define middleware for HTTP requests. You can register
| middleware as a `closure` or an IoC container binding. The bindings are
| preferred, since they keep this file clean.
|
*/

import Server from '@ioc:Adonis/Core/Server'

/*
|--------------------------------------------------------------------------
| Global middleware
|--------------------------------------------------------------------------
|
| An array of global middleware, that will be executed in the order they
| are defined for every HTTP requests.
|
*/
Server.middleware.register([
  () => import('@ioc:Adonis/Core/BodyParser'),
  () => import('@ioc:Adonis/Addons/Shield'),
])

/*
|--------------------------------------------------------------------------
| Named middleware
|--------------------------------------------------------------------------
|
| Named middleware are defined as key-value pair. The value is the namespace
| or middleware function and key is the alias. Later you can use these
| alias on individual routes. For example:
|
| { auth: () => import('App/Middleware/Auth') }
|
| and then use it as follows
|
| Route.get('dashboard', 'UserController.dashboard').middleware('auth')
|
*/
Server.middleware.registerNamed({
  // auth
  user: () => import('App/Middleware/User'),
  guest: () => import('App/Middleware/Guest'),

  // d3
  d3Superadmin: () => import('App/Middleware/D3/D3SuperAdmin'),
  d3Admin: () => import('App/Middleware/D3/D3Admin'),
  d3Enum: () => import('App/Middleware/D3/D3Enum'),
  d3Kajur: () => import('App/Middleware/D3/D3Kajur'),
  d3Auth: () => import('App/Middleware/D3/D3Auth'),
  // pasca s2
  pascaS2Superadmin: () => import('App/Middleware/Pasca/S2/PascaS2SuperAdmin'),
  pascaS2Admin: () => import('App/Middleware/Pasca/S2/PascaS2Admin'),
  pascaS2Enum: () => import('App/Middleware/Pasca/S2/PascaS2Enum'),
  pascaS2Kajur: () => import('App/Middleware/Pasca/S2/PascaS2Kajur'),
  pascaS2Auth: () => import('App/Middleware/Pasca/S2/PascaS2Auth'),
  // pasca s3
  pascaS3Superadmin: () => import('App/Middleware/Pasca/S3/PascaS3SuperAdmin'),
  pascaS3Admin: () => import('App/Middleware/Pasca/S3/PascaS3Admin'),
  pascaS3Enum: () => import('App/Middleware/Pasca/S3/PascaS3Enum'),
  pascaS3Kajur: () => import('App/Middleware/Pasca/S3/PascaS3Kajur'),
  pascaS3Auth: () => import('App/Middleware/Pasca/S3/PascaS3Auth'),
  // pasca s3
  profesiSuperadmin: () => import('App/Middleware/Profesi/ProfesiSuperAdmin'),
  profesiAdmin: () => import('App/Middleware/Profesi/ProfesiAdmin'),
  profesiEnum: () => import('App/Middleware/Profesi/ProfesiEnum'),
  profesiKajur: () => import('App/Middleware/Profesi/ProfesiKajur'),
  profesiAuth: () => import('App/Middleware/Profesi/ProfesiAuth'),
})
