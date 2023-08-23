//first solve 
const inquirer = require('inquirer');

inquirer
  .prompt([
    {
      name: 'faveFood',
      message: 'What is your favorite food?',
    },
    {
      name: 'faveColor',
      message: 'What is your favorite color?',
    },
  ])
  .then(answers => {
    console.info('Answers:', answers);
  });


//second solve 

// import inquirer from 'inquirer';
// inquirer
//   .prompt([
//     {   message: "Hello. What is your Name?",
//         name: "Name",}])
//   .then((answers) => {
//     const Name = answers;
//     console.log(Name);})
//   .catch((error) => {
//     if (error.isTtyError) {
//       console.log("Tty Error");
//     } else {}
//   });