
const OthersMsg = ({ msg, isGroup, fromName }:{msg:string, isGroup:boolean, fromName: string}) => {
  return (
  <>
    <div className="chat chat-start">
      {isGroup && <div className="chat-header">
        {fromName}
      </div>}
      
      <div className="chat-bubble">{msg}</div>
    </div>
  </>
  )
}

export default OthersMsg