"user strict";
import Autocomplete from './Autocomplete';
import usStates from './us-states';
import './main.css';

// US States
const data = usStates.map(state => ({
  text: state.name,
  value: state.abbreviation
}));

document.addEventListener('DOMContentLoaded',function() {
    document.getElementById('gh-user').childNodes[0].oninput=fetchGithub;
},false);

function fetchGithub(event){
    let value = event.target.value || 'k';
    if(value !== undefined){
        fetch(`https://api.github.com/search/users?q=${value}&per_page=10&access_token=f9fe6934ede3ce06eb3cfecbad22bd13d38392f1`).then(function(response) {
            return response.json();
        }).then(function(githubData) {
            var fetchedUsers = githubData.items;
            var githubDataEl = githubElement.options;
            var ghUsers = githubData.items.map(user => ({
                    text: user.login,
                    value: user.login,
                }));
            githubDataEl.ghUsers = ghUsers;

        });
    }
}


new Autocomplete(document.getElementById('state'), {
  data,
  onSelect: (stateCode) => {
    document.getElementById('state').childNodes[0].value=stateCode;
    console.log('selected state:', stateCode);
  },
});

var githubUser = [];
var ghUsers = githubUser.map(user => ({
        text: user.login,
        value: user.login,
    }));

console.log('githubUser',githubUser);
// Github Users
 var githubElement = new Autocomplete(document.getElementById('gh-user'), {
   ghUsers,
   onSelect: (ghUsers) => {
         document.getElementById('gh-user').childNodes[0].value=ghUsers;
     console.log('selected github user id:', ghUsers);
   },
 });
