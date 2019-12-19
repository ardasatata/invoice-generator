'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/3.0.0-beta.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async bulkImport(ctx) {
    console.log('Bulk Import Pelanggar')

    console.log(ctx.request.body)

    const pelanggars = ctx.request.body

    await pelanggars.forEach((item,index)=>{
      const pelanggar = strapi.services.pelanggar.create(item);
    })

    ctx.response.status=200

    return ctx.response;
  },
  async generateAllInvoice(ctx){
    console.log('Generate all pelanggar invoice')

    const pelanggars = await strapi.query('pelanggar').find({ _limit: -1 });

    asyncForEach(pelanggars, async (item,index)=>{
      const invoice =  await strapi.services.invoice.generate(
        item.id,
        item.Denda
      );
    })


    ctx.response.status=200
    return ctx.response;
  },
  async sendInvoice(ctx) {
    console.log('send invoice to pelanggar')

    const entity = await strapi.services.pelanggar.findOne(ctx.params);

    console.log(entity)

    const text = entity.InvoiceNumber.TotalBayar

    const send = await strapi.services.invoice.sendInvoices(
      'bayar@polri.go.id',
      'test@email.com',
      'Saudara ' + entity.Name + ' Anda memiliki denda yang belum dibayarkan',
      'Total denda yang harus dibayarkan : ' +text
    );
    return send;
  }
};

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}
