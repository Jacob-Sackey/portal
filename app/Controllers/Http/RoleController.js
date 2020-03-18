'use strict'
const Role = use('Role')
const Permission = use('Permission')
const User = use('App/Models/User')
const { validateAll} = use('Validator')



//Initiating the Role controller
class RoleController {

    //Function Defined to render role view
   async show({view}){
   const roles= await Role.all()
   return view.render('roles.showroles',{roles : roles.toJSON() })

  }


//Function Defined to create role  
    async showCreateRole({request,view})
  {
      const permissions = await Permission.all()
      return view.render('roles.createroles', { permissions:permissions.toJSON() })
  }


//Function defined to edit roles already saved in data base
    async showEditRole({view,params})
  { 
      const role = await Role.find(params.id)
      return view.render('roles.editroles',{
          role : role.toJSON()})
      
  }


  //Function defined to view Role details as stored in database
   async viewRole({view,params})
  {
      const role = await Role.find(params.id)
      const permissions = await role.permissions().fetch()
      return view.render('roles.roleview',{
          role : role.toJSON(),
          permissions : permissions.toJSON()
      })
  }


 //Function Defined to store newly created role in data base 
    async store({request,response,session}){
    const data = request.only(['rolename', 'slug', 'description'])
    const rules = {
    rolename: 'required|unique:roles,name',
    slug: 'required|unique:roles,slug',
    description: 'required|unique:roles,description'
    

    }


    const messages = {
      'rolename.required' : 'Role name required',
      'rolename.unique':'Role already esist',
      'slug.required'    : 'slug required',
      'slug.unique'    : 'slug already exist',
      'description.required' : 'Please insert a description',
      'description.unique' : 'Role description already exist'
      
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
    
   const createUsersRole = new Role()

    createUsersRole.name = request.input('rolename')
    createUsersRole.slug = request.input('slug')
    createUsersRole.description = request.input('description')
    await createUsersRole.save()
    await createUsersRole.permissions().attach(request.input('permissions'))


    session.flash({
		notification:{
		type:'success',
		message:'Role Created'
			}	
	   })
    return response.redirect('/roles')
  }



//Function Defined to update Roles and render updates in database
    async updateRole({params,request,response,session})
  {
    const data = request.only(['rolename', 'slug', 'description'])
    const rules = {
    rolename: 'required',
    slug: 'required',
    description: 'required'
    


    }
    const messages = {
      'rolename.required' : 'Role name required',
      'slug.required'    : 'slug required',
      'description.required' : 'Please insert a description'
      
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


    const UpdateUsersRole = await Role.find(params.id)
    UpdateUsersRole.name = request.input('rolename')
    UpdateUsersRole.slug = request.input('slug')
    UpdateUsersRole.description = request.input('description')
    await UpdateUsersRole.save()

        session.flash({
		notification:{
		type:'success',
		message:'Role Updated'
			}	
	   })
    return response.redirect('/roles')


  }


//Function defined delete role from database
   async deleteRole({ view,session,request, response}){
    if (request.ajax()) {
        // do something
        const id = request.input('id')
            const role = await Role.find(id) 
            await role.delete()

            
              
               session.flash({
                notification:{
                type:'success',
                message:'Role Deleted'
                    }	
            })            
           response.send({
               status: 'success'
           })
        
    } else {
        return 'Bad Request Type...';
    }

}


  

}

module.exports = RoleController
