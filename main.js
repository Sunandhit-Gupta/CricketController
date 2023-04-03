
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-analytics.js";
  import { getDatabase, ref, set, onValue, update, push, get, child, off} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";
  import myData from './match.json' assert {type:'json'};
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyDVKli-ztKD76Vj9We3-qcdV9UO1dYhsa8",
    authDomain: "cricket-b3d26.firebaseapp.com",
    databaseURL: "https://cricket-b3d26-default-rtdb.firebaseio.com",
    projectId: "cricket-b3d26",
    storageBucket: "cricket-b3d26.appspot.com",
    messagingSenderId: "198062150863",
    appId: "1:198062150863:web:22cb7dc0e2f9c98e8e13ba",
    measurementId: "G-DDY6HKG95V",
    databaseURL: "https://cricket-b3d26-default-rtdb.firebaseio.com/",

  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const database = getDatabase(app);

  function writeData() {
    
  }
//   Documents importing for DOM manupulation:::

  let match1btn2 = document.querySelector('.match1btn2');
  let m1firstscore = document.querySelector('.m1firstscore');
  let m1firstwickets = document.querySelector('.m1firstwickets');
  let m1firstover = document.querySelector('.m1firstover');
  let m1secondscore = document.querySelector('.m1secondscore');
  let m1secondwickets = document.querySelector('.m1secondwickets');
  let m1secondover = document.querySelector('.m1secondover');
  let match1btn4 = document.querySelector('.match1btn4');
  
  
  


// reading and writing on Html::::

  onValue(ref(database,'/' ), (snapshot) => {
    const matchDataBase = snapshot.val();
    console.log(matchDataBase);
    match1btn2.innerHTML = matchDataBase.Ongoing.Team1.name;
    m1firstscore.innerHTML = matchDataBase.Ongoing.Team1.runs;
    m1firstwickets.innerHTML= matchDataBase.Ongoing.Team1.wickets;
    m1firstover.innerHTML= matchDataBase.Ongoing.Team1.over;



    match1btn4.innerHTML = matchDataBase.Ongoing.Team2.name;
    m1secondscore.innerHTML = matchDataBase.Ongoing.Team2.runs;
    m1secondwickets.innerHTML= matchDataBase.Ongoing.Team2.wickets;
    m1secondover.innerHTML= matchDataBase.Ongoing.Team2.over;


    // commentDiv.innerHTML += matchDataBase.Ongoing.Comments;

  })

  let commentDiv = document.querySelector('.comment');
  onValue(ref(database,'/Ongoing/Comments'), (snapshot) => {
    const matchDataBase = snapshot.val();
    commentDiv.innerHTML = '';
    snapshot.forEach(function(element){

      commentDiv.innerHTML += `<div>${element.val().Time+" : "+element.val().Headline}</div>`;
      console.log(element.val().Time);
    })

  })
 

  // Working with COntrol PANEL :

  // DOcument Manipulation ::
  // for team1:
  
  let team1namesubmit = document.querySelector('.team1namesubmit');
  
  let team1scoresubmit = document.querySelector('.team1scoresubmit');

  let team1over = document.querySelector('.team1over').value;
  let team1oversubmit = document.querySelector('.team1oversubmit');

  let team1wicket = document.querySelector('.team1wicket').value;
  let team1wicketsubmit = document.querySelector('.team1wicketsubmit');

  // For team2 :
  let team2name = document.querySelector('.team2name').value;
  let team2namesubmit = document.querySelector('.team2namesubmit');

 let  team2score = document.querySelector('.team2score').value;
  let team2scoresubmit = document.querySelector('.team2scoresubmit');

  let team2over = document.querySelector('.team2over').value;
  let team2oversubmit = document.querySelector('.team2oversubmit');

  let team2wicket = document.querySelector('.team2wicket').value;
  let team2wicketsubmit = document.querySelector('.team2wicketsubmit');


  
  // Adding functionality to update database:

let team1nameform = document.querySelector('.team1nameform');
team1nameform.addEventListener('submit', function (event) {
    event.preventDefault() //prevents from auto submitting
    let team1name = document.querySelector('.team1name').value;
    console.log(team1name);

    update(ref(database, "/Ongoing/Team1/"), 
        {name:team1name}
    );

    team1nameform.reset();
})
  // Storing values in variables from form::

