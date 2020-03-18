'use strict'

const Schema = use('Schema')

class ServicesSchema extends Schema {
  up() {
    this.create('services', (table) => {
      table.increments()
      table.timestamps()
      table.string('service_name')
      table.string('link_owner')
      table.string('aggregation')
      table.string('status')
      table.string('bandwidth')
      table.string('vlan')
      table.string('last_mile_trx')
      table.string('last_mile_equipment')
      table.string('coordinates')

    })
  }

  down() {
    this.drop('services')
  }
}

module.exports = ServicesSchema
