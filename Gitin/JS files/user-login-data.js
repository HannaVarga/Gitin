async function getUserDetails(userName){
  try {
    const res = await fetch(
    `https://api.github.com/users/${userName}`
    );
    const json = await res.json();
    return{json};
      
  } catch (error) {
    return{error};
  
  }
}

    
export{getUserDetails};




