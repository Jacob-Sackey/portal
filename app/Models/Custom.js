'use strict'

const Model = use('Model')

class Custom extends Model {
  service() {
    return this.hasOne('App/Models/Service')
  }


  rate() {
    return this.hasOne('App/Models/Rate')
  }


  pay() {
    return this.hasOne('App/Models/Pay')
  }

}

module.exports = Custom
