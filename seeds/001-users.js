
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: 'ryder', password: 'password'},
        {username: 'ryder1', password: 'password1'},
        {username: 'ryderasdas', password: 'passwordasd'},
      ]);
    });
};
