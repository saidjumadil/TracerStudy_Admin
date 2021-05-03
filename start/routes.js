"use strict";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

// Route.on('/').render('welcome')
// authentikasi
Route.group(() => {
  Route.get("", "Admin/AuthController.index").as("login");
  Route.post("", "Admin/AuthController.authentication").as(
    "authentication_admin"
  );

  Route.get("logout", "Admin/AuthController.logout").as("logout");
})
  .prefix("/")
  .as("auth");

// admin side
Route.group(() => {
  // beranda
  Route.get("", "Admin/AdminsController.index").as("index");

  // data
  Route.get("data/pengisi", "Admin/AdminResponsController.pengisi").as(
    "data.pengisi"
  );
  Route.get("data/hasil", "Admin/AdminResponsController.hasil").as(
    "data.hasil"
  );
  Route.get("data/importuser", "Admin/AdminResponsController.importuser").as(
    "data.importuser"
  );

  // user managemen
  Route.get(
    "managemen/tambah/admin",
    "Admin/AdminUserManagemenController.tambah_admin"
  ).as("managemen.tambah.admin");
  Route.get(
    "managemen/tambah/operator",
    "Admin/AdminUserManagemenController.tambah_operator"
  ).as("managemen.tambah.operator");
  Route.get(
    "managemen/tambah/akunresponden",
    "Admin/AdminUserManagemenController.tambah_akunresponden"
  ).as("managemen.tambah.akunresponden");

  Route.get(
    "managemen/edit/dataresponden",
    "Admin/AdminUserManagemenController.edit_dataresponden"
  ).as("managemen.edit.dataresponden");

  // ubah sasaran,ubah jadwal,sms
  Route.get("sasaran", "Admin/AdminsController.sasaran").as("sasaran");
  Route.get("jadwal", "Admin/AdminsController.jadwal").as("jadwal");
  Route.get("sms", "Admin/AdminsController.sms").as("sms");
})
  .prefix("admin")
  .as("admin");
