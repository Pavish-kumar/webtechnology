const {MongoClient} = require('mongodb');
const express = require('express');
const app = express();
const bodyparser = require('body-parser');

app.use(bodyparser.urlencoded({ extended: true }));

var monurl = 'mongodb://localhost:27017/';
var dbname = 'form_data';
MongoClient.connect(monurl)
    .then((client) => {
        db = client.db(dbname);
        console.log(`Connected to MongoDb: ${dbname}`);
    })
    .catch((err) => {
        console.log('Error Connecting to db', err);
        process.exit(1);
    });

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/insert', async (req, res) => {
    const { name, num, mail } = req.body;
    if (!db) {
        res.status(500).send('Database not initialised');
        return;
    }
    try {
        const result = await db.collection('records').insertOne({ name, num, mail });
        console.log('Number of records inserted: ' + result.insertedCount);
        res.redirect('/');
    } catch (err) {
        console.log('Error inserting data', err);
        res.status(500).send('Failed to insert data');
    }
});

app.get('/report', async (req, res) => {
    try {
        const records = await db.collection('records').find().toArray();
        console.log(records);

        let tablecontent = `
<style>
body {
    background: url("https://images.unsplash.com/photo-1524901545429-b297e6250906?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1350&q=80");
    background-size: cover;
    background-repeat: no-repeat;
    font-family: 'Roboto', sans-serif;
    color: #fff;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

table {
    margin: 7rem auto;
    width: 80%;
    border-collapse: collapse;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
    background: rgba(0, 0, 0, 0.7);
}

table th, table td {
    border: 1px solid #ddd;
    padding: 1rem;
    text-align: left;
    color: #fff;
}

table th {
    background-color: #333;
    font-weight: bold;
}

h1 {
    text-align: center;
    font-family: 'Verdana', sans-serif;
    margin-top: 2rem;
    color: #fff;
}

a {
    text-decoration: none;
    color: inherit;
}

button {
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    margin: 0.5rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

button a {
    font-size: 1rem;
    color: white;
}

button a:hover {
    background-color: yellow;
    color: black;
}

.update-btn {
    background-color: #4caf50;
}

.update-btn:hover {
    background-color: #45a049;
}

.delete-btn {
    background-color: #f44336;
}

.delete-btn:hover {
    background-color: #e53935;
}

.back-btn {
    display: block;
    width: 10rem;
    height: 3rem;
    margin: 2rem auto;
    text-align: center;
    line-height: 3rem;
    background-color: #2196f3;
    color: white;
    border-radius: 5px;
}

.back-btn:hover {
    background-color: #1976d2;
}

</style>

<h1>Report</h1>
<table>
<tr>
    <th>Name</th>
    <th>Mobile</th>
    <th>Email</th>
    <th>Action1</th>
    <th>Action2</th>
</tr>`;

        tablecontent += records.map(item => `
<tr>
    <td>${item.name || ' '}</td>
    <td>${item.num || ' '}</td>
    <td>${item.mail || ' '}</td>
    <td>
        <button class="update-btn"><a href="/change/${item.name}">Update</a></button>
    </td>
    <td>
        <button class="delete-btn"><a href="/delete/${item.name}">Delete</a></button>
    </td>
</tr>`).join(" ");

        tablecontent += `
</table>
<a class="back-btn" href="/">Back to Form</a>`;

        res.send(tablecontent);
    } catch (err) {
        console.log("error fetching data", err);
        res.status(500).send('Unable to fetch data');
    }

});

app.get('/change/:name', async (req, res) => {
    res.sendFile(__dirname + '/upd.html');
})

app.post('/update/:name', async (req, res) => {
    try {
        var un = req.params.name;
        const { name, num, mail } = req.body;
        await db.collection('records').updateOne({ 'name': un }, { $set: { name, num, mail } });
        res.redirect('/report');

    } catch (err) {
        console.log('Error updating data', err)
        res.status(500).send('Unable to update data');
    }

});

app.get('/delete/:name', async (req, res) => {
    try {
        var name = req.params.name;
        await db.collection('records').deleteOne({ name });
        res.redirect('/report');
        console.log("deleted");
    } catch (err) {
        console.log('Unable to delete data', err);
        res.status(500).send('Failed to delete data');
    }

})

app.listen(5000);
console.log("server running");
