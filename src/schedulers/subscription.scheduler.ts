import cron from 'node-cron';

cron.schedule("0 0 * * *", async () => {
  // code will be here
});