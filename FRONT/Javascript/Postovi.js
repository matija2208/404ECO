load();

async function getData()
{
    link="http://localhost:3000";
    try
    {
        var users=await axios.get(link + "/api/users");
        return users.data.users;
    }
    catch(err)
    {
        console.log(err);
        return null;
    }
}

function render(post, i)
{
    var str="";
    for(let j = 0; j < 347 && j<post.tekst.length ; j++)
    {
        str+=post.tekst[j];
    }
    str+='...';
    if(i%2==0)
    {
        var card = `
            <div class="row kartica levo" id = "${post._id}" onclick = "bigBoy(this.id)">
                <div class="col-lg-6" class="post-kartica">
                    <div class="post">    
                        <h7 class="naslov">${post.naslov}</h7>   
                    </div>
                    <img src="${post.slika}" class="img-fluid slika" style="max-width: 60%; margin-left: 15%;" /> 
                </div>
                <div class="col-lg-6 pt-4 pt-lg-0">
                    <p id="tekst_kartice">${str}</p>
                </div>
            </div>
        `;
        document.getElementById("forma_postovi").innerHTML+=card;
    }
    else
    {
        var card = `
            <div class="row kartica desno" id = "${post._id}" onclick = "bigBoy(this.id)">
                <div class="col-lg-6" class="post-kartica">
                    <div class="post">    
                        <h7 class="naslov">${post.naslov}</h7>   
                    </div>
                    <img src="${post.slika}" class="img-fluid slika" style="max-width: 60%; margin-left: 15%;" /> 
                </div>
                <div class="col-lg-6 pt-4 pt-lg-0">
                <p id="tekst_kartice">${str}</p>
                </div>
            </div>
        `;
        document.getElementById("forma_postovi").innerHTML+=card;
    }
}

async function load()
{
    var link = "http://localhost:3000";
    var all_posts=(await axios.get(link+"/api/posts")).data.postss;
    
    for(let i=0;i<all_posts.length;i++)
    {
        render(all_posts[i],i);
    }
    
}