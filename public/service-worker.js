self.addEventListener("message", function (event) {
  const data = JSON.parse(event.data);
  console.log("SW Received Message:");
  console.log(data);

  if (data.notification) {
    self.notificationsEnabled = data.notifications;
  }
});

self.addEventListener("push", function (event) {
  console.log("Received a push message", event);
  self.registration.showNotification("Hello, from the backend");
});
