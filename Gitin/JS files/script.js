import { getUserGroup } from "./location-data.js";
import { getUserDetails } from "./user-login-data.js";


const nameContainer = document.getElementById("name-container");
const locationContainer = document.getElementById("language-container");
const locationId = document.getElementById("location-id");
const repositryBtn = document.getElementById("repositories-btn");
const followersBtn = document.getElementById("followers-btn");
const searchButton = document.getElementById("search-button");
const mainDefault = document.querySelector("main");




 






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
                  
    }
    userDetailsArray.push(userObject);
    
  }
    console.log(userDetailsArray);
  





});

  







  