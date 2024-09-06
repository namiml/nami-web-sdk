"use client";

import { useEffect, useRef } from "react";
import {
  Nami,
  NamiCampaignManager,
  NamiPaywallEvent,
  NamiPaywallLaunchContext,
  NamiPaywallManager,
  LaunchCampaignError,
  NamiProductDetails,
} from "@namiml/web-sdk";
import productDetails from "../../../data/product-details.json";

const APP_PLATFORM_ID = 'YOUR_APP_PLATFORM_ID'; // Your App Platform ID


export default function Paywall() {
  const paywallContainerRef = useRef<HTMLDivElement>(null);

  async function start() {
    // Initialize and configure the Nami SDK
    await Nami.configure({
      appPlatformID: APP_PLATFORM_ID,
      logLevel: "debug",
      namiLanguageCode: "en",
    });

    // Set product details for the paywall
    NamiPaywallManager.setProductDetails(
      productDetails.products as NamiProductDetails[]
    );

    const actionHandler = (event: NamiPaywallEvent) => {
      console.log("Launch action Handler accessed...", JSON.stringify(event));
    };

    const resultHandler = (success: boolean, error?: LaunchCampaignError) => {
      console.log("Launch result Handler accessed...", success, error);
    };

    // Create the paywall component
    const component = NamiCampaignManager.launch(
      "YOUR_PLACEMENT_LABEL",
      undefined,
      undefined,
      resultHandler,
      actionHandler
    );

    // Add the paywall component to the DOM
    if (paywallContainerRef.current && component) {
      paywallContainerRef.current.appendChild(component);
    }
  }

  useEffect(() => {
    start();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div ref={paywallContainerRef}></div>
    </main>
  );
}
