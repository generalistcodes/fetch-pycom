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

function fetchGithub(event) {
    let value = event.target.value || 'k';
    let token = 'a040a1ab8bc603e3efa8947450e59f5b9feca5c9';
    if (value !== undefined) {
        fetch(`https://api.github.com/search/users?q=${value}&per_page=10&access_token=${token}`).then(function (response) {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Network response was not ok.');
        }).then(function (githubData) {
            var fetchedUsers = githubData.items;
            var githubDataEl = githubElement.options;
            var ghUsers = githubData.items.map(user => ({
                    text: user.login,
                    value: user.login,
                })
            )
            ;
            githubDataEl.ghUsers = ghUsers;
        }).catch(function (error) {
            console.log('There has been a problem with your fetch operation please change some query params: ', error.message);
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

// Github Users
 var githubElement = new Autocomplete(document.getElementById('gh-user'), {
   ghUsers,
   onSelect: (ghUsers) => {
         document.getElementById('gh-user').childNodes[0].value=ghUsers;
     console.log('selected github user id:', ghUsers);
   },
 });
