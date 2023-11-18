# Proof of concept for background push notifications.

## Contents

- public/service-worker.js
- src/pages/index.tsx with a couple buttons
- src/pushNotifications.ts to handle connection of the service worker (called from _app.tsx)
- push.js to test quickly from node.

## The current workflow

- start the page with pnpm dev
- use web-push to generate VAPID keys and save them to .env
- click the Activate Push button (Firefox requires user action for push Service, You could set it to auto start on Chrome based browsers and add a popup in firefox's case)
- open the console and copy what gets printed
- paste it in the variable pushSubscription on push.js
- run node push.js
- enjoy your push notification


