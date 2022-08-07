import { produce, createDraft, finishDraft } from 'immer';
import PACKAGE from './package.json';
import { build_id } from './build_id.json';

export const defaultConfig = () => ({
  _id: '/Config/' + build_id,
  resource: '/Config',
  Package: PACKAGE,
  Application: {
    name: PACKAGE.name,
    version: PACKAGE.version,
    build_id: build_id
  }
});

export const Config = () => _CONFIG;

export const addConfig = data => {
  _CONFIG = produce( _CONFIG, draft => draft = { ...draft, ...data } );
  return Config();
};

let _CONFIG = finishDraft( createDraft( {} ) );
addConfig( defaultConfig() );
