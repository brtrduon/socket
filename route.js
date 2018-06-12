module.exports = (app) => {
    app.get('/', (req, res) => {
        res.sendFile(__dirname + '/views/index.html');
    });

    app.get('/login', (req, res) => {
        res.sendFile(__dirname + '/views/login.html');
    });
}