const express = require('express');
const hbs = require('hbs');
const fs = require('fs');


const app = express();

app.set('view engine', 'html');
app.engine('html', hbs.__express);


const dummyFunc = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject('error')
        }, 3000)
    })
};

const func = async (req, res, next) => {
    const log = `${new Date()} : ${req.method} ${req.url}`;

    try {
        const result = await dummyFunc();
        console.log(result)
    } catch (e) {
        console.log(e);
    }

    console.log(log);
    fs.appendFile(__dirname + '/request.log', log, () => {
        console.log('Unable to write log')
    });
    res.render('maintanence.html')
};

app.use(func);


app.get('/about', (req, res) => {
    res.render('about.html', {page: 'About Page', year: new Date().getFullYear()})
});

app.listen(3000);