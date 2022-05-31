const mysql = require("mysql2");
const dotenv = require("dotenv/config");


function getConnection() {
    return mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD
    });
}

function createArticle(connection, headline, full_text, img_path) {

    const sql = `INSERT INTO Articles (headline, image_path, full_text) VALUES ('${headline}', '${img_path}', '${full_text}');`;

    connection.query(sql, function(err, results) {
        if(err) console.log(err);
        else console.log(results);
    });
    connection.end();
}

function showArticles(connection) {
    return new Promise(function (resolve, reject) {
        const sql = `SELECT * FROM Articles;`;

        connection.query(sql, function (err, results) {
            if (err) console.log(err);
            resolve(results);
        });
        connection.end();

    })
}

function deleteArticle(connection, id) {
    const sql = `DELETE FROM Articles WHERE id=${id}`;
    connection.query(sql, function (err, results) {
        if (err) console.log(err);
        else console.log(results);
    });
    connection.end();
}

function updateArticle(connection, id, headline, full_text) {
    const sql = `UPDATE Articles SET headline='${headline}', full_text='${full_text}' WHERE id='${id}'`;
    let res;

    connection.query(sql, function(err, results) {
        if(err) console.log(err);
        else console.log(results);
        res = results;
    });
    connection.end();
    return res;
}

module.exports = {
    updateArticle,
    createArticle,
    deleteArticle,
    showArticles,
    getConnection
}
// updateArticle(connection, 1,'Стаття про JS', 'JS - мова програмування.');