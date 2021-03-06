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

async function getPost(id)
{
    console.log(id);
    var link = "http://localhost:3000"
    console.log(link+"/api/posts/"+id)
    try{
        var post = (await axios.get(link+"/api/posts/"+id));
        
        return post.data.postss;
    }
    catch(err)
    {
        console.log(err);
    }
     
}

async function bigBoy(id)
{
    
    var post=await getPost(id);

    var STR=`
        <div id="post_naslov">
            <h7 id="tema_post">${post.naslov}</h7>
            <div class="post">    
                <p id="post_tekst">
                    ${post.tekst} 
                </p>   
            </div>
            <img src="${post.slika}" class="img-fluid slika_post" /> 
        </div>
    `
    
    var t=true;
    var idKorisnika=localStorage.getItem("id");
    if(idKorisnika!==null)
    {
        for(var k=0;k<post.pokusali.length;k++)
        {
            if(post.pokusali[k]===idKorisnika)
            {
                t=false;
                break;
            }
        }
        if(t)
        {
            for(let i=0;i<post.brojPitanja;i++)
            {
                var x=post.pitanja[i].pitanje.split('/.!./');
                STR+=`
                <div class="container">
                    <div class="row kartica levo">
                        <div class="col-lg-6" class="post-kartica">
                            <div class="post">    
                                <h7 class="naslov">${x[0]}</h7>
                                <p id = "test${i}"></p>   
                            </div>
                            
                        </div>
                    <div class="col-lg-6 pt-4 pt-lg-0">
                        <form id="tekst_kartice">
                        <input type="radio" name="pitanja${i}" value = 1><span>${x[1]}</span><br>
                        <input type="radio" name="pitanja${i}" value = 2><span>${x[2]}</span><br>
                        <input type="radio" name="pitanja${i}" value = 3><span>${x[3]}</span>
                        </form>
                    </div>
                </div>
                `
            }
            STR+=`
                <button onclick = "proveriOdgovore('${id}')">ZAVRSI</button> 
            `;
        }
    }

    
    document.getElementById("forma_postovi").innerHTML=STR;
}

async function updatePoints(poeni)
{
    var link="http://localhost:3000";
    console.log(link+"/api/users/1/"+localStorage.getItem("id"));
    try{
        await axios.put(link+"/api/users/1/"+localStorage.getItem("id"),{poeni:poeni});
        console.log(1);
    }
    catch(err)
    {
        console.log(err);
    }
}

async function proveriOdgovore(id)
{
    var post=await getPost(id);
    console.log(post);
    var poeni = 0;
   
    await axios.put("http://localhost:3000/api/posts/"+id,{id:localStorage.getItem("id")});

    for(let i = 0; i<post.brojPitanja;i++)
    {
        var tacanOdgovor = document.querySelector('input[name='+ 'pitanja' + i + ']:checked').value;
        
        console.log(i+"\t"+tacanOdgovor+"=="+post.pitanja[i].tacanOdgovor);
        if(tacanOdgovor==post.pitanja[i].tacanOdgovor)
        {
            document.getElementById("test"+i).innerHTML="Tacno!";
            document.getElementById("test"+i).style.color="green";
            poeni+=10; 
        }
        else
        {
            document.getElementById("test"+i).innerHTML="Netacno!";
            document.getElementById("test"+i).style.color="red";
        }
    }
    updatePoints(poeni);
}