let team2nameform = document.querySelector('.team2nameform');
team2nameform.addEventListener('submit', function (event) {
    event.preventDefault() //prevents from auto submitting
    let team2name = document.querySelector('.team2name').value;
    console.log(team2name);
    update(ref(database, "/Ongoing/Team2/"), 
        {name:team2name}
    );
    team2nameform.reset();
})

// UPDATING SCORES:::
let team1scoreform = document.querySelector('.team1scoreform');
team1scoreform.addEventListener('submit', function (event) {
    event.preventDefault() //prevents from auto submitting
    let team1score = document.querySelector('.team1score').value;
    console.log(team1score);
    update(ref(database, "/Ongoing/Team1/"), 
        {runs:team1score}
    );
    team1scoreform.reset();
})

let team2scoreform = document.querySelector('.team2scoreform');
team2scoreform.addEventListener('submit', function (event) {
    event.preventDefault() //prevents from auto submitting
    let team2score = document.querySelector('.team2score').value;
    console.log(team2score);
    update(ref(database, "/Ongoing/Team2/"), 
        {runs:team2score}
    );
    team2scoreform.reset();
})

// UPDATING OVERS:::
let team1overform = document.querySelector('.team1overform');
team1overform.addEventListener('submit', function (event) {
    event.preventDefault() //prevents from auto submitting
    let team1over = document.querySelector('.team1over').value;
    console.log(team1over);
    update(ref(database, "/Ongoing/Team1/"), 
        {over:team1over}
    );
    team1scoreform.reset();
})

let team2overform = document.querySelector('.team2overform');
team2overform.addEventListener('submit', function (event) {
    event.preventDefault() //prevents from auto submitting
    let team2over = document.querySelector('.team2over').value;
    console.log(team2over);
    update(ref(database, "/Ongoing/Team2/"), 
        {over:team2over}
    );
    team2scoreform.reset();
})

// UPDATING WICKETS:::

let team1wicketform = document.querySelector('.team1wicketform');
team1wicketform.addEventListener('submit', function (event) {
    event.preventDefault() //prevents from auto submitting
    let team1wicket = document.querySelector('.team1wicket').value;
    console.log(team1wicket);
    update(ref(database, "/Ongoing/Team1/"), 
        {wickets:team1wicket}
    );
    team1wicketform.reset();
})

let team2wicketform = document.querySelector('.team2wicketform');
team2wicketform.addEventListener('submit', function (event) {
    event.preventDefault() //prevents from auto submitting
    let team2wicket = document.querySelector('.team2wicket').value;
    console.log(team2wicket);
    update(ref(database, "/Ongoing/Team2/"), 
        {wickets:team2wicket}
    );
    team2wicketform.reset();
})


// Adding commenting features::

let addCommentForm = document.querySelector('.addCommentForm');
addCommentForm.addEventListener('submit', function (event) {
    event.preventDefault() //prevents from auto submitting
    let commentInput = document.querySelector('.commentInput').value;
    console.log(commentInput);
    let currentDay = new Date();
    let time = currentDay.getHours()+":"+currentDay.getMinutes()+":"+currentDay.getSeconds()
    push(ref(database, "/Ongoing/Comments/"), 
        {Time:time,
        Headline:commentInput}
    );
     addCommentForm.reset();
})

// Adding SAVING SLOT FEATURE:::

let saveMatchForm = document.querySelector('.saveMatchForm');

saveMatchForm.addEventListener('submit', function (event) {
    event.preventDefault() //prevents from auto submitting
    let savingSlot = document.querySelector('.saveMatchClass').value;
    if(window.confirm("Do you want to Save ?")==true){
      console.log('welcome')

      onValue(ref(database,'/Ongoing'), (snapshot) => {

        const matchDataBase = snapshot.val();

        console.log(matchDataBase);

        set(ref(database, "/Saved/"+savingSlot),matchDataBase);

      },
      
      {

        onlyOnce : true

      });


  }

  saveMatchForm.reset();
    
}
    
)




  
