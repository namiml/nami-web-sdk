import React, { useEffect, useRef } from "react";
import {
  Nami,
  NamiCampaignManager,
  NamiPaywallEvent,
  NamiPaywallManager,
  LaunchCampaignError,
  NamiProductDetails,
} from "@namiml/web-sdk";
import productDetails from "../../data/product-details.json";

const APP_PLATFORM_ID = 'YOUR_APP_PLATFORM_ID'; // Your App Platform ID

const Paywall: React.FC = () => {
  const paywallContainerRef = useRef<HTMLDivElement>(null);

  const renderPaywall = async () => {
    // Initialize and configure the Nami SDK
    await Nami.configure({
      appPlatformID: APP_PLATFORM_ID,
      logLevel: 'debug',
      namiLanguageCode: "en",
    });

    // Set product details for the paywall.
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
    const paywallComponent = NamiCampaignManager.launch(
      'YOUR_PLACEMENT_LABEL',
      undefined,
      undefined,
      resultHandler,
      actionHandler
    );

    // Add the paywall component to the DOM
    if (paywallContainerRef.current && paywallComponent) {
      paywallContainerRef.current.appendChild(paywallComponent);
    }
  };

  useEffect(() => {
    renderPaywall();
  }, []);

  return <div ref={paywallContainerRef}></div>;
};

export default Paywall;
