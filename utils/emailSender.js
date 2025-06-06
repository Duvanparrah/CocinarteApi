require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Si ya tienes otras funciones de correo, las dejas.
// Agrega esta función también:
const enviarCorreoSuspension = async (correoDestino, motivo) => {
  try {
    await transporter.sendMail({
      from: `"CocinArte 👩‍🍳" <${process.env.EMAIL_USER}>`,
      to: correoDestino,
      subject: 'Cuenta suspendida en CocinArte',
      html: `
        <p>Hola,</p>
        <p>Tu cuenta ha sido <strong>suspendida</strong> por la siguiente razón:</p>
        <blockquote>${motivo}</blockquote>
        <p>Si tienes alguna duda, puedes comunicarte con nosotros.</p>
        <p>Atentamente,<br/>El equipo de CocinArte</p>
      `,
    });
  } catch (error) {
    console.error('Error enviando el correo de suspensión:', error);
  }
};

// Exporta todo lo que necesites
module.exports = {
  enviarCorreoSuspension,
  // otras funciones que ya tengas
};
