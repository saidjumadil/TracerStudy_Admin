/* eslint-disable prettier/prettier */
/**
 * Contract source: https://git.io/JvgAT
 *
 * Feel free to let us know via PR, if you find something broken in this contract
 * file.
 */

 declare module '@ioc:Adonis/Addons/Mail' {
  import { MailDrivers } from '@ioc:Adonis/Addons/Mail'

  interface MailersList {
    ses: MailDrivers['ses']
    mailgun: MailDrivers['mailgun']
    sparkpost: MailDrivers['sparkpost']
    smtp: MailDrivers['smtp']
  }
}
