import Bootstrap   from 'bootstrap/dist/css/bootstrap.css?inline'
import Zephyr      from 'bootswatch/dist/zephyr/bootstrap.min.css?inline'
import Cosmo       from 'bootswatch/dist/cosmo/bootstrap.min.css?inline'
import Sketchy     from 'bootswatch/dist/sketchy/bootstrap.min.css?inline'
import Flatly      from 'bootswatch/dist/flatly/bootstrap.min.css?inline'

const Themes = { Bootstrap, Zephyr, Cosmo, Sketchy, Flatly }

export const listAvailableThemes = () => Object.keys( Themes )

export const switchTheme = ( name ) => {
  console.log( "Attempting to switch to " + name + " theme." )
  if( document.querySelector('style') ) document.querySelector('style').remove()
  document.head.insertAdjacentHTML( 'beforeend', `<style>${ Themes[ name ] }</style>` )
}

