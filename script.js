let question = 'Given an array of integers, find two numbers such that they add up to a specific target number'; 
let example = `Assumptions: 
- Each input will have exactly one solution 
- One element may not be used more than once`;

//pull question data
const request = async() => {
    const response = await fetch('http://localhost:61842/algometer');
    const json = response.json();
    console.log(json);
}

//call request 
request();

document.getElementById('question').innerHTML = question;
document.getElementById('example').innerHTML = example;