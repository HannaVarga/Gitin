// Great use of async await and setting it up as a utility function
async function getUserGroup(language,location,repos) {
    try {
        const res = await fetch(
            `https://api.github.com/search/users?q=language:${language}+location:${location}+repos:>=${repos}`
        );
        const json = await res.json();
        return {json};
        } catch (error) {
        return {error};
    }
}
    
export{getUserGroup};