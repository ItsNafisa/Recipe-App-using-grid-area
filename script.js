let tagList=document.getElementById('recipe-tag-list');
let recipeList=document.getElementById('recipe-list');
let searchField=document.getElementById('search-input');


function getRecipesTag() {
    tagList.innerHTML = `<li class="loader">Loading tags...</li>`;

    fetch('https://dummyjson.com/recipes/tags')
        .then(res => {
               if (!res.ok) {
     throw new Error(`Server error: ${res.status}`);
    }
    return res.json();
        }
    
    )
        .then((tags) => {
             tagList.innerHTML =" ";
            tags.forEach(element => {
                let li = document.createElement('li');
let a = document.createElement('a');
                li.setAttribute('data-tag', element);
                a.textContent = element;
                a.href = "#"; 
    a.setAttribute('data-tag', element); 

                li.append(a)
                tagList.append(li);
            });
        })
        .catch(err => {
            console.error("Error fetching tags:", err);
            tagList.innerHTML = `<li class="error-msg">⚠️ Failed to load tags. Please check your connection.</li>`;
        });
}

getRecipesTag()

//fetching recipes by tag name
tagList.addEventListener('click',function(e){
    console.log('hhhhhhhh')
 if (e.target.tagName === 'A' && e.target.hasAttribute('data-tag')){
     
     let selectedTag = e.target.getAttribute('data-tag');
     //start fetching recipes by tag name
      recipeList.innerHTML = `<li class="loader">Loading recipes...</li>`;

    fetch('https://dummyjson.com/recipes/tag/'+selectedTag)
        .then(res => {
               if (!res.ok) {
     throw new Error(`Server error: ${res.status}`);
    }
    return res.json();
        }
    
    )
        .then((data) => {
          
             recipeList.innerHTML =" ";
             let box='';
            data.recipes.forEach(element => {
                const totalTime = (element.prepTimeMinutes || 0) + (element.cookTimeMinutes || 0);
               box +=`
    <div class="recipe-card">
       <div class="card-image-wrapper loading-skeleton">
    <img src="${element.image}" 
         alt="${element.name}" 
         class="card-img" 
         loading="lazy" 
         onload="this.parentElement.classList.remove('loading-skeleton')" />
    <span class="cuisine-badge">${element.cuisine}</span>
</div>
        
        <div class="card-content">
            <div class="card-tags">
                ${element.tags.slice(0, 2).map(tag => `<span class="tag-pill">#${tag}</span>`).join('')}
            </div>

            <h3 class="card-title">${element.name}</h3>

            <div class="card-info-grid">
                <div class="info-item">
                    <span class="info-icon">⏱️</span>
                    <div>
                        <span class="info-label">Time</span>
                        <span class="info-val">${totalTime} minutes</span>
                    </div>
                </div>
                <div class="info-item">
                    <span class="info-icon">🔥</span>
                    <div>
                        <span class="info-label">Calories</span>
                        <span class="info-val">${element.caloriesPerServing} kcal</span>
                    </div>
                </div>
                <div class="info-item">
                    <span class="info-icon">📊</span>
                    <div>
                        <span class="info-label">Difficulty</span>
                        <span class="info-val">${element.difficulty}</span>
                    </div>
                </div>
            </div>

            <div class="card-footer">
                <div class="rating-box">
                    <span class="star">⭐ ${element.rating}</span>
                    <span class="reviews">(${element.reviewCount})</span>
                </div>
               <span class="meal-badge">🍽️ ${element.mealType[0] || 'Meal'}</span>
            </div>
        </div>
    </div>
    `
            
            });
             recipeList.innerHTML=box;
        })
        .catch(err => {
            console.error("Error fetching tags:", err);
            recipeList.innerHTML = `<li class="error-msg">⚠️ Failed to load tags. Please check your connection.</li>`;
        });
 }
})

//search
function searchRecipe(searchValue){
        fetch('https://dummyjson.com/recipes/search?q='+searchValue)
        .then(res => {
               if (!res.ok) {
     throw new Error(`Server error: ${res.status}`);
    }
    return res.json();
        })
        .then((data) => {
        
   recipeList.innerHTML = '';
            let box='';
          
          let recipes=data.recipes;
          if(data.total === 0){
        recipeList.innerHTML = `<li class="error-msg">⚠️ No recipes found.</li>`;     
          }else{
recipes.forEach(element => {
       const totalTime = (element.prepTimeMinutes || 0) + (element.cookTimeMinutes || 0);
               box += `
           <div class="recipe-card">
       <div class="card-image-wrapper loading-skeleton">
    <img src="${element.image}" 
         alt="${element.name}" 
         class="card-img" 
         loading="lazy" 
         onload="this.parentElement.classList.remove('loading-skeleton')" />
    <span class="cuisine-badge">${element.cuisine}</span>
</div>
        
        <div class="card-content">
            <div class="card-tags">
                ${element.tags.slice(0, 2).map(tag => `<span class="tag-pill">#${tag}</span>`).join('')}
            </div>

            <h3 class="card-title">${element.name}</h3>

            <div class="card-info-grid">
                <div class="info-item">
                    <span class="info-icon">⏱️</span>
                    <div>
                        <span class="info-label">Time</span>
                        <span class="info-val">${totalTime} minutes</span>
                    </div>
                </div>
                <div class="info-item">
                    <span class="info-icon">🔥</span>
                    <div>
                        <span class="info-label">Calories</span>
                        <span class="info-val">${element.caloriesPerServing} kcal</span>
                    </div>
                </div>
                <div class="info-item">
                    <span class="info-icon">📊</span>
                    <div>
                        <span class="info-label">Difficulty</span>
                        <span class="info-val">${element.difficulty}</span>
                    </div>
                </div>
            </div>

            <div class="card-footer">
                <div class="rating-box">
                    <span class="star">⭐ ${element.rating}</span>
                    <span class="reviews">(${element.reviewCount})</span>
                </div>
               <span class="meal-badge">🍽️ ${element.mealType[0] || 'Meal'}</span>
            </div>
        </div>
    </div> `
            });
             recipeList.innerHTML=box;
          }
            
           
        })
        .catch(err => {
             console.error("Error fetching recipes:", err);
             recipeList.innerHTML = `<li class="error-msg">⚠️ Failed to load recipes. Please check your connection.</li>`;
        }); 
}