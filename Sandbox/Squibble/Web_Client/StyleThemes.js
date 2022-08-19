import Bootstrap   from 'bootstrap/dist/css/bootstrap.css?inline';
import Zephyr      from 'bootswatch/dist/zephyr/bootstrap.min.css?inline';
import Cosmo       from 'bootswatch/dist/cosmo/bootstrap.min.css?inline';
import Sketchy     from 'bootswatch/dist/sketchy/bootstrap.min.css?inline';
import Flatly      from 'bootswatch/dist/flatly/bootstrap.min.css?inline';

const Themes = { Bootstrap, Zephyr, Cosmo, Sketchy, Flatly };

export const listAvailableThemes = () => Object.keys( Themes );

export const insertStyleElementWithTheme = ( name ) =>
  document.head.insertAdjacentHTML( 'beforeend', `<style>${ Themes[ name ] }</style>` );

export const removeAllStyleElementsFromHead = () => document.head.querySelectorAll( 'style' ).forEach( _ => _.remove() );

export const switchTheme = ( name ) => {
  console.log( "Switching theme to " + name );
  removeAllStyleElementsFromHead();
  insertStyleElementWithTheme( name );
};
