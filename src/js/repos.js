
const urlParams = new URLSearchParams(window.location.search)
const userFname = urlParams.get("user");

async function repository(userFname) {repo(await fetch(`https://api.github.com/repos/${userFname}`).then(resp => resp.json()))}

function repo({ owner: { avatar_url, login }, name, description, stargazers_count, forks, html_url, language }) {
  description = description === null ? "Descrição não encontrada" : description
  document.getElementById("img").setAttribute("src", avatar_url)
  document.getElementById("login").innerHTML = login
  document.getElementById("name").innerHTML = name
  document.getElementById("description").innerHTML = description
  document.getElementById("language").innerHTML = language
  document.getElementById("star").innerHTML = `Stars: ${stargazers_count} `
  document.getElementById("forks").innerHTML = `Forks: ${forks}`
  document.getElementById("github").setAttribute("href", html_url)
}
repository(userFname)

document.getElementById('go-back').addEventListener('click', (evt) => {
  evt.preventDefault()
  history.back();
});