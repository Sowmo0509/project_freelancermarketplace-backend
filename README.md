docker run -d --name redis -p 6379:6379 redis

Run queue jobs:
npx tsx src/modules/mail/mail.worker.ts
