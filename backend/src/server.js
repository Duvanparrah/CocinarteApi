const app = require("./app.js");
const { PORT } = require("./config.js");
const { connectDB } = require("./db.js");

async function main() {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Listening on port http://localhost:${PORT}`);
      console.log(`Environment: ${process.env.NODE_ENV}`);
    });
  } catch (error) {
    console.error(error);
  }
}

main();
