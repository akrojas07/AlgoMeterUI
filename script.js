class User
{
    constructor(id, questions = [])
    {
        this.id = id;
        this.questions = questions;
    }
}
/*  User methods    */
//create new instance of user class
let user = new User();

/// method to create a new user
/// AlgoMeter will automatically assign the user an id when website is opened
/// sends empty body
/// returns userId
async function createNewUser()
{
    const response = await fetch('http://localhost:61842/algometer/user/add',
    {
         method: 'POST',
         mode: 'no-cors',
         headers: 
         {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify()
    });

    // set user info 
    var userObj = response.json();
    user.id = userObj['id'];

}

/// method to update an existing user's list of questions
/// returns list of questions already seen by the user
async function updateExistingUser()
{
    const response = await fetch('http://localhost:61842/algometer/user/update',
    {
         method: 'PUT',
         mode: 'no-cors',
         headers: 
         {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify(user)
    });

    var existingUserObj = response.json();

    //update user question list info
    user.questions = existingUserObj['questionids'];

}

///method to delete user information once user's session has ended
async function deleteUserInformation()
{
    const response = await fetch('http://localhost:61842/algometer/user/delete',
    {
         method: 'DELETE',
         mode: 'cors',
         headers: 
         {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify(user)
    });
}

/*  Question methods */
let questionId = 0;

///method to retrieve question information from server
//returns question object 
async function retrieveQuestion()
{
    const response = await fetch('http://localhost:61842/algometer/question',
    {
         method: 'GET',
         mode: 'no-cors',
         headers: 
         {
            'Accept': 'application/json'
         }
    });

    var questionObj = response.json();
    document.getElementById('question').innerHTML = questionObj['question'];
    document.getElementById('example').innerHTML = questionObj['examples'];
    questionId = questionObj['questionid'];

    //add question to user list 
    if(questionId !== 0)
    {
        user.questions.push(questionId);
    }
}


//detect if window is closing to delete user information
window.addEventListener('beforeunload', function(e)
{
    deleteUserInformation();
});

//when session is initialized, create new user
oninit: createNewUser()
{
    isloaded = true;
}