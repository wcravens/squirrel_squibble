import PACKAGE from '../package.json'
document.querySelector('#container').innerHTML = `<pre>${PACKAGE.name} ${VERSION}\nLast Commit: ${COMMITHASH} ${LASTCOMMITDATETIME}</pre>`
