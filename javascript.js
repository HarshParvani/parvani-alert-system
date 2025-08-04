function createEvent() {
  const name = document.getElementById("eventName").value.trim();
  const description = document.getElementById("eventDescription").value.trim();
  const email = document.getElementById("userEmail").value.trim();
  const message = document.getElementById("message");

  if (!name || !description) {
    alert("Please enter both event name and description.");
    return;
  }

  fetch("https://crvoi71j61.execute-api.ap-south-1.amazonaws.com/ParvaniAlertLambda", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      event: name,
      description: description,
      email: email
    })
  })
    .then(res => res.json())
    .then(data => {
      message.textContent = "✅ Alert created and sent successfully!";
      document.getElementById("eventName").value = "";
      document.getElementById("eventDescription").value = "";
      document.getElementById("userEmail").value = "";
    })
    .catch(err => {
      message.textContent = "❌ Failed to send alert.";
      message.style.color = "red";
      console.error(err);
    });
}
