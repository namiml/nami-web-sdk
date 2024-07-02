"use client";

import { useEffect, useRef } from "react";
import { Nami, NamiCampaignManager } from "@namiml/web-sdk";

const APP_PLATFORM_ID = ''; // Your App Platform ID


export default function Paywall() {
  const paywallContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function start() {
      Nami.configure({
        appPlatformId: APP_PLATFORM_ID,
        logLevel: "debug",
        languageCode: "en",
        namiCommands: [],
      }).then(() => {
        const component = NamiCampaignManager.launch('YOUR_PLACEMENT_LABEL');
        if (paywallContainerRef.current) {
          paywallContainerRef.current.appendChild(component);
        }
      }).catch((error) => {
        console.error("Error configuring Nami", error);
      });
    }

    start();
  }, []);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div ref={paywallContainerRef}></div>
    </main>
  );
}
