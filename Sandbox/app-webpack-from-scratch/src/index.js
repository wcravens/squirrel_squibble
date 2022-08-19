import PACKAGE from '../package.json' assert { type: 'json' };
import * as bootstrapjs from 'bootstrap'
import bootstrap from 'bootstrap/dist/css/bootstrap.min.css'

export const THEME_SHEETS = {
  bootstrap   : import( 'bootstrap/dist/css/bootstrap.min.css' ),
  zephyr      : import( 'bootswatch/dist/zephyr/bootstrap.min.css' ),
  flatly      : import( 'bootswatch/dist/flatly/bootstrap.min.css' ),
  cosmo       : import( 'bootswatch/dist/cosmo/bootstrap.min.css' ),
  sketchy     : import( 'bootswatch/dist/sketchy/bootstrap.min.css' )
}


const populateFooterWithAppNameAndVersion = () => document.querySelector('#mainFooter').innerHTML =
  `<pre>${PACKAGE.name} ${VERSION}\nLast Commit: ${COMMITHASH} ${LASTCOMMITDATETIME}</pre>`

const updateThemeStyleElement = css  => document.head.insertAdjacentHTML( 'beforeend', `<style>${css}</style>` )

export const changeTheme = theme => THEME_SHEETS[theme].then( updateThemeStyleElement )

//changeTheme( 'zephyr' )
