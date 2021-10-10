var dbContext = {
    knex: null,
  
    getContext: function () {
      knex = require('knex')(process.env.NODE_ENV === "production" ? production : development);
      return knex;
    },
    destroyContext: function () {
      // knex.destroy();
      console.log("Destroy end.");
    }
  };
  module.exports = dbContext;