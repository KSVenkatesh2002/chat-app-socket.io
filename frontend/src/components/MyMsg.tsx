
const MyMsg = ({ msg }: { msg: string }) => {
  return (
    <div className="chat chat-end">
      <div className="chat-bubble">{msg}</div>
    </div>
  )
}

export default MyMsg