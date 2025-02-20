import { useState } from "react";
import '../chatbot/ChatBox.css'
const ChatBox = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [isShowed, setShowed] = useState(true);

    const sendMessage = async () => {
        if (!input.trim()) return;

        const newMessages = [...messages, { text: input, sender: "user" }];
        setMessages(newMessages);
        setInput("");

        try {
            const response = await fetch("http://localhost:5000/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: input }), // Solo enviamos el mensaje actual
            });

            if (!response.ok) throw new Error("Error en la solicitud al servidor");

            const data = await response.json();

            if (!data || !data.reply) {
                throw new Error("Respuesta vacía o malformada");
            }

            setMessages([...newMessages, { text: data.reply, sender: "bot" }]);
        } catch (error) {
            console.error("Error en el chat:", error);
            setMessages([...newMessages, { text: "Error al obtener respuesta.", sender: "bot" }]);
        }
    };


    const handleShowed = (event) => {
        setShowed(!isShowed)
        //console.log(isShowed)
    }

    return (
        <div>
            <button className="bnt-chat" onClick={handleShowed}>🤖</button>
            {isShowed ?
                <div className="chat-container">
                    <div className="chat-messages">
                        {messages.map((msg, index) => (
                            <div key={index} className={`message ${msg.sender}`}>
                                {msg.text}
                            </div>
                        ))}
                    </div>
                    <div className="chat-input">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Escribe un mensaje..."
                        />
                        <button onClick={sendMessage}>Enviar</button>
                    </div>
                </div>
                : <></>}
        </div>
    );
};

export default ChatBox;
