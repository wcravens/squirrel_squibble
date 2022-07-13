import React from 'react'

const ClientInfo = ({client}) => {
  return (
    <pre style={{"fontSize": "x-small"}}>
      {client.name} {client.semver} Build: {client.build}, {client.pre_release ? client.pre_release : '' }
    </pre>
  )
}

export default ClientInfo;
