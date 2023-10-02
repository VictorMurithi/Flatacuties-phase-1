const deliverables = () => {
    // lets get the the reset button ID
    const resetButton = document.getElementById('reset-btn'); // Define resetButton here
  
    // lets get the vote count element ID
    const voteCount = document.getElementById('vote-count');
  
    // lets store the initial vote count value 
    voteCount.dataset.initialValue = "0"; 
  
    // lets add a click event listener to the Reset button
    resetButton.addEventListener('click', () => {
      //Lets Reset the vote count to its initial value
      voteCount.textContent = voteCount.dataset.initialValue;
    });
  
    // lets get the element with the ID 'character-bar'
    const animals = document.getElementById('character-bar');
    // Clear the previous list items
    animals.innerHTML = '';
  
    // Fetch the list of characters from the server
    fetch('http://localhost:3000/characters')
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status ${res.status}`);
        }
        return res.json();
      })
      .then(function (data) {
        // Log the data received from the server
        console.log(data);
  
        data.forEach((animal) => {
          const animallistItem = document.createElement('li');
          animallistItem.textContent = animal.name;
  
          // Add a click event listener to the list item
          animallistItem.addEventListener('click', () => {
            console.log('You clicked on:', animal.name);
  
            // Update the animal details on the page 
            const animalImage = document.getElementById('image');
            const animalName = document.getElementById('name');
            const animalVotes = document.getElementById('vote-count');
  
            // Update the variable names with the data for the clicked animal
            animalImage.src = animal.image;
            animalName.innerText = animal.name;
            animalVotes.innerText = animal.votes;
            
            let currentVote = parseInt(animalVotes.textContent, 10);
            //lets get the votes form
            const voteForm = document.getElementById('votes-form')
            const voteInput = document.getElementById('votes')
            voteForm.addEventListener('submit', (e) => {
                //lets prevent the page from refreshing
                e.preventDefault()
                //lets get the new vote from input
                let newVote = parseInt(voteInput.value, 10);
                //lets update the current vote count by adding new vote
                currentVote += newVote;
                //here we are displaying the vote count
                animalVotes.textContent = currentVote;
            })
          });
          // Append the list item to the 'animals' container
          animals.appendChild(animallistItem);
        });
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  
  // Ensure the function loads after DOM has loaded
  document.addEventListener('DOMContentLoaded', deliverables);
  