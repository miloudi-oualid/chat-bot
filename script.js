const header = document.querySelector(".chatbot header");
const chatbotIcon = document.querySelector(".chatbot-icon");
const sendBtn = document.querySelector(".chat-input span");
const chatInput = document.querySelector(".chat-input textarea");
const inputInitHeight = chatInput.scrollHeight;
const conversation = document.querySelector(".conversation");
let userMessage = null; 
const suggestions = document.querySelectorAll(".suggestion li")
let suggest=null;

const responses = {
    '1': 'Conscients que le développement de la formation professionnelle est tributaire d’une offre de formation co-construite et innovante, en parfaite convergence avec les besoins évolutifs des professionnels et des régions, nos Cités des Métiers et des Compétences instaurent un nouveau modèle de formation professionnelle adapté aux enjeux de demain et aux défis des individus, répondant aux besoins du marché du travail régional et contribuant ainsi au développement du Maroc par les territoires.',
    '2': 'Rendez vous sur le site https://inscription.cmc.ac.ma/',
    '3': 'Santé / BTP / Intelligence artificielle / Développement informatique'
};



const createChat = (message, className) => {

    // Create a chat <li> element with passed message and className
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", `${className}`);
    let chatContent = className === "user" ? `<p></p>` : `<img src="images/LogoCmc.png" /><p"></p>`;
    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p").textContent = message;

    return chatLi; // return chat <li> element
}

const handleChat = () => {

    if(!userMessage)userMessage = chatInput.value.trim();

    // Clear the input textarea and set its height to default
    chatInput.value = "";
    chatInput.style.height = `${inputInitHeight}px`;

    // Append the user's message to the conversation
    conversation.appendChild(createChat(userMessage, "user"));
    conversation.scrollTo(0, conversation.scrollHeight);
    const incomingChatLi = createChat("...", "bot");
    incomingChatLi.querySelector("p").classList.add("loading");

    conversation.appendChild(incomingChatLi);
    conversation.scrollTo(0, conversation.scrollHeight);

    setTimeout(() => {
        createResponse(incomingChatLi);
        incomingChatLi.querySelector("p").classList.remove("loading");

    }, 1600);
    userMessage = null; 
}



const createResponse = (chatElement) => {
    let messageElement = chatElement.querySelector("p");
    if (suggest) {
        messageElement.textContent=responses[suggest];
        suggest=null;

    }
    else{
        messageElement.classList.add("error");
        messageElement.textContent = "Problème d'API";
    }
        
        conversation.scrollTo(0, conversation.scrollHeight);
}
sendBtn.addEventListener("click", handleChat);


suggestions.forEach(function(suggestion) {

suggestion.addEventListener('click', function() {
    userMessage=suggestion.textContent;
  suggest =suggestion.getAttribute('value');
    handleChat();



});

});


header.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
chatbotIcon.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));
