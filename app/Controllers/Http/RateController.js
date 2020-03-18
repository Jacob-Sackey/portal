'use strict'

class RateController {
   async RateView({view}){
    return view.render('/pages/rates')
    }
    async ratedisplay({view}){
        const rates = await rate.all()
        return view.render('/pages/casual',{rates: rates.toJSON()})
    }

}

module.exports = RateController
