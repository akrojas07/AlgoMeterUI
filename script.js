var user = { questionIds : [], userId: undefined };

/// method to create a new user
/// AlgoMeter will automatically assign the user an id when website is opened
/// sends empty body
/// returns userId
async function createNewUser() {
  try {
    let response = await fetch('http://localhost:61842/api/user', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    //set user information
    let userObject = await response.json(); 
    localStorage.setItem('ui', userObject['userId']);
    this.user.userId = userObject['userId'];
  } catch (error) {
    console.log(error);
  }

  //retrieve question
  retrieveQuestion();
}

/// method to update an existing user's list of questions
async function updateExistingUser() {
  try {
    await fetch('http://localhost:61842/api/user', {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.user)
    });
  } catch (error) {
    console.log(error);
  }
}

///method to delete user information once user's session has ended
async function deleteUserInformation() {
  try {
    console.log('Im deleting');
    await fetch('http://localhost:61842/api/user',
      {
        method: 'DELETE',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.user.userId)
      });

    localStorage.clear();
  } catch (error) {
    console.log(error);
  }
}

/*  Question methods */
let questionId = 0;

///method to retrieve question information from server
//returns question object
async function retrieveQuestion() {
  var userId = localStorage.getItem('ui');
  try {
    const response = await fetch(
      'http://localhost:61842/api/questions?userId='+userId,
      {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Accept': 'application/json'
        }
      }
    );

    var questionObj = await response.json();
    document.getElementById('question').innerHTML = questionObj['question'];
    document.getElementById('input').innerHTML = questionObj['input'];
    document.getElementById('output').innerHTML = questionObj['output'];
    questionId = questionObj['questionId'];
  } catch (error) {
    console.log(error);
  }

  //add question to user list
  if (questionId !== 0) {
    this.user.questionIds.push(questionId);
  }
  updateExistingUser();
}

//detect if window is closing to delete user information
window.onunload = deleteUserInformation();

//when session is initialized, create new user
oninit: createNewUser();
{
  isloaded = true;
}
