'use strict'

const Model = use('Model')

class Pay extends Model {
        casual () {
        return this.belongsTo('App/Models/Casual')
      }
}

module.exports = Pay
