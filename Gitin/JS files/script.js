import { getUserGroup } from "./location-data.js";
import { getUserDetails } from "./user-login-data.js";
import { insertMainPage} from "./dom.js";
const searchButton = document.getElementById("search-button");
const mainDefault = document.querySelector(".profile-cards-box");
 
searchButton.addEventListener("click",async function(e){
  e.preventDefault();
  const location = document.getElementById("location-entry").value;
  const language = document.getElementById("language-entry").value;
  const experience = document.getElementById("experience-entry").value;
  const repos= document.getElementById("repos-entry").value;

    //     //**Pass in a condition that checks if form is empty**/
    // Great use of form validation but the only drawback here is the user is only notified about a single field.
    // an improvement could be to inject the text below each input so the user knows how many inputs are blank.
    if (location == "") {
        alert("Please fill out Location field");
    } else if (language == "") {
        alert("Please fill out Language field")
    } else if (experience == "") {
        alert("Please fill out Experience field")
    } else if (repos == "") {
        alert("Please fill out Repos field")
    } else {
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
                              avatar: userDetails.json.avatar_url,
                              github_url: userDetails.json.html_url,
                              repo_url: userDetails.json.html_url + '/?tab=repositories',
                              followers_url: userDetails.json.html_url + '/?tab=followers'
          }
          userDetailsArray.push(userObject);
      
        }
        // This function could probably be outside of the event listener as it is cluttering the code and readability 
        //console.log(userDetailsArray);
        const displaySearch = (array) => {
          const searchResult = array.map((item)=>{
            return` <div class="card-flex-container">
                      <div class="profile-card-container">
                        <div class="image-container"> 
                          <a href="${item.github_url}" target="_blank"><img src="./Images/github icon.png" id="github-icon"></a>
                          <img src="${item.avatar}" id="profile-picture">
                          <img src="./Images/linkedin icon.png" id="linkedin-icon">
                        </div>
                        <div class="text-flex-container">
                          <h4>${item.name}</h4>
                          <p>${language} Developer</p>
                          <h4>${item.location}</h4>
                        </div>
                        <div class="btn-container">
                          <button id="repositories-btn" onClick="window.open('${item.repo_url}');">Reopsitories:${item.repositories}</button>
                          <button id="followers-btn" onClick="window.open('${item.followers_url}');">Followers: ${item.followers}</button>
                        </div>
                      </div>
                    </div> `;
            });
      insertMainPage(mainDefault,searchResult).join("");
      };  
      displaySearch(userDetailsArray);
    };
});