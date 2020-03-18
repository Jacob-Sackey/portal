'use strict'
const User = use('App/Models/User')
const {validateAll} = use('Validator')
const Reset = use('App/Models/Reset')
const randomString = require('random-string')
const Mail = use('Mail')
const Hash = use('Hash')

class PasswordResetController {
  async resetpassword({ view,session,request, response}){
    if (request.ajax()) {
        // do something
        const id = request.input('id')
        const user = await User.find(id) 
        console.log(user)
        if(user.email === '' ){          
           response.send({
               status: 'null'
           })
         
        }
        else{
            //find user object
            const id = request.input('id')
            const user = await User.find(id) 
            //set password to empty
            user.password = ''
            user.save()
            
            //create token
            const token = randomString({length:40},{expiresInSeconds:10})
            //set token in resets table
            const reset = new Reset()
            reset.user_id = user.id
            reset.email = user.email
            reset.token = token
            reset.save()

             const mailData ={
                    user:user.toJSON(),
                    token
                }

       await Mail.send('auth.emails.password_reset', mailData ,message => {
           message.to(user.email)
           .from('PPAauthentication@gh.com')
           .subject('Password reset Link')
       } )
         
              response.send({
               status: 'success'
              })        

        }
               
    } 
    else {
        return 'Bad Request Type...';
    }

}



async showResetForm({params,view}){

    return view.render('auth.passwords.changepass',{id:params.id})
}


async reset({params,request,session,response}){
   	const data = request.only(['password', 'confirm_password'])
    const rules = {
    password: 'required',
    confirm_password: 'required|same:password'

    }
    const messages = {
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

   
     const UpdateUser = await User.find(request.input('id'))
     console.log(UpdateUser)
     UpdateUser.password = await Hash.make(request.input('password')) 
      await UpdateUser.save()

      session.flash({
	  notifications:{
		type:'success',
		message:'Password reset successful'
		}	
         })
    response.redirect('/login')

     


}


 
      

    
}

module.exports = PasswordResetController
