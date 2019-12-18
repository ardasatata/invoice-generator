'use strict';
var moment = require('moment');

/**
 * Read the documentation (https://strapi.io/documentation/3.0.0-beta.x/concepts/services.html#core-services)
 * to customize this service
 */

module.exports = {
  async generate(IdPelanggar, Denda = {}) {

    let date = moment().format('DDMMYYYY').toString()

    let Total = parseInt(Denda) + ( parseInt(Denda) * 0.1 )

    let InvoiceNumber = date + '-' + IdPelanggar
    console.log(InvoiceNumber)

    let find = await strapi.query('invoice').findOne({ IdPelanggar })

    // console.log(find)
    // console.log(find.id)
    //
    // return find

    if(find){
      return strapi.query('invoice').update(
        {
          id : find.id
        },
        {
          TotalBayar : Total,
          InvoiceNumber,
          IdPelanggar
        }
      );
    } else {
      return strapi.query('invoice').create({
        TotalBayar : Total,
        InvoiceNumber,
        IdPelanggar
      });
    }

    // console.log(strapi.query('invoice').find({ IdPelanggar }))
    // return strapi.query('invoice').findOne({ IdPelanggar })

    // return strapi.query('invoice').create({
    //   TotalBayar : Total,
    //   InvoiceNumber,
    //   IdPelanggar
    // });
  },
};
