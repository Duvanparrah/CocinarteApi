const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const path = require("path");
require("dotenv").config();

const authRoutes = require("./routes/auth.routes.js");
const stripeRoutes = require("./routes/stripe.router.js");
const paymentRoutes = require("./routes/payment.router.js");
const suscripcionesRoutes = require("./routes/suscripcion.route.js");
const tipoPlanRoutes = require('./routes/tipoPlan.router.js');
const planSemanalRoutes = require("./routes/plansemanal.route.js");
const diaPlanRoutes = require("./routes/diaplan.route.js");
const comidaDiaRoutes = require("./routes/comidadia.route.js");
const respuestaRoutes = require("./routes/respuesta.router.js");
const planNutricionalRoutes = require("./routes/plannutricional.router.js");
const ingredienteRoutes = require("./routes/ingrediente.route.js");
const ingredienteComida = require("./routes/ingredientecomida.route.js");



//const { FRONTEND_URL } = require("./config.js");

const app = express();

//app.use(
  //cors({
    //credentials: true,
    //origin: FRONTEND_URL,
 // })
//);
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use(stripeRoutes);
app.use(express.static(path.resolve("src/public")));
//ruta pago
app.use("/api/payment", paymentRoutes);
app.use('/api/suscripciones',suscripcionesRoutes);
app.use('/api/tipo-planes',tipoPlanRoutes);
app.use("/api/planes-semanales", planSemanalRoutes);
app.use("/api/dias-plan", diaPlanRoutes);
app.use("/api/comidas-dia", comidaDiaRoutes);
app.use("/api/respuesta", respuestaRoutes);
app.use("/api/plan",planNutricionalRoutes);
app.use("/api/ingredientes",ingredienteRoutes);
app.use("/api/ingredienteC",ingredienteComida);

//ruta para iniciar secion con google
//app.get('/auth/google',
 // passport.authenticate('google', { scope: ['profile'] }));



// rutas de objetivo

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/dist"));

  app.get("*", (req, res) => {
    console.log(path.resolve("client", "dist", "index.html"));
    res.sendFile(path.resolve("client", "dist", "index.html"));
  });
}
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Algo salió mal', error: err.message });
});

module.exports = app;
