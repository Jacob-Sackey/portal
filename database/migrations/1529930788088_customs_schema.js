'use strict'

const Schema = use('Schema')

class CustomsSchema extends Schema {
  up() {
    this.create('customs', (table) => {
      table.increments()
      table.timestamps()
      table.string('name')
      table.string('contact')
      table.string('role')
      table.string('site_id')
    })
  }

  down() {
    this.drop('customs')
  }
}

module.exports = CustomsSchema
