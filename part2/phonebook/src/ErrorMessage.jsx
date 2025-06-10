function ErrorMessage({message}) {
    if(!message) return null;

    return (
        <div className="message-container error_message">
            <p>{message}</p>
        </div>
    );
}

export default ErrorMessage;