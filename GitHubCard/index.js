/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/biskoi
*/

// let cardsParent = document.querySelector('.cards');

// axios.get('https://api.github.com/users/biskoi').then(reply => {
//   console.log(reply.data.login);

// });

// axios.get('https://api.github.com/users/biskoi/followers').then(reply => {
//   console.log(reply);
// });


/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/

function cardMaker(attr){
  let card = document.createElement('div');
  let cardImg = document.createElement('img');
  let cardInfo = document.createElement('div');
  let cardName = document.createElement('h3');
  let cardUsername = document.createElement('p');
  let cardLocation = document.createElement('p');
  let cardProfile = document.createElement('p');
  let cardProfileLink = document.createElement('a');
  let cardFollowers = document.createElement('p');
  let cardFollowing = document.createElement('p');
  let cardBio = document.createElement('p');

  card.classList.add('card');
  cardInfo.classList.add('card-info');
  cardName.classList.add('name');
  cardUsername.classList.add('username');
  
  card.append(cardImg, cardInfo);
  cardInfo.append(cardName, cardUsername, cardLocation, cardProfile, cardFollowers, cardFollowing, cardBio);
  cardProfile.append(cardProfileLink);

  cardImg.src = attr.avatar_url;
  cardName.textContent = attr.name;
  cardUsername.textContent = attr.login;
  cardProfileLink.textContent = attr.html_url;
  cardProfileLink.href = attr.html_url;
  cardLocation.textContent = 'Location: ' + attr.location;

  let followersLink = attr.url + '/followers';
  axios.get(followersLink).then(reply => {
    let length = reply.data.length;
    cardFollowers.textContent = `Followers: ${length}`;
  });
  
  let followingLink = attr.url + '/following';
  axios.get(followingLink).then(reply => {
    let length = reply.data.length;
    cardFollowing.textContent = `Following: ${length}`;
  });

  cardBio.textContent = `Bio: ${attr.bio} `;

  return card;

}

const followersArray = ['sonicemma', 'MMGroesbeck', 'alan5123', 'fjhansen', 'MelodyRackham'];
// let followersArray = [];

let cardsParent = document.querySelector('.cards');
let mainUser = 'https://api.github.com/users/biskoi';
let apiLink = 'https://api.github.com/users/';

// Subject card
axios.get(mainUser).then(reply => {
  cardsParent.prepend(cardMaker(reply.data));
});

// Get followers from Subject
function getFollowers(){
  let followerUrl = mainUser + '/followers';
  let axiosGet = axios.get(followerUrl);
  if(followersArray.length === 0){
    axiosGet.then(reply => {
      reply.data.forEach(item => {
        followersArray.push(item.login.toString());
      })
    });
  }
}

getFollowers();
console.log(followersArray);

// Follower cards
followersArray.forEach(user => {
  let url = apiLink + user;
  axios.get(url).then(reply => {
    cardsParent.append(cardMaker(reply.data));
  });

});

