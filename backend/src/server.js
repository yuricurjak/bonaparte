import setupApp from './App';
import 'dotenv/config';

const port = process.env.PORT;

(async () => {
  try {
    const app = await setupApp();
    const server = app.listen(port, '0.0.0.0', () => {
      console.info(`Server running on port ${port}`);
    });

    const exitSignals = ["SIGINT", "SIGTERM", "SIGQUIT"];
    exitSignals.map(sig =>
      process.on(sig, () =>
        server.close(err => {
          if (err) {
            console.error(err);
            process.exit(1);
          }
          app.database.connection.close(() => {
            console.info("Database connection closed!");
            process.exit(0);
          });
        })
      )
    );
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
