'use strict';

const { parseMultipartData, sanitizeEntity } = require('strapi-utils');

/**
 * Read the documentation (https://strapi.io/documentation/3.0.0-beta.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  /**
   * Create a record.
   *
   * @return {Object}
   */

  async create(ctx) {
    let entity;
    console.log('override create invoice')
    if (ctx.is('multipart')) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.services.invoice.create(data, { files });
    } else {
      entity = await strapi.services.invoice.create(ctx.request.body);
    }
    console.log(ctx.request.body)
    await strapi.services.invoice.generate(
      entity
    );
    return sanitizeEntity(entity, { model: strapi.models.invoice });
  },

  async generate(ctx) {
    console.log('generate controller')
    console.log(ctx)

    const entity = await strapi.services.pelanggar.findOne(ctx.params);

    const invoice = await strapi.services.invoice.generate(
      entity.id,
      entity.Denda
    );

    return sanitizeEntity(invoice, { model: strapi.models.invoice });
  }
};
