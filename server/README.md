# Server - AI Interview Generator

## Prequisites
- `node`
- `pnpm`

## Development Setup
Step 0: Ensure you are in the right directory, if you cloned this repo, before following the steps below
```bash
cd server
```

Step 1: Install dependencies
```bash
pnpm i
```

Step 2: Get the Gemini API key from [Google AI Studio](https://aistudio.google.com/)

Step 3: Create a file (here `ai-api-key`, name it anything you want) that can be sourced to your shell (e.g., bash, zsh, etc)
```bash
touch ai-api-key.sh
chmod 700 ai-api-key.sh
```
Edit the contents of `ai-api-key.sh` to be the same as `ai-api-key.sh.example` and put your actual api key in place of the placeholder
```bash
source ai-api-key.sh
```
*NOTE: Only the current shell instance will get the variables defined in `ai-api-key.sh`, which are required before starting the dev server. If you want them to persist throughout all shell sessions put them into something like `~/.bashrc` or `~/.zshrc`. Ensure that you restart your shell or source the file.*

Step 4: Create a `.env` file and copy the contents of `.env.example`. Make sure to use the real values in `.env` and never put them in `.env.example`.

Step 5: Start the development server
```bash
pnpm dev
```

This server should be running on `http://localhost:3000` or whatever `PORT` you chose in the `.env`

If you have the client running, then try submitting the form!

**IMPORTANT NOTE: This server only allows a single origin for browser CORS policy which is defined by the `CLIENT_URL` env variable**
