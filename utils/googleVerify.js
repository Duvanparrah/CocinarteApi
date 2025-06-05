const { OAuth2Client } = require("google-auth-library");

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID || "your-google-client-id";  // Obtén tu CLIENT_ID de la Consola de Desarrolladores de Google
const client = new OAuth2Client(CLIENT_ID);

// Función para verificar el token de Google
const verifyGoogleToken = async (idToken) => {
  try {
    const ticket = await client.verifyIdToken({
      idToken,
      audience: CLIENT_ID,  // El CLIENT_ID de tu aplicación de Google
    });
    const payload = ticket.getPayload();
    return payload;
  } catch (error) {
    throw new Error("Token de Google inválido o no verificable");
  }
};

module.exports = {
  verifyGoogleToken,
};
