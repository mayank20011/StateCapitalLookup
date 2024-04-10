const search = document.getElementById("search-box");

// function to match input with json data

function matchinput(statename, searchstate) {
  // console.log(typeof statename);
  statename = statename.toUpperCase();
  searchstate = searchstate.toUpperCase();
  for (let i = 0; i < searchstate.length; i++) {
    if (searchstate[i] != statename[i]) {
      return false;
    }
  }
  return true;
}

// function to createinnerhtml in output box

function createinnerHtml(matches)
{
  document.getElementById("output").innerHTML ="";
   matches.forEach((match)=>
   {
    document.getElementById("output").innerHTML +=`
     <div class="card card-body mb-3">
     <h4 class="lighttext">${match.name} (${match.abbr}) <span class="text-primary">${match.capital}</span></h4>
     <small class="lighttext">Lat: <span class="text-primary strong">${match.lat}</span>/ Long:<span class="text-primary strong">${match.long}</span></small>
     </div>
    `;
   })
}

function matchabbr(stateabbr, searchstateabbr) {
  // console.log(typeof statename);
  stateabbr = stateabbr.toUpperCase();
  searchstateabbr = searchstateabbr.toUpperCase();
  for (let i = 0; i < searchstateabbr.length; i++) {
    if (searchstateabbr[i] != stateabbr[i]) {
      return false;
    }
  }
  return true;
}


// function for search
const searchState = async (searchText) => {
  // searchText is the Value of Text That we want to search

  const res = await fetch("state.json");
  const states = await res.json();

  // get matches
  // filter methode returns a array of all the elemets that matches the callback function
  const matches = states.filter((state) => {
    if (matchinput(state.name, searchText) || matchabbr(state.abbr, searchText)) {
      return state;
    }
  });

  if(matches.length ==0 )
  {
    
    document.getElementById("output").innerHTML=`<h3 class="text-center
    text-primary">No Such State Exist</h3>`;

  }
  else
  {
    createinnerHtml(matches);
  }
};

search.addEventListener("input", (e) => {
  if (e.target.value == "") {
    document.getElementById("output").innerHTML="";
  } else {
    searchState(e.target.value);
  }
});
