// The user clicked our button, get the active tab in the current window using
// the tabs API.
let tabs = await messenger.tabs.query({ active: true, currentWindow: true });

// Get the message currently displayed in the active tab, using the
// messageDisplay API. Note: This needs the messagesRead permission.
// The returned message is a MessageHeader object with the most relevant
// information.
let message = await messenger.messageDisplay.getDisplayedMessage(tabs[0].id);

// Get the full message
let message_part = await messenger.messages.getFull(message.id);
let email_content = message_part.parts[0].parts[0].body
// console.log(message_part.parts[0].body)

// TODO put this somewhere in the plugin config
const API_URL = 'http://localhost:8080'

const chat = []

const instruction = `A chat between a curious human and an artificial intelligence assistant. The assistant gives helpful, detailed, and polite answers to the human's questions.`

function format_prompt(question) {
    return `${instruction}\n${
        chat.map(m =>`### Human: ${m.human}\n### Assistant: ${m.assistant}`).join("\n")
    }\n### Human: ${question}\n### Assistant:`
}

async function tokenize(content) {

    fetch(`${API_URL}/`, {mode: 'no-cors'})
        .then(response => {
            console.log('response.status: ', response.status);
            console.log(response);
        })
        .catch(err => {
            document.getElementById("summary").textContent = 'API not available';
            console.log(err);
            return []
        });

    const result = await fetch(`${API_URL}/tokenize`, {
        method: 'POST',
        body: JSON.stringify({ content })
    })
    if (!result.ok) {
        return []
    }
    return await result.json().tokens
}

const n_keep = await tokenize(instruction).length

const question = `Can you summarize the following email in just 50-100 words? Don't offer or say anything else, just provide the summary. This is the email: ` + email_content;

async function get_response(question) {
    const response = await fetch(`${API_URL}/completion`, {
        method: 'POST',
        body: JSON.stringify({
            prompt: format_prompt(question),
            temperature: 0.2,
            top_k: 40,
            top_p: 0.9,
            n_keep: n_keep,
            n_predict: 256,
            stop: ["\n### Human:"], // stop completion after generating this
        })
    })
    return (await response.json()).content;
}

get_response(question).then((result) => {
    let answer = result; // assign the result to a variable
    document.getElementById("summary").textContent = answer;
    // console.log(answer); // log the value
});

