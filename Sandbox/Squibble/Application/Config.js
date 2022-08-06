import { readFileSync } from 'fs';
import { execSync } from 'child_process';

const PACKAGE = JSON.parse( readFileSync( './package.json', { encoding: "utf-8" } ) );

export default ({
  Application: {
    name: PACKAGE.name,
    version: PACKAGE.version,
    build_id: execSync( 'git describe', { encoding: "utf-8" } ).trim()
  }
});

