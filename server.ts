/*
|--------------------------------------------------------------------------
| AdonisJs Server
|--------------------------------------------------------------------------
|
| The contents in this file is meant to bootstrap the AdonisJs application
| and start the HTTP server to accept incoming connections. You must avoid
| making this file dirty and instead make use of `lifecycle hooks` provided
| by AdonisJs service providers for custom code.
|
*/

import 'reflect-metadata'
import sourceMapSupport from 'source-map-support'
import { Ignitor } from '@adonisjs/core/build/standalone'
import fs from 'fs'
import path from 'path'
import https from 'https'

sourceMapSupport.install({ handleUncaughtExceptions: false })

// key untuk ssl https
const options = {
  key: fs.readFileSync(path.join(__dirname, './ssl_certificate/unsyiah.ac.id.key')),
  cert: fs.readFileSync(path.join(__dirname, './ssl_certificate/unsyiah.ac.id.crt')),
}

new Ignitor(__dirname).httpServer().start((handle) => {
  // menjalankan server https
  return https.createServer(options, handle)
})

// http biasa
// new Ignitor(__dirname).httpServer().start()
