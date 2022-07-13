import React from 'react'

const ClientInfo = ({client}) => {
  return (
    <div>
      <pre style={{"fontSize": "x-small"}}>
        {client.name} {client.semver} Build: {client.build}, {client.pre_release ? client.pre_release : '' }
      </pre>
      <pre style={{"fontSize": "x-small"}}>
        Id: {client.id}
      </pre>
    </div>
  )
}

export default ClientInfo;
