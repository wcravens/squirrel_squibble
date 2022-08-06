import { produce, createDraft, finishDraft } from 'immer';
import { readFileSync } from "fs";
import { execSync } from "child_process";

const defaultConfig = () => {
  addConfig( { Package: JSON.parse( readFileSync( './package.json', { encoding: "utf-8" } ) ) } );

  addConfig({
    Application: {
      name:     Config().Package.name,
      version:  Config().Package.version,
      build_id: execSync( 'git describe', { encoding: "utf-8" } ).trim()
    }
  });

  addConfig({
    _id: '/Config/' + Config().Application.build_id,
    resource: '/Config',
  });
};

export const Config = () => _CONFIG;

export const addConfig = data => {
  _CONFIG = produce( _CONFIG, draft => draft = { ...draft, ...data } );
  return Config();
};

let _CONFIG = finishDraft( createDraft( {} ) );
defaultConfig();
