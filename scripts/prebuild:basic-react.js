import fs from 'fs-extra';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

// Define app specific variables
const APP_PLATFORM_ID = process.env.APP_PLATFORM_ID;
const APP_PAYWALL_LABEL = process.env.APP_PAYWALL_LABEL;

// Define the paths
const examplePath = path.join(__dirname, '..', 'examples', 'basic-react');

try {
  // Modify Paywall.tsx for QA purposes
  const specificFilePath = path.join(examplePath, 'src', 'Paywall.tsx');
  let code = fs.readFileSync(specificFilePath, 'utf-8');
  code = code.replace('YOUR_APP_PLATFORM_ID', `${APP_PLATFORM_ID}`);
  code = code.replace('YOUR_PLACEMENT_LABEL', `${APP_PAYWALL_LABEL}`);
  code = code.replace('namiCommands: []', `namiCommands: ["useStagingAPI"]`);
  fs.writeFileSync(specificFilePath, code);
  
  console.log(`Injected APP_PLATFORM_ID and APP_PAYWALL_LABEL into ${specificFilePath}`);
} catch (error) {
  console.error('Error during build process:', error);
  process.exit(1);
}
