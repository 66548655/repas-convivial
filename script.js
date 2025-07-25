function ajouterReste() {
  const input = document.getElementById("resteInput");
  const texte = input.value.trim();
  if (texte !== "") {
    const ul = document.getElementById("restes");
    const li = document.createElement("li");
    li.innerHTML = `<input type="checkbox"> ${texte}`;
    ul.appendChild(li);
    input.value = "";
  }
}
