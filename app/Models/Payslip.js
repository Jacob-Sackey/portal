'use strict'

const Model = use('Model')

class Payslip extends Model {
        casual () {
        return this.belongsTo('App/Models/Casual')
      }
}

module.exports = Payslip
