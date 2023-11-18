const webpush = require("web-push");
require("dotenv").config();

webpush.setVapidDetails(
  "mailto:eyon@eyon.dev",
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY,
);

// This is the same output of calling JSON.stringify on a PushSubscription
// For this example, copy it from the console.log in the browser and paste it here
const pushSubscription = {
  endpoint: "https://updates.push.services.mozilla.com/wpush/v2/************",
  expirationTime: null,
  keys: {
    auth: "************",
    p256dh: "************",
  },
};

async function main() {
  const result = await webpush.sendNotification(
    pushSubscription,
    "Testing push!",
  );
  console.log(result);
}

main();
