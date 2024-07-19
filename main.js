const searchBox = document.querySelector('.searchBox');
const searchBtn = document.querySelector('.searchBtn');
const search_h = document.querySelector('.search_h');
const recipe_detail_content = document.querySelector('.recipe-detail-content');
const recipe_close_btn = document.querySelector('.recipe-close-btn');
const getrecipes = async (name) => {
    search_h.innerHTML = "Feching Recipes Please Wait ....";
    try{
    const url=`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`;
    const promise = await fetch(url);
    const data = await promise.json();

    const dataGrid = document.getElementById('dataGrid');
    dataGrid.innerHTML = "";
    recipe_detail_content.parentElement.style.display="none";
    data.meals.forEach(item => {
        search_h.innerHTML = "";

        console.log(item);
        const colDiv = document.createElement('div');
        colDiv.classList.add('col');

        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card', 'h-100', 'recipes');
        cardDiv.style.width = '18rem';

        const cardImg = document.createElement('img');
        cardImg.classList.add('card-img-top');
        cardImg.src = `${item.strMealThumb}`; // Placeholder image URL
        cardImg.alt = item.title;

        const cardBodyDiv = document.createElement('div');
        cardBodyDiv.classList.add('card-body', 'd-flex', 'flex-column', 'align-items-center', 'text-center');

        const cardTitle = document.createElement('h5');
        cardTitle.classList.add('card-title', 'text-center');
        cardTitle.textContent = `${item.strMeal}`;

        const cardText1 = document.createElement('p');
        cardText1.classList.add('card-text1', 'text-center');
        cardText1.textContent = `Enjoy exquisite ${item.strArea} dish`;

        const cardText2 = document.createElement('p');
        cardText2.classList.add('card-text2', 'text-center');
        cardText2.textContent = `Belongs to ${item.strCategory} category`;

        const cardButton = document.createElement('a');
        cardButton.classList.add('btn', 'btn-primary', 'mt-auto');
        cardButton.href = '#'; // Placeholder URL
        cardButton.textContent = 'View Recipe';

        cardBodyDiv.appendChild(cardTitle);
        cardBodyDiv.appendChild(cardText1);
        cardBodyDiv.appendChild(cardText2);
        cardBodyDiv.appendChild(cardButton);
        cardButton.addEventListener('click', () => {
            openrecipepopup(item);
        });
        cardDiv.appendChild(cardImg);
        cardDiv.appendChild(cardBodyDiv);
        colDiv.appendChild(cardDiv);

        dataGrid.appendChild(colDiv);


    });
    }
    catch(error){
        search_h.innerHTML=`<h2>Error in Feching Recipes....</h2>`;
        search_h.style.color="red";
    }
}



searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const searchInput = searchBox.value.trim();
    if(!searchInput){
        search_h.innerHTML=`<h2>Type the meal in the search box</h2>`
        search_h.style.color="red";
        return;
    }
    getrecipes(searchInput);
})

recipe_close_btn.addEventListener('click',()=>{
    recipe_detail_content.parentElement.style.display="none";
})

const fetchIngredient = (item) => {
    let ingredentList = "";
    for (let i = 1; i <= 20; i++) {
        const ingredent = item[`strIngredient${i}`];
        if (ingredent) {
            const measure = item[`strMeasure${i}`];
            ingredentList += `<li>${measure} ${ingredent}</li>`;
        }
        else {
            break;
        }
    }
    return ingredentList;
}
const openrecipepopup = (item) => {

    let videoButton = '';
    if (item.strYoutube) {
        videoButton = `
            <div class="d-flex justify-content-center">
                <button type="button" class="btn btn-danger">
                    <a href="${item.strYoutube}" target="_blank" style="color: white; text-decoration: none;">Watch Video</a>
                </button>
            </div>
        `;
    }
    recipe_detail_content.innerHTML =
        `<h2 class="recipe_name">${item.strMeal}</h2>
    <h3>Ingredents:</h3>
    <ul class="ingredent_list">${fetchIngredient(item)}</ul>
    <div>
    <h3>Instructions:</h3>
    <p class="recipe_instruction">${item.strInstructions}</p>
    ${videoButton}
    </div>
 

    `

    recipe_detail_content.parentElement.style.display = "block"

        ;

}

