'use strict';
var moment = require('moment');

/**
 * Read the documentation (https://strapi.io/documentation/3.0.0-beta.x/concepts/services.html#core-services)
 * to customize this service
 */

const nodemailer = require('nodemailer');

// Create reusable transporter object using SMTP transport.
const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "0263f25ebb0222",
    pass: "40d3de60d83269"
  }
});

module.exports = {
  async generate(IdPelanggar, Denda = {}) {

    let date = moment().format('DDMMYYYY').toString()

    let Total = parseInt(Denda) + ( parseInt(Denda) * 10 )

    let InvoiceNumber = date + '-' + IdPelanggar + '-' +  Math.random() * 10
    console.log(InvoiceNumber)

    let find = await strapi.query('invoice').findOne({ IdPelanggar })

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
  sendInvoices: (from, to, subject, text) => {
    // Setup e-mail data.
    const options = {
      from,
      to,
      subject,
      text,
    };

    // Return a promise of the function that sends the email.
    return transport.sendMail(options);
  },
};
