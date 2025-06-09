function Message({message}) {
    if(!message) return null;

    return (
        <div className="message-container">
            <p>{message}</p>
        </div>
    );
}

export default Message;