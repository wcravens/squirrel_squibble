import _delay  from 'lodash.delay'
import gaussian from 'gaussian';

export const interKeyInterval = ( mu, v ) => {
  return () => Math.abs( Math.round( gaussian( mu, v**2 ).ppf( Math.random() ) ) );
}

export default ( mu = 100, sigma = 90 ) => {
  let T = 0;
  const iki = interKeyInterval( mu, sigma );
  return ({
    type: string => ({
      to: f => [...string].map( char => _delay( f, T += iki(), char ) )
    })
  });
}
