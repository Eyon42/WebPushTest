type pushNotificationOptions = {
  serviceWorkerUrl?: string;
};

let _serviceWorkerUrl = "/service-worker.js";

export function registerServiceWorker({
  serviceWorkerUrl = "/service-worker.js",
}: pushNotificationOptions = {}) {
  if (typeof navigator !== "undefined" && "serviceWorker" in navigator) {
    // Register a service worker hosted at the root of the
    // site using the default scope.
    _serviceWorkerUrl = serviceWorkerUrl;
    navigator.serviceWorker.register(serviceWorkerUrl).then(
      async (registration) => {
        console.log("Service worker registration succeeded:", registration);
      },
      /*catch*/ (error) => {
        console.error(`Service worker registration failed: ${error}`);
      },
    );
    navigator.serviceWorker.ready.then(async (registration) => {
      await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
      });
      requestNotificationPermission(registration);
    });
  } else {
    console.error("Service workers are not supported.");
  }
}

export async function requestNotificationPermission(
  registration?: ServiceWorkerRegistration,
) {
  if (!registration) {
    registration =
      await navigator.serviceWorker.getRegistration(_serviceWorkerUrl);
  }
  if (Notification.permission === "granted") {
    registration?.active?.postMessage(JSON.stringify({ notifications: true }));
  } else {
    if (Notification.permission !== "denied") {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        console.log("Notification permission granted.");
        registration?.active?.postMessage(
          JSON.stringify({ notifications: true }),
        );
      } else {
        console.log("Unable to get permission to notify.");
        registration?.active?.postMessage(
          JSON.stringify({ notifications: false }),
        );
      }
    }
  }
}

export async function disableNotifications(
  registration?: ServiceWorkerRegistration,
) {
  if (!registration) {
    registration =
      await navigator.serviceWorker.getRegistration(_serviceWorkerUrl);
  }
  registration?.active?.postMessage(JSON.stringify({ notifications: false }));
}
