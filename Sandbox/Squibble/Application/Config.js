import PACKAGE  from './package.json';
import { nanoid } from 'nanoid';
// Note: package.json is supplemented via rollup git-info plugin.

export default ({
  Application: {
    name: PACKAGE.name,
    version: PACKAGE.version,
    build_id: nanoid()
  }
});
