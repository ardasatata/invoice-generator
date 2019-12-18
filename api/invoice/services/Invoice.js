'use strict';
var moment = require('moment');

/**
 * Read the documentation (https://strapi.io/documentation/3.0.0-beta.x/concepts/services.html#core-services)
 * to customize this service
 */

module.exports = {
  async generate(IdPelanggar, Denda = {}) {

    let date = moment().format('DDMMYYYY').toString()

    let Total = Denda + ( Denda * 0.1 )

    let InvoiceNumber = date + '-' + IdPelanggar
    console.log(InvoiceNumber)

    strapi.query('invoice').findOne(params, populate);

    return strapi.query('invoice').create({
      TotalBayar : Total,
      InvoiceNumber,
      IdPelanggar
    });
  },
};
