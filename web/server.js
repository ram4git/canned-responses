const express = require('express');
const app = express();
const path = require("path");
const sqlite3 = require('sqlite3').verbose();
const db_name = path.join(__dirname, "main.db");

console.log('DB NAME=', db_name);

const db = new sqlite3.Database(db_name, error => {
    if(error) {
        console.log('Unable to connect to DB')
    }
    console.log('Connected to DB')
})
/**
 * CREATE TABLE IF NOT EXISTS RESPONSES (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  key VARCHAR(100) NOT NULL,
  value VARCHAR(100) NOT NULL,
);

INSERT INTO RESPONSES ( key, value) VALUES 
('gm', 'good day for martial arts'),
('gb', 'have a nice rest of day');

commit;

 * 
 * 
 * 
 */

app.use('/nest', (req, res, next) => {
    console.log('Request type: ', req.method);
    next();
});

app.get('/api/list', (req, res) => {
    res.send({ram: 'ram', sam: 'sam'});
});
app.get('/api/response/get', (req, res) => {
    const query = 'SELECT * FROM RESPONSES WHERE key like ?';
    const results = [];
    db.all(query,[req.query.key], (err, rows) => {
        //throw error if any
        if(err) {
            console.log('Unable to fetch key ' + req.query.key, err)
        } else {
            console.log('ROWS=', rows);
            rows.forEach(r => results.push({docid: r.id, message: r.value}))
            res.json({
                type: 'success',
                results: results
            });
        }

    });
});
app.get('/api/response/get-all', (req, res) => {
    const query = 'SELECT * FROM RESPONSES';
    const results = [];
    db.all(query,[], (err, rows) => {
        //throw error if any
        if(err) {
            console.log('Unable to fetch keys!', err)
        } else {
            console.log('ROWS=', rows);
            rows.forEach(r => results.push({key: r.key}));
            res.json({
                type: 'success',
                results: results
            });
        }

    });

});
app.get('/api/response/find', (req, res) => {
    const query = 'SELECT * FROM RESPONSES WHERE key like ?';
    const results = [];
    db.all(query,[req.query.key], (err, rows) => {
        //throw error if any
        if(err) {
            console.log('Unable to fetch key ' + req.query.key, err)
        } else {
            console.log('ROWS=', rows);
            rows.forEach(r => results.push({docid: r.id, message: r.value}))
            res.json({
                type: 'success',
                results: results
            });
        }

    });
});

app.listen(3000, () => console.log('Gator app listening on port 3000!'));