const ORGANIZATION = "FIAP-CCOABC-2026";
const REQUEST_REPOSITORY = "automacao-invite";

const form = document.getElementById("invite-form");
const usernameInput = document.getElementById("github-username");
const submitButton = document.getElementById("submit-button");
const message = document.getElementById("message");

function showMessage(text, type) {
    message.textContent = text;

    message.className = `message ${type}`;
}

function isValidGitHubUsername(username) {
    return /^[a-zA-Z0-9-]{1,39}$/.test(username);
}

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const username = usernameInput.value.trim();

    if (!isValidGitHubUsername(username)) {
        showMessage(
            "Informe um GitHub username válido.",
            "error"
        );

        return;
    }

    const title = encodeURIComponent(
        `[INVITE] ${username}`
    );

    const body = encodeURIComponent(
        [
            "## Solicitação de acesso",
            "",
            `GitHub username: \`${username}\``,
            "",
            "Esta Issue foi criada automaticamente através do formulário de convite.",
            "",
            "<!-- invite-request -->"
        ].join("\n")
    );

    const url =
        `https://github.com/${ORGANIZATION}/${REQUEST_REPOSITORY}/issues/new` +
        `?title=${title}` +
        `&body=${body}` +
        `&labels=invite-request`;

    showMessage(
        "Abrindo o GitHub para confirmar sua solicitação...",
        "success"
    );

    window.location.href = url;
});