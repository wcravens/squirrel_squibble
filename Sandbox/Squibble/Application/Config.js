import PACKAGE  from './package.json';
// Note: package.json is supplemented via rollup git-info plugin.

export default ({
  Application: {
    Name: PACKAGE.name,
    Version: PACKAGE.version
  }
});
