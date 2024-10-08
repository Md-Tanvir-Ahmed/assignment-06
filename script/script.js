const loadCategories = () => {
    fetch('https://openapi.programming-hero.com/api/peddy/categories')
    .then(res => res.json())
    .then(data => displayCategories(data.categories))
    .catch(error => console.log(error))
};

const loadCards = () => {
    fetch('https://openapi.programming-hero.com/api/peddy/pets')
    .then(res => res.json())
    .then(data => displayCards(data.pets))
    .catch(error => console.log(error))
};





const loadCategoryCard = (id) => {
    
    fetch(`https://openapi.programming-hero.com/api/peddy/category/${id}`)
    .then(res => res.json())
    .then(data => {

        removeActiveClass();

        const activeBtn = document.getElementById(`btn-${id}`);
        activeBtn.classList.add("active");

        
        
        displayCards(data.data);
    })
    .catch(error => console.log(error))

};


const removeActiveClass = () => {
    const buttons = document.getElementsByClassName("category-button");
    for(let btn of buttons){
        btn.classList.remove("active");
    };

};

const loadDetails = async (petId) => {
    const uri = `https://openapi.programming-hero.com/api/peddy/pet/${petId}`;
    const res = await fetch(uri);
    const data = await res.json();
    displayDetails(data.petData);

};

const displayDetails = (info) => {
    console.log(info);
    const detailContainer = document.getElementById('modal-content');



    document.getElementById('customModal').showModal();
    detailContainer.innerHTML = 
    `
    <div class=" ">
  <figure class="px-10 py-10">
    <img
      src="${info.image}"
      
      class="rounded-xl" />
  </figure>
  <div class=" items-center text-center">
    <h2 class="card-title py-2">Name: ${info.pet_name}</h2>
    <div class="grid grid-cols-2">
    <p class="flex gap-1 text-gray-400"><img class="w-4 h-4 color-gray-400" src="https://img.icons8.com/?size=100&id=GhW7E6TRTWHw&format=png&color=000000" alt="">Breed: <span>${info.breed}</span></p>
                          <p class="flex gap-1 text-md text-gray-400"><i class="fa-solid fa-calendar"></i> Birth: <span>${info.date_of_birth}</span></p>
    </div>
    <div class="grid grid-cols-2">
    <p class="flex gap-1 text-md text-gray-400"><i class="fa-solid fa-mercury"></i> Gender: <span>${info.gender}</span></p>
                          <p class="flex gap-1 text-md text-gray-400"><i class="fa-solid fa-mercury"></i> vaccinated_status: <span>${info.vaccinated_status}</span></p>
    </div>
    
                          
                          <p class="flex gap-1 text-md text-gray-400"><i class="fa-solid fa-dollar-sign"></i> Price: <span>${info.price}</span> $</p>
                          <div class="divider"></div>

    <div>
    <h3 class="font-bold">Detail Information:</h3>
    <p>${info.pet_details}</p>
    </div>
  </div>
</div>
    `;

}

const adoptedPet = (name) =>{
    console.log(name);
    const detailContainer2 = document.getElementById('model-content-2');
    document.getElementById("my_modal_2").showModal();
    
    

    detailContainer2.innerHTML = 
    `
    <div class="text-center ">
    <img src="https://img.icons8.com/?size=100&id=15975&format=png&color=000000"/>
    <h1 class="font-bold text-2xl">Congratulations! You have adopted ${name}</h1>
    </div>
    `;
    
};






const displayCards = (cards) => {
    const cardContainer = document.getElementById("pet-card-container");

    cardContainer.innerHTML= ``;

    if(cards.length == 0){
        cardContainer.classList.remove('grid');
        cardContainer.innerHTML = 
        `
        <div class="min-h-[300px]  flex flex-col gap-5 justify-center items-center">
        <img src="./images/error.webp"/>
        <h2 class="text-center text-2xl font-bold">No Information Available</h2>
        <p class="text-center">Birds are not available right now. But soon we will come up with new bird.</p>
         </div>
        `;
        return;
    }else{
        cardContainer.classList.add('grid');

    };

    cards.forEach(card => {
        // console.log(card)
        // console.log(card.pet_name)
        const petCard = document.createElement("div");
        
        petCard.classList = "card card-compact bg-base-100  shadow-xl snap-start";
    
        petCard.innerHTML = 
        `
           <div class="card card-compact bg-base-100 ">
                        <figure class="w-30 h-25 md:w-70 md:h-65 lg:w-50 lg:h-45" id="pet-photo">
                        <img class="w-full h-full" src="${card.image}" />
                          
                        </figure>
                        <div class="card-body">
                          <h2 id="pet-name" class="card-title">${card.pet_name}</h2>
                          <p class="flex gap-1 text-gray-400"><img class="w-4 h-4 color-gray-400" src="https://img.icons8.com/?size=100&id=GhW7E6TRTWHw&format=png&color=000000" alt="">Breed: <span>${card.breed}</span></p>
                          <p class="flex gap-1 text-md text-gray-400"><i class="fa-solid fa-calendar"></i> Birth: <span>${card.date_of_birth}</span></p>
                          <p class="flex gap-1 text-md text-gray-400"><i class="fa-solid fa-mercury"></i> Gender: <span>${card.gender}</span></p>
                          <p class="fles gap-1 text-md text-gray-400"><i class="fa-solid fa-dollar-sign"></i> Price: <span>${card.price}</span> $</p>
                          <div class="card-actions justify-between">
                            <button onclick="liked('${card.image}')" class="btn btn-xs sm:btn-sm md:btn-md lg:btn-md"><img class="w-4 h-4 lg:w-6 lg:h-6" src="https://img.icons8.com/?size=100&id=2744&format=png&color=000000" alt=""></button>
                            <button id="adopted-button" onclick="adoptedPet('${card.pet_name}')" class="btn btn-xs sm:btn-sm md:btn-md lg:btn-md text-[#0E7A81] text-md lg:text-lg ">Adopt</button>
                            <button onclick="loadDetails('${card.petId}')" class="btn btn-xs sm:btn-sm md:btn-md lg:btn-md text-[#0E7A81] text-md lg:text-lg">Details</button>
                            

                           
        `;

        
        cardContainer.append(petCard);
        
    })

};

const liked = (image) => {
    console.log(image)
    const petLikedImage = document.getElementById('pet-liked-image') ;
    const likedImage = document.createElement('div');
    likedImage.innerHTML=
    `
    <div class="h-40">
    <img class="w-30 h-30 rounded p-2" src="${image}"/>
    </div>
    `;

    petLikedImage.appendChild(likedImage);
}

const displayCategories = (categories) => {
    const categoryContainer = document.getElementById("categories");


    categories.forEach((item) => {
       
        const buttonContainer = document.createElement('div');
        
        buttonContainer.innerHTML=`
        <button id="btn-${item.category}" onclick="loadCategoryCard('${item.category}')" class="btn  btn-xs sm:btn-sm md:btn-md lg:btn-lg text-md md:text-xl lg:text-2xl text-black font-bold bg-[#ffff] hover:bg-[#0E7A81] hover:text-white category-button">
        <img class="w-4 h-4 md:w-6 md:h-6 lg:w-7 lg:h-7" src="${item.category_icon}"></img>${item.category}
        </button>
        `;

       
        
        categoryContainer.append(buttonContainer);
        
    })
   
};




loadCategories();
loadCards();

