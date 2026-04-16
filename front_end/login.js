document.getElementById("loginForm").addEventListener("submit", async function (e) {
  e.preventDefault(); // stop normal form submit

  const user_name = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  try {
    const res = await fetch("https://blood-bank-8szc.onrender.com/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_name, password })
    });

    const data = await res.json();

    if (data.success) {
      // Store token if provided
      if (data.token) {
        localStorage.setItem('authToken', data.token);
      }
      window.location.href = "Dash_board.html"; // Fixed filename
    } else {
      document.getElementById("msg").innerText = data.message;
    }

  } catch (err) {
    console.error(err);
    document.getElementById("msg").innerText = "Server not responding";
  }
});
