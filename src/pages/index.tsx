import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <div className="z-10 max-w-5xl w-full items-center justify-between gap-4 font-mono text-sm flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Push the button to get a notification
        </p>
        <button
          className="bg-slate-200 rounded-md p-4"
          onClick={async () => {
            const registration =
              await navigator.serviceWorker.getRegistration();
            registration?.showNotification("Hello, world!", {
              body: "This is a notification.",
            });
          }}
        >
          Notification
        </button>
        <button
          className="bg-slate-200 rounded-md p-4"
          onClick={async () => {
            const registration =
              await navigator.serviceWorker.getRegistration();
            const subscription = await registration?.pushManager?.subscribe({
              userVisibleOnly: true,
              applicationServerKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
            });
            console.log(JSON.stringify(subscription));
          }}
        >
          Activate Push
        </button>
      </div>
    </main>
  );
}
