import React from 'react'
import './VersionInfo.css'

const VersionInfo = ({ config, type}) => {
  return (
    <div className={config.type}>
      <pre style={{"fontSize": "x-small"}} >
        {config.name}, {config.semver} Build: {config.build}, {config.pre_release ? config.pre_release : '' }
      </pre>
      <pre style={{"fontSize": "x-small"}}>
        Id: {config.id}
      </pre>
    </div>
  )
}
export default VersionInfo;
