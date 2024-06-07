const express = require('express');
const cors = require('cors'); // Import cors package
const app = express();
const port = 3000;

app.use(cors()); // Enable CORS for all routes

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/calculate', (req, res) => {
    const { num1, num2, operation } = req.body;
    let result;

    switch (operation) {
        case 'addition':
            result = num1 + num2;
            break;
        case 'subtraction':
            result = num1 - num2;
            break;
        case 'multiplication':
            result = num1 * num2;
            break;
        case 'division':
            result = num1 / num2;
            break;
        default:
            result = 'Invalid operation';
    }

    res.json({ result });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});