import { app } from "./app.js";

app()
	.then(async () => {
		console.log("Daily batch process completed successfully.");
	})
	.catch(async (e) => {
		console.error(e);
		process.exit(1);
	});
