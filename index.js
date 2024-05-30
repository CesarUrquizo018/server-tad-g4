const express = require('express');
const usuarioRoutes = require('./src/routes/routes_usuario');
const proyectoRoutes = require('./src/routes/routes_proyecto');
const fuenteRoutes = require('./src/routes/routes_fuente');
const anotacionRoutes = require('./src/routes/routes_anotacion');
const otroRoutes = require('./src/routes/routes_otro');
const authRoutes = require('./src/routes/routes_auth');

const app = express();

app.use('/api/usuarios', usuarioRoutes);
app.use('/api/proyectos', proyectoRoutes);
app.use('/api/fuente', fuenteRoutes);
app.use('/api/anotacion', anotacionRoutes);
app.use('/api/otro', otroRoutes);
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});
