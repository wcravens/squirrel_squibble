import React from 'react'

const VersionInfo = ( config ) => {
  return (
    <div>
      <pre style={{"fontSize": "x-small"}}>
        {config.name}, {config.semver} Build: {config.build}, {config.pre_release ? config.pre_release : '' }
      </pre>
      <pre style={{"fontSize": "x-small"}}>
        Id: {config.id}
      </pre>
    </div>
  )
}

export default VersionInfo;
