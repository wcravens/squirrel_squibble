import { produce, createDraft, finishDraft } from 'immer';

let _CONFIG = finishDraft( createDraft( {} ) );

export const Config = () => _CONFIG;

export const addConfig = data => {
  _CONFIG = produce( _CONFIG, draft => draft = { ...draft, ...data } );
  return Config();
};

