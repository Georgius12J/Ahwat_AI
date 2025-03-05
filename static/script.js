// Fungsi untuk menambahkan pesan ke dalam chatbox
function addMessageToChatbox(message, isUserMessage) {
    var messageElement = document.createElement('div');
    var messageText = document.createElement('p');
    messageText.textContent = message;

    if (isUserMessage) {
        messageElement.classList.add('user-message');  // Pesan user rata kanan
    } else {
        messageElement.classList.add('ahwat-message'); // Pesan Ahwat rata kiri
        
        // Create profile picture element
        var profilePic = document.createElement('img');
        profilePic.src = '/static/ahwat.png'; // Add path to the profile picture
        profilePic.classList.add('ahwat-profile-pic');
        
        messageElement.appendChild(profilePic);
    }

    messageElement.appendChild(messageText);
    chatbox.appendChild(messageElement);
    chatbox.scrollTop = chatbox.scrollHeight;  // Scroll otomatis ke bawah
}

// Fungsi untuk mengirim pesan
sendButton.addEventListener("click", function () {
    const userText = userInput.value.trim();

    if (userText === "") {
        return; // Jika input kosong, jangan kirim pesan
    }

    // Tampilkan pesan user di chatbox
    addMessageToChatbox(userText, true);
    userInput.value = "";  // Kosongkan input
-
    // Kirim pesan ke server dan terima respons dari Ahwat
    fetch("/send", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: "user_input=" + encodeURIComponent(userText),
    })
    .then(response => response.json())
    .then(data => {
        // Tampilkan respons dari Ahwat di chatbox
        addMessageToChatbox(data.response, false);
    })
    .catch(error => {
        console.error("Error:", error);
    });
});

// Fungsi untuk mengirim pesan dengan tombol Enter
userInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        sendButton.click();  // Panggil tombol kirim saat Enter ditekan
    }
});
