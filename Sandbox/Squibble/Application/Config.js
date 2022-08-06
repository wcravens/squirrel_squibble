import { produce, createDraft, finishDraft } from 'immer';
import { readFileSync } from "fs";
import { execSync } from "child_process";

export const defaultConfig = () => {
  const PACKAGE = JSON.parse( readFileSync( './package.json', { encoding: "utf-8" } ) );
  const buildId = execSync( 'git describe', { encoding: "utf-8" } ).trim();

  return {
    _id: '/Config/' + buildId,
    resource: '/Config',
    Package: PACKAGE,
    Application: {
      name: PACKAGE.name,
      version: PACKAGE.version,
      build_id: buildId
    }
  };
};

export const Config = () => _CONFIG;

export const addConfig = data => {
  _CONFIG = produce( _CONFIG, draft => draft = { ...draft, ...data } );
  return Config();
};

let _CONFIG = finishDraft( createDraft( {} ) );
addConfig( defaultConfig() );
