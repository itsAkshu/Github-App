const URL = "https://api.github.com/users/";
const main = document.querySelector("#main");
const btn = document.querySelector("#btn");

const getUser = async(username) =>{
    const response = await fetch(URL + username);
    console.log(response);
    const data = await response.json();
    console.log(data);

    const card = `
            <div class="box">
                <div class="img-box">
                    <img id="img" src="${data.avatar_url}">
                </div>
                <div class="info">
                    <h2>${data.name}</h2>
                    <p>${data.bio}</p>
                    <ul>
                        <li><a href="#">${data.followers} followers</a></li>
                        <li><a href="#">${data.following} followings</a></li>
                        <li><a href="#">${data.public_repos} repos</a></li>
                    </ul>
                    <div id="repos">
                       
                    </div>
                </div>
            </div>
    `
    main.innerHTML = card;
    getRepos(username);

}
// getUser("taylorotwell");

const getRepos = async (username) =>{
    const repos = document.querySelector("#repos");
    let response = await fetch(URL+username+"/repos");
    let data = await response.json();
    //console.log(data);
    data.forEach((item)=>{
        //console.log(item);
        const ele = document.createElement("a");
        ele.classList.add("repo");
        ele.href = item.html_url;
        ele.innerText = item.name;
        ele.target = "_blank";
        repos.appendChild(ele);
    })
}

const formSubmit = () =>{
    const searchBox = document.querySelector("#input");
    if(searchBox != ""){
        getUser(searchBox.value);
        searchBox.value = "";
    }
}
btn.addEventListener("click",formSubmit);