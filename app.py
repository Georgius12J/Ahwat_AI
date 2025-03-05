from flask import Flask, render_template, request, jsonify
import google.generativeai as genai
import time

# Set up the API key
genai.configure(api_key="AIzaSyAeDuja4TaH8cXo33qFxXwM51tPlNkFgmw")

app = Flask(__name__, static_folder="static")

# Initialize the chat history
chat_history = []

def chat_with_ahwat(prompt, chat_history):
    model = genai.GenerativeModel("gemini-1.5-flash")  # Lighter & faster model
    time.sleep(1)  # Adding a slight delay for realism
    context = "\n".join(chat_history[-5:])  # Maintain a short-term memory of last 5 exchanges
    response = model.generate_content(f"You are Ahwat, a humorous yet philosophical AI. Respond with wisdom and wit.\n{context}\nUser: {prompt}\nAhwat:")
    return response.text

@app.route("/")
def index():
    return render_template("index.html")


@app.route("/send", methods=["POST"])
def send_message():
    user_input = request.form["user_input"]
    global chat_history
    response = chat_with_ahwat(user_input, chat_history)
    
    # Add to chat history
    chat_history.append(f"{user_input}")
    chat_history.append(f"{response}")
    
    return jsonify({"response": response})

if __name__ == "__main__":
    app.run(debug=True)