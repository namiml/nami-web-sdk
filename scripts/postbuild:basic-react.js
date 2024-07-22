import fs from 'fs-extra';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Define the paths
const examplePath = path.join(__dirname, '..', 'examples', 'basic-react');
const tempBuildPath = path.join(__dirname, '..', 'temp-build');

try {
    // Ensure the temp build directory is clean
    fs.emptyDirSync(tempBuildPath);
    fs.emptyDirSync(path.join(tempBuildPath, 'dist'));
    // Copy files to temp build directory
    fs.copySync(path.join(examplePath, 'index.html'), path.join(tempBuildPath, 'index.html'));
    fs.copySync(path.join(examplePath, 'dist', 'bundle.js'), path.join(tempBuildPath, 'dist', 'bundle.js'));
    console.log(`Copied required files from ${examplePath} to ${tempBuildPath}`);
} catch (error) {
    console.error('Error during post build process:', error);
    process.exit(1);
}
