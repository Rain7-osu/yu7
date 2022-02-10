const sqlite = require('sqlite3').verbose();
const db = new sqlite.Database('./data.db');

// db.serialize(() => {
//   db.run('CREATE TABLE IF NOT EXISTS i18n (id INTEGER PRIMARY KEY, key TEXT, en TEXT, zh TEXT)');
//
//   const stmt = db.prepare('INSERT INTO i18n VALUES (?, ?, ?, ?)');
//   stmt.run(1, 'hello', 'Hello', '你好');
//   stmt.finalize();
//
//   db.each('SELECT * FROM i18n', (err, row) => {
//     console.log(row);
//   });
// });
//
// db.close();

const insert = (key, en, zh) => {
  db.run(`INSERT INTO i18n VALUES (NULL, '${key}', '${en}', '${zh}')`);
};

const update = (id, key, en, zh) => {
  db.run(`UPDATE i18n SET key='${key}', en='${en}', zh='${zh}' WHERE id=${id}`);
};

const remote = (id) => {
  db.run(`DELETE FROM i18n WHERE id=${id}`);
};

const get = (id) => {
  return new Promise((resolve, reject) => {
    db.get(`SELECT * FROM i18n WHERE id=${id}`, (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
};

const getAll = () => {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM i18n`, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

module.exports = {
  insert,
  update,
  remote,
  get,
  getAll,
};
