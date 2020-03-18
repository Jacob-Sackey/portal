'use strict'

class DashboardController {
      async show({view}){

   return view.render('dashboard.showdashboard')
  }

    async showCal({view}){

   return view.render('dashboard.Calendar')
  }
}

module.exports = DashboardController
