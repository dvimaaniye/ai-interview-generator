import app from './server.js';

const PORT = process.env.PORT;

app.listen(PORT, (error) => {
	if (error) {
		console.error('Error while starting server', error);
	}
	console.log(`Server started at port ${PORT}`);
});
