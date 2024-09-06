const { Nami, NamiCampaignManager, NamiPaywallManager } = window.NamiWebSdk;

const APP_PLATFORM_ID = ''; // Your App Platform ID

(async function renderPaywall() {
  // Initialize and configure the Nami SDK
  await Nami.configure({
    appPlatformID: APP_PLATFORM_ID,
    logLevel: 'debug',
    namiLanguageCode: "en",
    namiCommands: ['useStagingAPI'],
  });

  // Set product details for the paywall.
  NamiPaywallManager.setProductDetails([]);

  const actionHandler = (event) => {
    console.log("Launch action Handler accessed...", JSON.stringify(event));
  };

  const resultHandler = (success, error) => {
    console.log("Launch result Handler accessed...", success, error);
  };

  const context = {
    productGroups: [],
    customAttributes: {},
    customObject: {},
  };

  // Create the paywall component
  const paywallComponent = NamiCampaignManager.launch(
    'YOUR_PLACEMENT_LABEL',
    'YOUR_PLACEMENT_VALUE',
    context,
    resultHandler,
    actionHandler
  );

  // Add the paywall component to the DOM
  document.getElementById('paywall-container').appendChild(paywallComponent);
})();
