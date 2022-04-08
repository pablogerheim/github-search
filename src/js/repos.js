
const urlParams = new URLSearchParams(window.location.search)
const userFname = urlParams.get("user");

async function repository(userFname) {
  let reposDetail = await api2(userFname)
  repo(reposDetail)
}

async function api2(full_name) {
  reposDetail = await fetch(`https://api.github.com/repos/${full_name}`).then(resp => resp.json())
  return reposDetail
}

function repo({ owner: { avatar_url, login }, name, description, stargazers_count, forks, html_url, language }) {
  description = description === null ? "Descrição não encontrada" : description

  let reposInfo = document.createElement('div')
  reposInfo.classList.add("repo-details")
  let conteudo = `
      <div class="repo-owner">
        <img class="repo-owner-image" src="${avatar_url}">
        <h3 class="repo-owner-name">${login}</h3>
      </div>
      <div class="repo-info">
        <h2 class="repo-name">${name}</h2>
        <p class="repo-description">${description}</p>
        <div class="repo-other-infos">
          <p>${language}</p>
          <div class="repo-star-and-link">  
            <p><i class="star-icon fas fa-star"></i> Stars: ${stargazers_count}</p>
            <p><i class="fork-icon fas fa-code-branch"></i> Forks: ${forks}</p>
            <a href="${html_url}" target="_blank"><i class="git-open-icon fab fa-github-alt"></i>Abrir no GitHub</a>
          </div>
        </div>
      </div>`
  reposInfo.innerHTML = conteudo
  document.getElementById('mainrepo').appendChild(reposInfo)
}
repository(userFname)