'use strict'
const Casual = use('App/Models/Casual')
const Rate =use('App/Models/Rate')

class PregisterController {
        async PregisterView({view}){
        const pregisters = await Casual.query().with('rate').fetch()
        return view.render('/pages/pregister',{pregisters: pregisters.toJSON()})
    }
  
}

module.exports = PregisterController
