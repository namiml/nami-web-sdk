import fs from 'fs-extra';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { execSync } from 'child_process';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


dotenv.config();

// Define app specific variables
const APP_PLATFORM_ID = process.env.APP_PLATFORM_ID;
const APP_PAYWALL_LABEL = process.env.APP_PAYWALL_LABEL;

// Define the paths
const examplePath = path.join(__dirname, '..', 'examples', 'basic-react');
const tempBuildPath = path.join(__dirname, '..', 'temp-build');

try {
  // Ensure the temp build directory is clean
  fs.emptyDirSync(tempBuildPath);

  // Run the initial build step for examples/basic-react
  execSync('yarn install && yarn build', {
    stdio: 'inherit',
    cwd: examplePath
  });
  console.log('Initial build of examples/basic-react completed successfully.');

  // Copy entire example directory to temp build directory
  fs.copySync(examplePath, tempBuildPath);
  console.log(`Copied all files from ${examplePath} to ${tempBuildPath}`);

  // Modify Paywall.tsx for QA purposes
  const specificFilePath = path.join(tempBuildPath, 'src', 'Paywall.tsx');
  let code = fs.readFileSync(specificFilePath, 'utf-8');
  code = code.replace('YOUR_APP_PLATFORM_ID', `${APP_PLATFORM_ID}`);
  code = code.replace('YOUR_PLACEMENT_LABEL', `${APP_PAYWALL_LABEL}`);
  code = code.replace('namiCommands: []', `namiCommands: ["useStagingAPI"]`);
  fs.writeFileSync(specificFilePath, code);
  console.log(`Injected APP_PLATFORM_ID and APP_PAYWAL_LABEL into ${specificFilePath}`);

  // Run webpack build
  const webpackConfigPath = path.join(tempBuildPath, 'webpack.prod.js');
  execSync(`webpack --config ${webpackConfigPath} --output-path ${path.join(tempBuildPath, 'dist')}`, {
    stdio: 'inherit',
    cwd: tempBuildPath
  });

  // List of files and directories to keep
  const keep = [
    path.join(tempBuildPath, 'index.html'),
    path.join(tempBuildPath, 'dist')
  ];
  
  // Function to delete a file or directory
  function deleteRecursive(filePath) {
    if (fs.lstatSync(filePath).isDirectory()) {
      fs.readdirSync(filePath).forEach((file) => {
        const curPath = path.join(filePath, file);
        deleteRecursive(curPath);
      });
      fs.rmdirSync(filePath);
    } else {
      fs.unlinkSync(filePath);
    }
  }
  
  // Get all files and directories in the build directory
  fs.readdirSync(tempBuildPath).forEach((file) => {
    const filePath = path.join(tempBuildPath, file);
    if (!keep.includes(filePath)) {
      deleteRecursive(filePath);
    }
  });
  console.log('Webpack build completed successfully.');

} catch (error) {
    console.error('Error during build process:', error);
    process.exit(1);
}
