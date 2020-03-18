'use strict'
const User = use('App/Models/User')
const { validateAll} = use('Validator')
const Hash = use('Hash')

class UserController {
    //Function defined to render user view
    async show({view}){
    const users = await User.all()

   return view.render('users.showusers', {users : users.toJSON() })
 
  }


  //Function defined to edit User details
    async showEditUser({view,params})
  { 
      const user = await User.find(params.id)
      console.log(user)
      return view.render('users.editusers',{
          user : user.toJSON()
      })
  }



  //Function defined delete User from database
   async deleteUser({ view,session,request, response}){
    if (request.ajax()) {
        // do something
        const id = request.input('id')
            const user = await User.find(id) 
            await user.delete()

            
              
               session.flash({
                notification:{
                type:'success',
                message:'User Deleted'
                    }	
            })            
           response.send({
               status: 'success'
           })
        
    } else {
        return 'Bad Request Type...';
    }

}

//Function defined to view User details as stored in database
   async viewUser({view,params})
  { 
      const user = await User.find(params.id)
      console.log(user)
      const roles = await user.roles().fetch()
      return view.render('users.userview',{
          user : user.toJSON(), roles : roles.toJSON()
      })
  }





//Function Defined to update Users and render updates in database
    async updateUser({params,request,response,session})
  {
   	const data = request.only(['name','employee_number','username','phone', 'email','department','password','confirm_password'])
    const rules = {
        name:'required',
        employee_number:'required',
        username: 'required',
        phone:'required',
        department:'required',
        confirm_password: 'same:password'
        
    
    }
    const messages = {
      'name.required' : 'Employee name required',
      'employee_number' :'Please insert employee number',
      'username.required' : 'Username is required to continue',
      'phone.required' :'Phone number required',
      'department.required' :'Please add the user department',
      'confirm_password.same':'Password confirmation failed'
      

     }


    const validation = await validateAll(data, rules, messages)

    if (validation.fails()) {
      session
        .withErrors(validation.messages())
        

        session.flash({
		notification:{
		   type:'danger',
		   message:'Please fill all details correctly'
			}	
	   })

      return response.redirect('back')
    }


    const UpdateUser = await User.find(params.id)
    UpdateUser.name = request.input('name'),
    UpdateUser.employee_number = request.input('employee_number')
    UpdateUser.username = request.input('username')
    UpdateUser.phone = request.input('phone')
    UpdateUser.email = request.input('email')
    UpdateUser.department = request.input('department')
    UpdateUser.password = await Hash.make(request.input('password'))
    await UpdateUser.save()


        session.flash({
		notification:{
		type:'success',
		message:'User Updated'
			}	
	   })
    return response.redirect('/users')


  }
}

module.exports = UserController
