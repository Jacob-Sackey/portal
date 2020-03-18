'use strict'
const Custom = use('App/Models/Custom')
const Service = use('App/Models/Service')
const {
  validateAll
} = use('Validator')




class ServiceController {
  async ServiceView({
    view
  }) {
    const services = await Service.all()
    return view.render('/pages/service', {
      services: services.toJSON()
    })


  }
  async createserv({
    view
  }) {
    return view.render('/services/createservice')
  }

  //Function defined to store newly created services in data base
  async Createservice({
    request,
    response,
    session
  }) {
    const data = request.only(['servicename', 'linkowner', 'aggregation', 'status', 'bandwidth'])
    const rules = {
      service: 'required',
      linkowner: 'required',
      aggregation: 'required',
      status: 'required,',
      bandwidth: 'required'
    }


    const messages = {
      'sitename.required': 'Site Name required',
      'sitelocation.required': 'Site Location required',
      'description.required': 'Please insert a description',
      'datecommenced.required': 'Date service commenced',
      'datecompleted.required': 'Date service was completed'

    }


    const validation = await validateAll(data, rules, messages)

    if (validation.fails()) {
      session
        .withErrors(validation.messages())


      session.flash({
        notification: {
          type: 'danger',
          message: 'Please fill all details correctly'
        }
      })

      return response.redirect('back')
    }

    const createSer = new Service()

    createSer.service_name = request.input('servicename')
    createSer.link_owner = request.input('linkowner')
    createSer.aggregation = request.input('aggregation')
    createSer.status = request.input('status')
    createSer.bandwidth = request.input('bandwidth')
    await createSer.save()

    session.flash({
      notification: {
        type: 'success',
        message: 'Service Created'
      }
    })
    return response.redirect('/services')
  }


  //function defined to update existing services
  async UpdateService({
    params,
    request,
    response,
    session
  }) {
    const data = request.only(['sitename', 'sitelocation', 'description', 'datecommenced', 'datecompleted'])
    const rules = {
      sitename: 'required',
      sitelocation: 'required',

      datecommenced: 'required,',
      datecompleted: 'required'



    }


    const messages = {
      'sitename.required': 'Site Name required',
      'sitelocation.required': 'Site Location required',

      'datecommenced.required': 'Date service commenced',
      'datecompleted.required': 'Date service was completed'

    }


    const validation = await validateAll(data, rules, messages)

    if (validation.fails()) {
      session
        .withErrors(validation.messages())


      session.flash({
        notification: {
          type: 'danger',
          message: 'Please fill all details correctly'
        }
      })

      return response.redirect('back')
    }

    const updateSite = await Service.find(params.id)
    console.log(updateSite)

    updateSite.site_name = request.input('sitename')
    updateSite.site_location = request.input('sitelocation')
    updateSite.description = request.input('description')
    updateSite.date_commenced = request.input('datecommenced')
    updateSite.date_completed = request.input('datecompleted')
    await updateSite.save()

    session.flash({
      notification: {
        type: 'success',
        message: 'Permission Updated'
      }
    })
    return response.redirect('/services')




  }

  //Function defined to render edit service view
  async showEditService({
    view,
    params
  }) {

    const services = await Service.find(params.id)
    return view.render('/services/editservices', {
      services: services.toJSON()
    })


  }


  async indexx({
    view,
    params
  }) {

    //const services = await service.all();
    const service = await Service.find(params.id)
    return view.render('editservice', {
      service: service.toJSON()

    })
  }
  //functions to view details

  async viewProjDetails({
    view,
    params
  }) {
    const service = await Service.find(params.id)
    return view.render('/services/serviceview', {
      service: service.toJSON()
    })
  }








  //Function defined to delete service
  async deleteservice({
    view,
    request,
    session,
    response
  }) {
    if (request.ajax()) {
      const id = request.input('id')
      const service = await Service.find(id)
      await service.delete()

      response.send({
        status: 'success'
      })
    } else {
      return 'Bad request Type...';
    }

  }

}

module.exports = ServiceController
