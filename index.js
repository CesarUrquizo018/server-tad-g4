//index.js
const express = require('express');
const cors = require('cors');

const usuarioRoutes = require('./src/routes/routes_usuario');
const proyectoRoutes = require('./src/routes/routes_proyecto');
const authRoutes = require('./src/routes/routes_auth');
const fuenteRoutes = require('./src/routes/routes_fuente');
const anotacionRoutes = require('./src/routes/routes_anotacion');
const otroRoutes = require('./src/routes/routes_otro');
const miembrosProyectoRoutes = require('./src/routes/routes_miembros_proyecto');
const solicitudRoutes = require('./src/routes/routes_solicitud');
const estadoSolicitudRoutes = require('./src/routes/routes_estado_solicitud');

const app = express();
app.use(cors());

app.get('/', (req, res) => {
  res.send('Servidor Funcionando!');
});

app.use('/api/usuarios', usuarioRoutes);
app.use('/api/proyectos', proyectoRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/fuente', fuenteRoutes);
app.use('/api/anotacion', anotacionRoutes);
app.use('/api/otro', otroRoutes);
app.use('/api/miembros_proyecto', miembrosProyectoRoutes);
app.use('/api/solicitudes', solicitudRoutes);
app.use('/api/estado_solicitudes', estadoSolicitudRoutes);

//const PORT = process.env.PORT || 3000;
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});
