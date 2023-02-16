async function execute(){
   let result1=await fetch("https://pets-v2.dev-apis.com/pets");
   let response1= await result1.json();
   console.log(response1)
   
   function displayPetCard(pets){
    // console.log(pets);
    let petcard= "";
    for(let i=0;i<pets.length;i++){
    
        petcard =petcard +getPetCard(pets[i]);  
       
    }
    document.getElementById('section1').innerHTML=petcard;
};


function getPetCard(pet) {
    return `
   
    
    <div class="card mt-3 "  style="width: 18rem; ">
        <img src="${pet.images[0]}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${pet.name}</h5>
            <p class="card-text">${pet.description}</p>
            <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
    </div>
   
    `;
}
displayPetCard(response1.pets)
 
//    console.log(response1)
let numberOfPage= Math.ceil(response1.numberOfResults/((response1.endIndex-response1.startIndex)+1))


    for( let i=0 ;i<numberOfPage ;i++){
        let result=await fetch(`https://pets-v2.dev-apis.com/pets?page=${i}`)
        let response= await result.json();
        let li=document.createElement("li");
        li.setAttribute("class","page-item");
        let button=document.createElement("button");
        button.setAttribute("class","page-link");
        button.innerHTML=i+1;
        li.append(button);

        let ul=document.getElementById("unorder");
        ul.append(li);
        // console.log(ul);
        button.addEventListener("click",function(){
            displayPetCard(response.pets)
        });

     }
}
execute();
