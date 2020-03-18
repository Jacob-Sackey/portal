'use strict'
const Rate = use('App/Models/Rate')
const Service = use('App/Models/Service')
const Custom = use('App/Models/Custom')
const {
  validateAll
} = use('Validator')
class CustomController {
  async CustomView({
    view
  }) {
    const customs = await Custom.query().with('service').fetch()
    // const services = await Service.query().all()
    const services = await Service.all()
    return view.render('/pages/custom', {
      customs: customs.toJSON(),
      services: services.toJSON()
    })

  }
  async createcas({
    view
  }) {
    return view.render('/customs/createcustom')
  }

  async makecustom({
    request,
    response,
    session
  }) {
    const data = request.only(['name', 'contact', 'role', 'site_id', 'tans_allow', 'basic', 'daily_allow', 'overrate'])
    const rules = {
      name: 'required',
      contact: 'required',
      role: 'required',
      site_id: 'required',



    }


    const messages = {
      'name.required': 'Name required',
      'contact.required': 'Contact required',
      'role.required': 'Please choose a rule',
      'site_id.required': 'Specify corresponding Site ID'


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

    const createCasu = new Custom()


    createCasu.name = request.input('name')
    createCasu.contact = request.input('contact')
    createCasu.role = request.input('role')
    createCasu.site_id = request.input('site_id')



    await createCasu.save()


    const rate = new Rate()
    rate.custom_id = createCasu.id
    rate.tans_allow = request.input('tans_allow')
    rate.basic = request.input('basic')
    rate.daily_allow = request.input('daily_allow')
    rate.overrate = request.input('overrate')
    rate.SSNIT = request.input('basic') * 0.055 * 0.95
    rate.SSF_13 = request.input('basic') * 0.13
    await rate.save()



    session.flash({
      notification: {
        type: 'success',
        message: 'Custom Created'
      }
    })
    return response.redirect('/custom')
  }

  //function defined to update existing customs
  async Updatecustom({
    params,
    request,
    response,
    session
  }) {
    const data = request.only(['name', 'contact', 'role', 'site_id', 'tans_allow'])
    const rules = {
      name: 'required',
      contact: 'required',

      role: 'required,',
      site_id: 'required',

    }
    const messages = {
      'name.required': 'Site Name required',
      'contact.required': 'Site Location required',

      'role.required': 'Date custom commenced',
      'dsite_id.required': 'Date custom was completed'

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

    const Updatecustom = await custom.find(params.id)


    Updatecustom.name = request.input('name')
    Updatecustom.contact = request.input('contact')
    Updatecustom.role = request.input('role')
    Updatecustom.site_id = request.input('site_id')
    await Updatecustom.save()

    const custom = await Custom.find(params.id)
    const updaterate = await custom.rate().fetch()
    updaterate.tans_allow = request.input('tans_allow')
    updaterate.save()



    session.flash({
      notification: {
        type: 'success',
        message: 'Custom Updated'
      }
    })
    return response.redirect('/custom')


  }

  async showEditcustom({
    view,
    params
  }) {

    const customs = await Custom.find(params.id)
    const rate = await customs.rate().fetch()
    return view.render('/customs/editcustom', {
      customs: customs.toJSON(),
      rate: rate.toJSON()
    })


  }

  //functions to view details

  async viewcasDetails({
    view,
    params
  }) {
    const custom = await Custom.find(params.id)
    const rate = await custom.rate().fetch()

    return view.render('/customs/customview', {
      custom: custom.toJSON(),
      rate: rate.toJSON()
    })
  }
  //Function defined to delete custom
  async deletecustom({
    view,
    request,
    session,
    response
  }) {
    if (request.ajax()) {
      const id = request.input('id')
      const custom = await Custom.find(id)
      await custom.delete()

      response.send({
        status: 'success'
      })
    } else {
      return 'Bad request Type...';
    }

  }





}



module.exports = CustomController
