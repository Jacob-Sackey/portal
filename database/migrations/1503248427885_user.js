'use strict'

const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()
      table.string('username', 80).notNullable().unique()
      table.string('email', 254)
      table.string('password', 60).notNullable()
      table.string('name',254).notNullable().unique()
      table.string('phone',15).notNullable()
      table.string('employee_number',60).notNullable().unique()
      table.string('department',80).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
