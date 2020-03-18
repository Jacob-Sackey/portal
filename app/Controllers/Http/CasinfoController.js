'use strict'
const Rate = use('App/Models/Rate')
const Casual = use('App/Models/Casual')
const {validateAll} = use('Validator')

class CasinfoController {
    async CasinfoView({params,view,request}){
         
        //const casinfos = await Casual.query().with('rate').fetch()
         
        const casinfos = await Casual.find(params.id)
        const rate  = await casinfos.rate().fetch()
        console.log(rate)
        return view.render('/pages/casinfo',{casinfos: casinfos.toJSON(), rate: rate.toJSON()})
    
        
    }

      async payinfo({params,request,response,session}){
          const data = request.only(['days', 'overhours','month','am' ])
          const rules = {
          days:'required',
          overhours:'required',
        
          month:'required'
          }

          const messages = {
      'days.required' : 'days required',
      'overhours.required' : 'hours required'  
      
      
     }


    const validation = await validateAll(data, rules, messages)

    if (validation.fails()) {
      session
        .withErrors(validation.messages())
        

        session.flash({
        notification:{
          type:'danger',
          message:'Please fill all details correctly'
            }  
   })

      return response.redirect('back')
    }
    
         
              const casuals = await Casual.find(params.id)
          
              const Payinfo = await casuals.rate().fetch()
             
             Payinfo.days = request.input('days')
             Payinfo.overhours = request.input('overhours')
             Payinfo.TnT = request.input('TnT')
             Payinfo.month = request.input('month')
             Payinfo.allowance = (Payinfo.daily_allow)*request.input('days')
             Payinfo.TnT= (Payinfo.tans_allow)*request.input('days')
             Payinfo.overtime = request.input('overhours')*(Payinfo.overrate)
             Payinfo.basic_allow = request.input('days')*(Payinfo.basic) 
            
             Payinfo.gross = (Payinfo.basic*1)+(Payinfo.daily_allow *request.input('days'))*1+(request.input('overhours')*request.input('days'))*1+((Payinfo.tans_allow)*request.input('days'))
             Payinfo.taxable = (Payinfo.basic*1)+((Payinfo.daily_allow)*request.input('days'))*1+(request.input('overhours')*request.input('days'))*1 + ((Payinfo.tans_allow)*request.input('days')) - (((Payinfo.basic*1)*0.055*0.95)*1) 
             Payinfo.GRA = (Payinfo.basic*1)+((Payinfo.daily_allow)*request.input('days'))*1+(request.input('overhours')*request.input('days'))*1 + ((Payinfo.tans_allow)*request.input('days')) - (((Payinfo.basic*1)*0.055*0.95)*1) * 0.05
             Payinfo.net = (Payinfo.basic*1)+((Payinfo.daily_allow)*request.input('days'))*1+(request.input('overhours')*request.input('days'))*1 + ((Payinfo.tans_allow)*request.input('days')) - (((Payinfo.basic*1)*0.055*0.95)*1) - (((Payinfo.basic*1)+((Payinfo.daily_allow)*request.input('days'))*1+(request.input('overhours')*request.input('days'))*1 +((Payinfo.tans_allow)*request.input('days')) - (((Payinfo.basic*1)*0.055*0.95)*1)) * 0.05)
             Payinfo.comp_cost =(Payinfo.basic*1)+((Payinfo.daily_allow)*request.input('days'))*1+(request.input('overhours')*request.input('days'))*1+((Payinfo.tans_allow)*request.input('days'))+((Payinfo.basic*1)*0.13)
   
             await Payinfo.save()

    

    return response.redirect('/casual')
  }






}


module.exports = CasinfoController
