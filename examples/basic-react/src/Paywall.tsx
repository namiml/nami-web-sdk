import React, { useEffect, useRef } from 'react';
import { Nami, NamiCampaignManager } from '@namiml/web-sdk';

const APP_PLATFORM_ID = 'YOUR_APP_PLATFORM_ID'; // Your App Platform ID

const Paywall: React.FC = () => {
    const paywallContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const renderPaywall = async () => {
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
            if (paywallContainerRef.current) {
                paywallContainerRef.current.appendChild(paywallComponent);
            }
        };

        renderPaywall();
    }, []);

    return (
        <div ref={paywallContainerRef}></div>
    );
};

export default Paywall;
