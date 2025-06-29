# Sum it up

## Summarize email message

This extension was based on the [Hello World Tutorial](https://developer.thunderbird.net/add-ons/hello-world-add-on).

The purpose of this extension is to take a long email message and summarize it in a pop up box using a locally running Large Language Model. This can be helpful when is doing some categorization/triaging of emails for later processing when all you need is just a quick glimpse to see what the email is about.

### Local LLM server is required

It requires a running [ramalama](https://ramalama.ai/) or [llama.cpp](https://github.com/ggerganov/llama.cpp) server on port 8080 that in can tap into to produce an actual message summary. Otherwise, it cannot do any summarization on its own, the add on basically just passes a message content to an LLM server API and displays the result.

#### Linux or macOS

The easiest way to have a local LLM server running is to use [ramalama](https://ramalama.ai/) (on Linux or macOS) as it takes care of setting up the llama.cpp server as well as of downloading an appropriate model.

To set up a ramalama server on port 8080, first follow these instructions to install it:
[ramalama installation](https://github.com/containers/ramalama?tab=readme-ov-file#install)

Then [run the server](https://github.com/containers/ramalama?tab=readme-ov-file#serve-rest-api-on-the-specified-ai-model) by executing: 

     ramalama serve llama3

or any other model of your choice, and you should have a local server running on localhost:8080

#### Windows

On Windows, you may need to build llama.cpp server by yourself but compared to the likes of ramalama, it will require more steps besides the build such as downloading and possibly quantizing a model (from Hugging Face). You can follow the instructions on [the project's site](https://github.com/ggml-org/llama.cpp?tab=readme-ov-file#quick-start).

There may be other options like [Ollama](https://ollama.com/) that I haven't tried yet. Once I've sucessfully tested that this plugin works with them, I'll update the instructions.
