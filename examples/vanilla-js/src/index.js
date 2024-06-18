const { Nami, NamiCampaignManager, NamiPaywallManager } = window.NamiWebSdk;

const APP_PLATFORM_ID = ''; // Your App Platform ID

(async function renderPaywall() {
    // Initialize and configure the Nami SDK
    await Nami.configure({
        appPlatformId: APP_PLATFORM_ID,
        logLevel: 'debug',
        languageCode: "en",
        namiCommands: [],
    });

    // Set product details for the paywall
    // NamiPaywallManager.setProductDetails([]);

    // Create the paywall component
    const paywallComponent = NamiCampaignManager.launch('YOUR_PLACEMENT_LABEL');
    
    // Add the paywall component to the DOM
    document.getElementById('paywall-container').appendChild(paywallComponent);
})();
