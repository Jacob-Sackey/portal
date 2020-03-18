'use strict'
const User =use('App/Models/user')
const Hash =use('Hash')
const {validateAll} = use('Validator')

class LoginController {
	showLoginForm({view}){
		return view.render('auth.login') 
	}
	
	async login({request, auth, session, response}){
	//get form data
		console.log(request);
		const {username,password} = request.all()

	//retrieve user based on form data
		const user = await User.findBy('username', username)

	const data = request.only(['username','password'])
  const rules = {
    username: 'required',
    password: 'required'
    }
  const messages = {
      'username.required'    : 'Please insert a valid username',
      'password.required' : 'Please input a password'
      
     }
   const validation = await validateAll(data, rules, messages)

	//verify password
		
	   if (validation.fails()) {
      session
        .withErrors(validation.messages())
        .flashExcept(['password'])
			return response.redirect('back')	
		
	    }

	    if(user){
			const passwordVerified= await Hash.verify(data.password, user.password)
			
			if(passwordVerified){
				//login user
				await auth.login(user)

				return response.route('/')
			                    }
                     
               }
           session.flash({
			notifications:{
			   type:'danger',
				message:'Username or password not valid'
					}	
			})
          return response.redirect('back')
  }
async logout({auth, response}) {
await auth.logout()
return response.redirect('/login')
}
}

module.exports = LoginController
