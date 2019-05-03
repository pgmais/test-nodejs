const app = require('./config/express');
app.listen(process.env.PORT || 3000, () => console.log('Servidor iniciado na porta 3000'));