import { getUserGroup } from "./location-data.js";
import { getUserDetails } from "./user-login-data.js";
import { profileDefault , insertMainPage} from "./dom.js";


const nameContainer = document.getElementById("name-container");
const locationContainer = document.getElementById("language-container");
const locationId = document.getElementById("location-id");
const repositryBtn = document.getElementById("repositories-btn");
const followersBtn = document.getElementById("followers-btn");
const searchButton = document.getElementById("search-button");
const mainDefault = document.querySelector(".profile-cards-box");





 






searchButton.addEventListener("click",async function(e){

  e.preventDefault();
  const location = document.getElementById("location-entry").value;
  const language = document.getElementById("language-entry").value;
  const experience = document.getElementById("experience-entry").value;
  const repos= document.getElementById("repos-entry").value;

  console.log(location,language,experience,repos);




  const userGroupArray = await getUserGroup(language,location,repos);
  console.log(userGroupArray);
  const userArray = userGroupArray.json.items.slice(0,6);
  console.log(userArray);
  const userLoginArray = [];
  for (let i = 0; i < userArray.length; i++) {
    const element = userArray[i].login;
    userLoginArray.push(element);
    
  }
  console.log(userLoginArray);
  
  let userDetailsArray = [];
  for (let i = 0; i < userLoginArray.length; i++) {
    let userName = userLoginArray[i];
    let userDetails = await getUserDetails(userName);

    const userObject = {
                        name: userDetails.json.name,
                        experience: userDetails.json.created_at,
                        followers: userDetails.json.followers,
                        repositories: userDetails.json.public_repos,
                        location: userDetails.json.location,
                        company: userDetails.json.company, 
                        avatar: userDetails.json.avatar_url
    }
    userDetailsArray.push(userObject);
    
  }
  //console.log(userDetailsArray);

  const displaySearch = (array) => {

    const searchResult = array.map((item)=>{
      return` <div class="card-flex-container">
                <div class="profile-card-container">
                  <div class="image-container"> 
                    <img src="./Images/github icon.png" id="github-icon">
                    <img src="${item.avatar}" id="profile-picture">
                    <img src="./Images/linkedin icon.png" id="linkedin-icon">
                  </div>
                  <div class="text-flex-container">
                    <h4>${item.name}</h4>
                    <p>${language} Developer</p>
                    <h4>${item.location}</h4>
                  </div>
                  <div class="btn-container">
                    <button id="repositories-btn">Reopsitories:${item.repositories}</button>
                    <button id="followers-btn">Followers: ${item.followers}</button>
                  </div>
                </div>
              </div> `;
        }
    );
    insertMainPage(mainDefault,searchResult).join("");
};  



  
  displaySearch(userDetailsArray);
  




});