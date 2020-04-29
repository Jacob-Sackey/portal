'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

const Route = use('Route')

Route.on('/').render('home')



//Routes to render dashboard
Route.get('/dashboard', 'DashboardController.show').as('dashboard')
Route.get('/calendar', 'DashboardController.showCal').as('calendar')

//Routes to render User Login and Authentication
Route.on('/login').render('Auth/login')
Route.get('login', 'Auth/LoginController.showLoginForm')
Route.post('login', 'Auth/LoginController.login').as('login')
Route.get('logout', 'Auth/LoginController.logout')

//Routes to render user registration and Authentication
Route.on('/register').render('Auth/register')
Route.get('register', 'Auth/RegisterController.showRegisterForm')
Route.post('register', 'Auth/RegisterController.store').as('register')




//Routes for Permissions
Route.get('/permissions', 'PermissionController.show').as('permissions')
Route.get('/permissions/create', 'PermissionController.showCreatePermission').as('permissions.create')
Route.post('permissions/create', 'PermissionController.store').as('permissions.save')
Route.get('/permissions/edit/:id', 'PermissionController.showEditPermission').as('permissions.edit')
Route.put('/permissions/update/:id', 'PermissionController.updatePermission')
Route.get('/permissions/viewing/:id', 'PermissionController.viewPermission').as('permissions.viewing')
Route.delete('/permissions/delete', 'PermissionController.deletePermission').as('permissions.delete')

//Routes for Users
Route.get('/users', 'UserController.show').as('users')
Route.get('/users/create', 'Auth/RegisterController.showCreateUser').as('users.create')
Route.get('/users/edit/:id', 'UserController.showEditUser').as('users.edit')
Route.put('/users/update/:id', 'UserController.updateUser')
Route.delete('/users/delete', 'UserController.deleteUser').as('users.delete')
Route.get('/users/viewing/:id', 'UserController.viewUser').as('users.viewing')

//user password reset
Route.post('/users/reset', 'Auth/PasswordResetController.resetpassword').as('users.reset')
Route.post('password/email', 'Auth/PasswordResetController.sendResetLinkEmail')
Route.get('password/reset/:id/:token', 'Auth/PasswordResetController.showResetForm')
Route.post('/password/change', 'Auth/PasswordResetController.reset')



//Routes for Roles
Route.get('/roles', 'RoleController.show').as('roles')
Route.get('/roles/create', 'RoleController.showCreateRole').as('roles.create')

Route.post('roles/create', 'RoleController.store').as('roles.save')
Route.get('/roles/edit/:id', 'RoleController.showEditRole').as('roles.edit')
Route.put('/roles/update/:id', 'RoleController.updateRole')
Route.get('/roles/viewing/:id', 'RoleController.viewRole').as('roles.viewing')
Route.delete('/roles/delete', 'RoleController.deleteRole').as('roles.delete')











//Rendering Service page routes
Route.get('/services', 'ServiceController.ServiceView')
Route.get('/createservice', 'ServiceController.createserv')
Route.post('/services/createservice', 'ServiceController.Createservice').as('service.save')
Route.delete('/services/delete', 'ServiceController.deleteservice').as('service.delete')
Route.put('/services/update/:id', 'ServiceController.UpdateService')
Route.get('/services/edit/:id', 'ServiceController.showEditService').as('service.edit')
Route.get('/services/view/:id', 'ServiceController.viewProjDetails')


//Rendering custom page routes
Route.get('/custom', 'CustomController.CustomView')
Route.get('/createcustom', 'CustomController.createcas')
Route.post('/customs/createcustom', 'CustomController.makecustom').as('customs.save')
Route.delete('/customs/delete', 'CustomController.deletecustom').as('custom.delete')
Route.put('/customs/update/:id', 'CustomController.Updatecustom')
Route.get('/customs/edit/:id', 'CustomController.showEditcustom').as('custom.edit')
Route.get('/customs/view/:id', 'CustomController.vller.PiewcasDetails')
Route.get('/payslips/view/:id', 'PayslipControayslipView')
//Route.get('/rates', 'RateController.ratedisplay')




//Rendering custom information page routes
Route.get('/casinfo/edit/:id', 'CasinfoController.CasinfoView').as('pay.edit')
//Route.post('/casinfo/updateinfo','CasinfoController.updateinfo').as('rates.save')
Route.put('/casinfo/update/:id', 'CasinfoController.payinfo').as('cas.hg')

//Rendering Rates page routes
Route.get('/rate', 'RateController.RateView')
Route.get('/pages/custom', 'RateController.RateView')
Route.post('/custom/update/:id', 'customController.updaterate')


//Rendering Payslip display page routes
//Route.get('/payslip/view/:id', 'PayslipController.PayslipView').as('pay.view')
//Route.get('/payslip','PayslipController.getName')



//Rendering Payment Register page routes
Route.get('/pregister', 'PregisterController.PregisterView')

//Rendering Payment register history page routes
Route.get('/prhistory', 'PrhistoryController.PrhistoryView')

//Rendering time and attendance
Route.get('/attendance', 'AttendanceController.index')
