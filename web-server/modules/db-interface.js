var mysql = require('mysql');
const fs = require('fs');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Groupauto2023!',
    database: 'statsTarghe'
});


connection.connect();

/*
connection.query('SELECT * FROM ricerca r JOIN officina o ON r.partitaIVA = o.partitaIVA', function (error, results, fields) {
    if (error) throw error;
    const plainObject = results.map(result => ({ ...result }));
    fs.writeFileSync('data.json', JSON.stringify(plainObject));
});
*/

connection.query("SELECT * FROM modello_per_provincia", function (error, results, fields) {
    if (error) throw error;
    const plainObject = results.map(result => ({ ...result }));
    fs.writeFileSync('modello_per_provincia.json', JSON.stringify(plainObject));
});

connection.end();
