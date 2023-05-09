//This is I declare war api from class so modify it and make black jack work
//Good luck and stay frosty!

//create variables for our buttons

  document.querySelector('#newGame').addEventListener('click', newGame)
  document.querySelector('.deal').addEventListener('click', deal)
  //  document.querySelector('#hit').addEventListener('click', dealOne)
//Get the deck
let deckOrigin = 'https://www.deckofcardsapi.com/api/deck/'

//set up fetch request and assign it a variable 
const sendRequest = async (URL) => { 
  try{
    const response = await fetch(`${deckOrigin}${URL}`) // sends a request to the API 
    const data = await response.json() //parse to json
    return data
  }  catch(err) {
      console.log(`Fetch err: Check request${URL},${err}`)
  };
}
//
//get the deck!
//first step is to make it return data
if(!localStorage.getItem('deckID')){ //if there is no item in local storage with the name deckID get one
  sendRequest('new/shuffle/?deck_count=1')  
    .then(data => {
      console.log(`Success: ${data}`)
      localStorage.setItem('deckID', data.deck_id) //taking the deck id from the data and storing it in local storage
      
    })
}
//next we need to set up a function. use fetch variable to make newGame work. 
  //what do we want the button to do?

async function newGame(){ //probably should kill previous games storage
  localStorage.clear()
  location.reload()
}

function deal(){//when the game starts each player should get 2 cards
    try{ //first attempt to get data from the server **console.log(data)
    sendRequest(`${localStorage.getItem('deckID')}/draw/?count=2`)
    .then(data =>{
      //now create and try to populate the player array with two cards the console.log() the results.
      console.log(data) 
      //change code below this line
      let player1 = []
      for(let i = 0; i < data.length; i++){
          if(data[i] < 21){

            localStorage.setItem('player1', data.cards.value)
           return player1.push(data.cards[i].code).reduce((acc,curr) => acc + curr, 0) //when I push values to the array I want to auto sum them 

            // hit()  --create global function
            // fold() --create global function

          }else if(data[i] === 21){
            document.querySelector('h3').innerText = 'BlackJack!'
            console.log('BLACKJACK!')
          }else{
            document.querySelector('h3').innerText = 'BUST!!!!'
            console.log('BUST!')
          }
      }
    })
  }catch(err){
    console.log('404 Fetch Failure: Bad URL')
  }
}


// function hit(){

//       .then(res => res.json()) // parse response as JSON
//       .then(data => {
//         console.log(data)
//         let val1 = Number(cardValue( data.cards ))
//         let val2 = Number(cardValue( data.cards ))
//         document.querySelector('#card1').src = data.cards[0].image 
//         document.querySelector('#card2').src = data.cards[1].image 
//         if(val1 + val2 < 21){
//           document.querySelector('h3').innerText = 'Hit or Fold?'

      
          
          
//         }else if(val1 + val2 > 21){
//           
//         }else{
//           document.querySelector('h3').innerText = 'BlackJack!'
//         }
//       })
//       .catch(err => {
//           console.log(`error ${err}`)
//       });
// }

//     function dealOne(){
//         const dealHit = `https://www.deckofcardsapi.com/api/deck/${deckId}/pile/list/`
//         fetch(dealHit)
//         .then(res => res.json())
//         .then(data => {
//             console.log(data)
//             document.querySelector('#card3').src = data.cards[2].image 

//         })
//         .catch(err => {
//             console.log(`error ${err}`)
//         }); 
//     }  
function cardValue(val){
  if(val === "KING" ||val === "QUEEN"|| val === "JACK"){
    return 10
  }else if(val === "ACE" ){
    //come up with a scenario for when to eval ACE as 1 and when to eval as 11
    return 11
  }else{
    return val
  }
}