'use strict';

const services = require("../services/library");

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
    availability: async ctx => {
        const books = await services.queryBooks();
        const booksAvaliability = await services.queryBooksAvaliability({ books })
        return ctx.send(booksAvaliability);
    }
};
