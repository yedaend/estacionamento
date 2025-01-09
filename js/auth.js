const usuarios = {
    admin: { username: "admin", password: "1234", role: "ADMIN" },
    funcionario: { username: "funcionario", password: "abcd", role: "FUNCIONARIO" }
};

document.getElementById("loginForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const user = Object.values(usuarios).find(u => u.username === username && u.password === password);

    if (user) {
        window.location.href = user.role === "ADMIN" ? "admin.html" : "funcionario.html";
    } else {
        alert("Usuário ou senha inválidos.");
    }
});
