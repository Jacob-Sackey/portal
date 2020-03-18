'use strict'
const Role = use('Role')
const { validateAll} = use('Validator')
const User = use('App/Models/User')

class RegisterController {

      async showCreateUser({request,view})
  {
      const roles = await Role.all()
      console.log(roles)
      return view.render('auth.register', { roles:roles.toJSON() })
  }

  async store ({ request, session, response }) {
  	const data = request.only(['name','phone','employee_number','username', 'email','department', 'password', 'confirm_password'])
    const rules = {
    name:'required|unique:users,name',
    phone:'required|unique:users,phone',
    employee_number:'required|unique:users,employee_number',
    username: 'required|unique:users,username',
    email: 'email|unique:users',
    department:'required',
    password: 'required',
    confirm_password: 'required|same:password'

    }
    const messages = {
      'name.required': 'Employee name required',
      'name.unique': 'User already exist in database',
      'phone.required':'Phone number required',
      'phone.unique':'Phone number already in records',
      'employee_number.required':'Please insert employee number',
      'username.required' : 'Username is required to continue',
      'username.unique' : 'Username already taken',
      'department.required':'Please add the user department',
      'password.required' : 'Please input a password',
      'confirm_password.required':'Please retype the password'
     }

    const validation = await validateAll(data, rules, messages)

    if (validation.fails()) {
      session
        .withErrors(validation.messages())
        .flashExcept(['password'])

     //flashmessage

      return response.redirect('back')
    }

   const user = await User.create({
      name:request.input('name'),
      phone:request.input('phone'),
      employee_number:request.input('employee_number'),
    	username:request.input('username'),
    	email:request.input('email'),
      department:request.input('department'),
    	password:request.input('password')   
    })
    await user.roles().attach(request.input('roles'))

    session.flash({
	  notification:{
		type:'success',
		message:'User created successfully'
		}	
	})

    return response.redirect('/users')


  }
}

module.exports = RegisterController
