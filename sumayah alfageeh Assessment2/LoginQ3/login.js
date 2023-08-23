const SignUpForm = $('#SignUpForm');
const LoginForm = $('#LoginForm');
let db

// -----------------------------
SignUpForm.submit((e) => {
    e.preventDefault();
    const SignUpUserName = $('#SignUpUserName').val();
    const Email = $('#Email').val();
    const SignUpPassword = $('#SignUpPassword').val();
    const ConfirmPassword = $('#ConfirmPassword').val();
    if (SignUpPassword === ConfirmPassword) {
        SaveDataToIndexedDB(SignUpUserName, Email, SignUpPassword);
        alert('User Data Saved Successflly!');
    }
    else { alert('Passwords dont match'); }
});

LoginForm.submit((e) => {
    e.preventDefault();
    const LoginUserName = document.getElementById('LoginUserName').value;
    const LoginPassword = document.getElementById('LoginPassword').value;
    CheckDataInIndexedDB(LoginUserName, LoginPassword);
});


function SaveDataToIndexedDB(UserName, Email, Password) {
    const User = { username: UserName, email: Email, password: Password };
    const request = window.indexedDB.open('UserDB', 1);
    request.onerror = (event) => { alert('Sorry.Error Creating IndexedDB DataBase',); };
    request.onsuccess = (event) => {
        db = event.target.result;
        const transaction = db.transaction(['Users'], 'readwrite');
        const objectstore = transaction.objectStore('Users');
        const addUserRequest = objectstore.add(User);
        addUserRequest.onsuccess = () => {
            alert('User Data Saved Successflly!');
 
            // window.location.href = "SignIn.html"
        };
        transaction.onComplete = () => { db.close(); };
        $('#SignUpUserName').val("");
        $('#Email').val("");
        $('#SignUpPassword').val("");
        $('#ConfirmPassword').val("");
    };
    request.onupgradeneeded = (event) => {
        db = event.target.result;
        db.createObjectStore('Users', { keyPath: 'username' });
    };
}

function CheckDataInIndexedDB(UserName, Password) {
    const request = window.indexedDB.open('UserDB', 1);
    request.onerror = (event) => { alert("Error while reading"); };
    request.onsuccess = (event) => {
        db = event.target.result;
        const transaction = db.transaction(['Users'], 'readonly');
        const objectstore = transaction.objectStore('Users');
        const getUserRequest = objectstore.get(UserName);
        getUserRequest.onsuccess = () => {
            const User = getUserRequest.result;
            if (User && User.password === Password) {
                alert('Login Successfly!');

                // window.location.href = "HomePage_CoffeeSite.html";
                $('#LoginUserName').val("");
                $('#LoginPassword').val("");
            }
            else {
                alert('Name or Password Incorrect');
                // else {
                //     document.getElementById("noAccount").style.display= "block";
            }
        };
        transaction.oncomplete = () => { db.close(); };
    };
    request.onupgradeneeded = (event) => {
        const db = event.target.result;
        db.createObjectStore('Users', { keyPath: 'UserName' });
    };
}