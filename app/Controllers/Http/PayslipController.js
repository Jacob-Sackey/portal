'use strict'
const Casual = use('App/Models/Casual')
const Rate =use('App/Models/Rate')
const Database = use('Database')

class PayslipController {
        async PayslipView({view,params,request,response}){
       
              
              const casual = await Casual.find(params.id)
            
              const rate= await casual.rate().fetch()
             
               return view.render('pages.payslip', {casual: casual.toJSON(),rate:rate.toJSON()
               })         
      
            
        }

}

module.exports = PayslipController
