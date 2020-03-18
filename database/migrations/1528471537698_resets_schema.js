'use strict'

const Schema = use('Schema')

class ResetsSchema extends Schema {
  up () {
    this.create('resets', (table) => {
      table.increments()
      table.timestamps()
      table.integer('user_id').unsigned()
      table.string('email', 60).notNullable()
      table.string('token', 60).notNullable()
    })
  }

  down () {
    this.drop('resets')
  }
}

module.exports = ResetsSchema
