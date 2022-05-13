let username = ''
async function api(userName) {

    let userObj = await fetch(`https://api.github.com/users/${userName}`).then(resp => resp.json())
    let reposArry = await apiRepo(userName,"stars")

    return ({ userObj, reposArry })
}

async function apiRepo(userName, sort) {
    let reposArry = await fetch(`https://api.github.com/users/${userName}/repos?sort=${sort}`).then(resp => resp.json())
    return reposArry
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

    document.getElementById("img").setAttribute("src", avatar_url)
    document.getElementById("name").innerHTML = name
    document.getElementById("followers").innerHTML = `Followers: ${followers}`
    document.getElementById("followings").innerHTML = `Followings: ${following}`
    document.getElementById("email").innerHTML = email
    document.getElementById("bio").innerHTML = bio
    document.getElementById('cells').innerHTML = reposArry.map((item) => linhaTabela(item)).join('')
    document.getElementById("keyremove").setAttribute("id", "keyprint")
}

document.getElementById('name_of_user').addEventListener('change', async function(evt) {
    evt.preventDefault()
    username = evt.target.value

   document.getElementById('keyprint')? document.getElementById('keyprint').setAttribute('id', 'keyremove') : ""

    if (evt.target.value === "") { document.getElementById('notfund')? document.getElementById('notfund').remove() : '' } else {
        const { userObj, reposArry } = await api(evt.target.value)

      document.getElementById('notfund')? document.getElementById('notfund').remove():''

         if (userObj.message) {
            let notfund = document.createElement("div")
            notfund.setAttribute("id", "notfund")
            notfund.innerHTML = "Não encontrado"
            document.getElementById("mainuser").appendChild(notfund)
        } else user(userObj, reposArry)
    }
})

document.getElementById('select-sort').addEventListener('change', async function(evt) {
    evt.preventDefault()
    let reposArry = await apiRepo(username, evt.target.value)
    document.getElementById('cells').innerHTML = reposArry.map((item) => linhaTabela(item)).join('')
})