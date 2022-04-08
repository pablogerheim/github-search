let userDetail = ""

async function api(value) {

  let userObj = await fetch(`https://api.github.com/users/${value}`).then(resp => resp.json())
  let reposArry = await fetch(`https://api.github.com/users/${value}/repos?sort=stars`).then(resp => resp.json())

  return ({ userObj, reposArry })
}

function linhaTabela(item) {

  return `
  <div class= 'table-conteiner'>
  <p class='table-cell-name' >${item.name}</p>
  <button class='table-cell-button' id ="123" value = ${item.full_name} ><a class="table-cell-a" href="repository.html?user=${item.full_name}"> Ver detalhes</a> </button>
  </div>`
}

function user({ avatar_url, twitter_username, followers, following, email, bio, login }, reposArry) {
  let name = twitter_username === null ? login : twitter_username
  email = email === null ? "Email não encontrado" : email
  bio = bio === null ? "Bio não encontrada" : bio

  let userInfo = document.createElement('div')
  userInfo.classList.add("conteudo")
  let conteudo = `<div class="user">
  <img class="user-image" src="${avatar_url}">
  <h2 class="user-name">${name}</h2>
  <div class="user-follows">
    <label class="user-followers">Followers: ${followers}</label>
    <label class="user-followings">Followings: ${following}</label>
  </div>
  <div class="user-info">
    <p class="user-email"><i class="envelope"></i>${email}</p>
    <p class="user-bio"><i class="user-icon far fa-user"></i>${bio}</p>
  </div>
  </div>
  <div class="repos">
  <div class="repos-title">
  <h1 class='title-cell' >Repositorio</h1>
  <h1 class='title-cell' >Link direto</h1>
  </div>
  <div class ="repos-cells">
  ${reposArry.map((item) => linhaTabela(item)).join('')}            
  </div>
  </div>`

  userInfo.innerHTML = conteudo
  document.getElementById('mainuser').appendChild(userInfo)
}

document.getElementById('name_of_user').addEventListener('change', async function (evt) {
  evt.preventDefault()

  console.log(document.getElementsByClassName('conteudo').length)

  if (document.getElementsByClassName('conteudo').length == 1) {
    document.getElementById('mainuser').removeChild(document.getElementById('mainuser').firstChild)
  }

  const { userObj, reposArry } = await api(evt.target.value)
  user(userObj, reposArry)
})

