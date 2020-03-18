'use strict'

const Model = use('Model')

class Rate extends Model {
        casual () {
        return this.belongsTo('App/Models/Casual')
      }
}

module.exports = Rate
