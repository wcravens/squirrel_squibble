// Utilities
const _objectify = ( _ ) => typeof( _ ) === 'string' ? JSON.stringify( _ ) : _
const _stringify = ( _ ) => JSON.stringify( _ )

// Identify
const Entities =
// Prepare
// Verify
// Return


// Store
const create = _ => {
  const _data = _objectify( _ )
  return _stringify( _data )
}
