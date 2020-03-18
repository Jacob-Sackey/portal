'use strict'
const Permission = use('Permission')
const { validateAll} = use('Validator')
const Role = use('Role')

//Initiallizing Permissions Controller
class PermissionController {

//Function defined to render permission view  
  async show({view}){
  const permissions = await Permission.all()
   return view.render('permissions.showpermissions',{permissions : permissions.toJSON() })
  }


//Function defined to create permissions
  async showCreatePermission({request,view})
  {
      return view.render('permissions.createpermissions')
  }


//Function defined to edit permissions
    async showEditPermission({view,params})
  { 
      const permission = await Permission.find(params.id)
      console.log(permission)
      return view.render('permissions.editpermissions',{
          permission : permission.toJSON()
      })
  }


//Function defined to view permission details as stored in database
   async viewPermission({view,params})
  { 
      const permission = await Permission.find(params.id)
      console.log(permission)
      return view.render('permissions.permissionview',{
          permission : permission.toJSON()
      })
  }



//Function defined to update permissions stored in database
  async updatePermission({params,request,response,session})
  {
    const data = request.only(['permissionname', 'slug', 'description'])
    const rules = {
    permissionname: 'required',
    slug: 'required',
    description: 'required'
    


    }
    const messages = {
      'permissionname.required' : 'Permission name required',
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


    const UpdateUsersPermission = await Permission.find(params.id)
    UpdateUsersPermission.name = request.input('permissionname')
    UpdateUsersPermission.slug = request.input('slug')
    UpdateUsersPermission.description = request.input('description')
    await UpdateUsersPermission.save()

        session.flash({
		notification:{
		type:'success',
		message:'Permission Updated'
			}	
	   })
    return response.redirect('/permissions')


  }




//Function defined delete permission from database
   async deletePermission({ view,session,request, response}){
    if (request.ajax()) {
        // do something
        const id = request.input('id')
            const permission = await Permission.find(id) 
            await permission.delete()

            
              
               session.flash({
                notification:{
                type:'success',
                message:'Permission Deleted'
                    }	
            })            
           response.send({
               status: 'success'
           })
        
    } else {
        return 'Bad Request Type...';
    }

}



//Function defined to store newly created permissions in data base
  async store({request,response,session}){
    const data = request.only(['permissionname', 'slug', 'description'])
    const rules = {
    permissionname: 'required|unique:permissions,name',
    slug: 'required|unique:permissions,slug',
    description: 'required|unique:permissions,description'   
    }

    const messages = {
      'permissionname.required' : 'Permission name required',
      'permissionname.unique':'Permission Name already exist',
      'slug.required'    : 'slug required',
      'slug.unique'    : 'slug already exist',
      'description.required' : 'Please insert a description',
      'description.unique' : 'slug description already exist'
      
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
    
   const createUsersPermission = new Permission()

    createUsersPermission.name = request.input('permissionname')
    createUsersPermission.slug = request.input('slug')
    createUsersPermission.description = request.input('description')
    await createUsersPermission.save()

    session.flash({
		    notification:{
		    type:'success',
		    message:'Permission Created'
			}	
	   })
    return response.redirect('/permissions')
  }


}

module.exports = PermissionController
