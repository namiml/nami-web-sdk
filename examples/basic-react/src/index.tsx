import { createRoot } from 'react-dom/client';
import React from 'react';
import Paywall from './Paywall';

const root = document.getElementById('root')!;

createRoot(root).render(
<React.StrictMode>
    <Paywall />
</React.StrictMode>
);
