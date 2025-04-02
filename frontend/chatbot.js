document.addEventListener('DOMContentLoaded', () => {
    const sendButton = document.getElementById('send-button');
    const userInput = document.getElementById('user-input');
    const messagesDiv = document.getElementById('messages');

    sendButton.addEventListener('click', () => {
        const userMessage = userInput.value;
        if (userMessage) {
            addMessage('You: ' + userMessage);
            userInput.value = '';
            // Simulate a response from the chatbot
            setTimeout(() => {
                addMessage('Chatbot: How can I assist you with your donation?');
            }, 1000);
        }
    });

    function addMessage(message) {
        const messageElement = document.createElement('div');
        messageElement.textContent = message;
        messagesDiv.appendChild(messageElement);
    }
});
