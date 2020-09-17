//JS
const grid = document.getElementById('grid');
const gridItem = document.querySelector('.grid-item');

// Create Dino Constructor
class Dinos
{
  constructor(species,weight,height,diet,where,when,fact,image)
  {
    this.species=species;
    this.weight=weight;
    this.height=height;
    this.diet=diet;
    this.where=where;
    this.when=when;
    this.fact=fact;
    this.image=image;
  }
};
function fetchJSONData(){
   return fetch("dino.json")
   .then(function (response) {
   if (response.status !== 200) {
   throw new Error("Looks like there was a problem. Status Code: " + response.status);
   }
    return response.json();
   })
   .catch(function(err) {
   throw new Error(err);
   });
};

// Create Human Object
class Human
{
    constructor(species,weight,height,diet,img)
    {
      this.species=species;
      this.weight=weight;
      this.height=height;
      this.diet=diet;
      this.img=img;
    }
};
var humanData;

// Use IIFE to get human data from form
function getFormData()
{
  var name = document.getElementById('name').value;
  var feet = parseFloat(document.getElementById('feet').value);
  var inches = parseFloat(document.getElementById('inches').value);
  var height = (feet * 12) + inches;
  var weight = parseFloat(document.getElementById('weight').value);
  var diet = document.getElementById('diet').value;
  var image= "images/human.png";
  const humanData = new Human(name, weight, height, diet,image);
  return humanData;
}

function Compare()
{
    fetchJSONData().then(data => {
    const dinosArray = data.Dinos;
    generateTiles(dinosArray);
  });
}

// Create Dino Compare Method 1

        function compareWeight(dinosArray, humanData) {
          if(dinosArray.weight > humanData.weight)
          {
                      return `The ${dinosArray.species} weighs ${dinosArray.weight - humanData.weight} lbs more than ${humanData.species}!`;
          }
          else if (dinosArray.weight < humanData.weight)
          {
                      return `The ${dinosArray.species} weighs ${humanData.weight - dinosArray.weight} lbs less than ${humanData.species}!`;
          }

      }
// NOTE: Weight in JSON file is in lbs, height in inches.
// Create Dino Compare Method 2
      function compareHeight(dinosArray, humanData) {

          if(dinosArray.height > humanData.height)
          {
                      return `${humanData.species} is ${dinosArray.height - humanData.height} inches shorter than ${dinosArray.species}!`;
          }
          else if (dinosArray.height < humanData.height)
          {
                        return `${humanData.species} is ${humanData.height - dinosArray.height} inches taller than ${dinosArray.speciess}!`;
          }
        }
// NOTE: Weight in JSON file is in lbs, height in inches.
// Create Dino Compare Method 3
      function compareDiet(dinosArray, humanData) {
        if(dinosArray.diet == humanData.diet)
        {
                    return `${humanData.species} has the same diet as a ${dinosArray.species}!`;
        }
        else
        {
                    return `${humanData.species}'s diet doesn't match ${dinosArray.species}!`;
        }
     }
// NOTE: Weight in JSON file is in lbs, height in inches.
// Generate Tiles for each Dino in Array

function generateTiles(dinosArray)
{
            //loop to dynamically add card data
            const humanData = getFormData();
            dinosArray.splice(4, 0, humanData);

            for(index=0; index<dinosArray.length ; index++)
            {
                const newTile = document.createElement('div');
                const tileTitle = document.createElement('h3');
                const tileImg = document.createElement('img');
                const tileFact = document.createElement('p');

                newTile.className = 'grid-item';
                grid.appendChild(newTile);

                newTile.appendChild(tileTitle);
                newTile.appendChild(tileImg);
                newTile.appendChild(tileFact);


                tileTitle.innerHTML = dinosArray[index].species;
                tileImg.setAttribute('src',dinosArray[index].img);

                if (typeof dinosArray[index].fact != 'string')
                {
                    tileFact.innerText = "";
                }
                else
                 {
                   if(dinosArray[index].species != "Pigeon")
                   {
                    var facts = new Array(6);
                    facts[0] = dinosArray[index].fact;
                    facts[1] = dinosArray[index].species + " is found in " + dinosArray[index].where;
                    facts[2] = dinosArray[index].species + " was found at " + dinosArray[index].when;
                    facts[3] = compareWeight(dinosArray[index], humanData);
                    facts[4] = compareDiet(dinosArray[index], humanData);
                    facts[5] = compareHeight(dinosArray[index], humanData);
                    let randomIdx = facts[Math.floor(facts.length * Math.random())];
                    tileFact.innerText = randomIdx;
                  }
                  else {
                    tileFact.innerText = dinosArray[index].fact;
                  }
                }
            }
}
// create tiles with human data;
// Add tiles to DOM
// Remove form from screen
function toggleForm()
{
    const toggleMe = document.getElementById('dino-compare');
    toggleMe.style.display = "none";
}
function removeForm()
{
  const form = document.getElementById('dino-compare');
  form.innerHTML = '';
}

//On button click, prepare and display infographic
const compareMe = document.getElementById('btn');
compareMe.addEventListener('click', function(e)
{
    toggleForm(); //remove form
});
