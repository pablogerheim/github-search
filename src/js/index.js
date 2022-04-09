let userDetail = ''

async function api(value) {

  let userObj = await fetch(`https://api.github.com/users/${value}`).then(resp => resp.json())
  let reposArry = await fetch(`https://api.github.com/users/${value}/repos?sort=stars`).then(resp => resp.json())

  return ({ userObj, reposArry })
}

function lineTable({ name, full_name, }) {

  return `
  <div class= 'table-conteiner'>
  <p class='table-cell-name' >${name}</p>
  <button class='table-cell-button' id ='123' value = ${full_name} ><a class='table-cell-a' href='repository.html?user=${full_name}'> Ver detalhes</a> </button>
  </div>`
}

function user({ avatar_url, twitter_username, followers, following, email, bio, login }, reposArry) {
  let name = twitter_username === null ? login : twitter_username
  email = email === null ? 'Email não encontrado' : email
  bio = bio === null ? 'Bio não encontrada' : bio

  print('', 'img', 'userid', 'id', 'imgid', 'user-image', 'src', avatar_url)
  print(name, 'h2', 'userid', 'id', 'nameid', 'user-name')
  print(followers, 'label', "followsid", 'id', 'followersid', 'user-followers')
  print(following, 'label', "followsid", 'id', 'followingsid', 'user-followings')
  print(email, 'p', 'infoid', 'id', 'emailid', 'user-email')
  print(bio, 'p', 'infoid', 'id', 'bioid', 'user-bio')

  let repos = reposArry.map((item) => lineTable(item)).join('')

  let norepos = `<div class="repos"><h2> ${name} não possui repositorios publicos </h2></div>`

  let content = reposArry.length === 0 ? norepos : repos

  print(content, "div", 'cellsid', 'id', 'cellid', "repos-cells")

  document.getElementById('keyremove').setAttribute('id', 'keyprint')
}

function print(conteudo, element, getid, id, value, classN, id2, value2) {
  let userInfo = document.createElement(element)
  userInfo.classList.add(classN)
  userInfo.setAttribute(id, value)
  userInfo.setAttribute(id2, value2)
  userInfo.innerHTML = conteudo
  document.getElementById(getid).appendChild(userInfo)


  if (document.getElementById('keyprint') != undefined) {
    document.getElementById('keyprint').setAttribute('id', 'keyremove')
  }
}

document.getElementById('name_of_user').addEventListener('change', async function (evt) {

  if (document.getElementsByClassName('user-image') != null && document.getElementById('keyprint') != null) {
    document.getElementById('imgid').remove()
    document.getElementById('nameid').remove()
    document.getElementById('followersid').remove()
    document.getElementById('followingsid').remove()
    document.getElementById('emailid').remove()
    document.getElementById('bioid').remove()
    document.getElementById('cellid').remove()
    document.getElementById('keyprint').setAttribute('id', 'keyremove')
  }
  if (evt.target.value === "" ) {document.getElementById('notfund') != undefined? document.getElementById('notfund').remove():'' } else {
    const { userObj, reposArry } = await api(evt.target.value)
    if (userObj.message == undefined && document.getElementById('notfund') != undefined) { document.getElementById('notfund').remove() }
    if (userObj.message != undefined) { print('Não Encontrado', 'div', 'mainuser', 'id', 'notfund') }
    else user(userObj, reposArry)
  }
})