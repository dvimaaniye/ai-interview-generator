# Server - AI Interview Generator

## Prequisites
- `node`
- `npm`

## Development Setup
Step 0: Ensure you are in the right directory, if you cloned this repo, before following the steps below
```bash
cd server
```

Step 1: Install dependencies
```bash
npm i
```

Step 2: Create a `.env` file and copy the contents of `.env.example`. Make sure to use the real values in `.env` and never put them in `.env.example`.

Step 3: Start the development server
```bash
npm dev
```

This server should be running on `http://localhost:3000` or whatever `PORT` you chose in the `.env`

If you have the client running, then try submitting the form!

**IMPORTANT NOTE: This server only allows a single origin for browser CORS policy which is defined by the `CLIENT_URL` env variable**
