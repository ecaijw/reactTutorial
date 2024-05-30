import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {useState} from 'react';

const user = {
    name: 'luke',
    imageUrl: 'https://d220yz93drhwe7.cloudfront.net/smp/general/bzai/bzai-logo.png'
};

function MyButton({id, appButtonCount, onClick}) {
    const [count, setCount] = useState(0);
    const [progress, setProgress] = useState('|');

    function handleClick() {
        // alert(`You clicked me. ${count}. ${progress}`)
        setCount(count + 1);
        buttonTotalCount++;
        setProgress(progress + '|');

        onClick(id); // Pass the button ID to the onClick handler
    }

    return (
        <button onClick={handleClick}>
        I'm a button. {count}. {progress}
        </button>
    );
}

let isLoggedIn = false;
let content;
let buttonTotalCount = 0;

if (isLoggedIn) {
    content = "<AdminPanel />";
} else {
    content = "<LoginnForm />";
}

// You will rely on JavaScript features like for loop and the array map() function to render lists of components.

const products = [
    {title: "cabbage", isFruit:false, id:1},
    {title: "garlic", isFruit:false, id:2},
    {title: "apple", isFruit:true, id:3},
];
const listItems = products.map(product => 
    <li 
        key = {product.id}
        style={
            {color: product.isFruit?'magenta' : 'darkgreen'}
        }
    >
        {product.title}
    </li>
);


let App = function MyApp() {
    const [appButtonCount, setAppButtonCount] = useState(0);
    const [clickedButtonId, setClickedButtonId] = useState('');
    
    function handleButtonClick(id) {
        setAppButtonCount(appButtonCount + 1);
        setClickedButtonId(id);
        buttonTotalCount ++;
    }
    

  return (
    <div>
      <img src = {user.imageUrl}>
      </img>
      <h1>Welcome to my app</h1>
      <MyButton id = 'button1' appButtonCount={appButtonCount} onClick={handleButtonClick}/>
      <p></p>
      <MyButton id = 'button2' appButtonCount={appButtonCount} onClick={handleButtonClick}/>
      <p id='name'></p>
      Name: {user.name}
      <p id='buttonTotalCount'></p>
      {appButtonCount}. {buttonTotalCount}. {clickedButtonId}
      <ul>{listItems}</ul>
    </div>
  );
}


const root = createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);