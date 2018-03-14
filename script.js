var xmlhttp = new XMLHttpRequest();
var urlcategories = "http://jservice.io/api/categories?count=5&offset=10";
var urlquestions = "http://jservice.io/api/category?id="
var categories;
var questions;

function getCategories(url) {
  return new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onload = function() {
      if(this.status >= 200 && this.status < 300) {
        var categories = JSON.parse(this.responseText);
        setCategories(categories);
        resolve(xhr.response);
      }
      else {
        reject({
          status: this.status,
          statusText: xhr.statusText
        });
      }
    }
    xhr.send();
  });
}

function getQuestions(url,letter) {
  return new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onload = function() {
      if(this.status >= 200 && this.status < 300) {
        var questions = JSON.parse(this.responseText);
        setQuestionsDiv(questions,letter);
        setAnswersDiv(questions,letter);
        resolve(xhr.response);
      }
      else {
        reject({
          status: this.status,
          statusText: xhr.statusText
        });
      }
    }
    xhr.send();
  });
}

cats = getCategories(urlcategories)
  .then(function() {
    setCategoriesDiv(categories);
  })
  .then(function() {
    getQuestions(urlquestions+categories[0].id, "a");
  })
  .then(function() {
    getQuestions(urlquestions+categories[1].id, "b");
  })
  .then(function() {
    getQuestions(urlquestions+categories[2].id, "c");
  })
  .then(function() {
    getQuestions(urlquestions+categories[3].id, "d");
  })
  .then(function() {
    getQuestions(urlquestions+categories[4].id, "e");
  })
  .catch(function (err) {
  console.error('Augh, there was an error!', err.statusText);
  });

function setCategories(arr) {
  categories = arr;
}

function setQuestions(arr) {
  questions = arr;
  console.log(arr);
}

function setCategoriesDiv(arr) {
    document.getElementById("a").innerHTML = "<p>"+arr[0].title+"</p>";
    document.getElementById("b").innerHTML = "<p>"+arr[1].title+"</p>";
    document.getElementById("c").innerHTML = "<p>"+arr[2].title+"</p>";
    document.getElementById("d").innerHTML = "<p>"+arr[3].title+"</p>";
    document.getElementById("e").innerHTML = "<p>"+arr[4].title+"</p>";
}

function setQuestionsDiv(arr,letter) {
  document.getElementById(letter+"_question1").innerHTML = arr.clues[0].question;
  document.getElementById(letter+"_question2").innerHTML = arr.clues[1].question;
  document.getElementById(letter+"_question3").innerHTML = arr.clues[2].question;
  document.getElementById(letter+"_question4").innerHTML = arr.clues[3].question;
  document.getElementById(letter+"_question5").innerHTML = arr.clues[4].question;
}

function setAnswersDiv(arr,letter) {
  document.getElementById(letter+"_answer1").innerHTML = arr.clues[0].answer;
  document.getElementById(letter+"_answer2").innerHTML = arr.clues[1].answer;
  document.getElementById(letter+"_answer3").innerHTML = arr.clues[2].answer;
  document.getElementById(letter+"_answer4").innerHTML = arr.clues[3].answer;
  document.getElementById(letter+"_answer5").innerHTML = arr.clues[4].answer;
}

var selects = document.getElementsByClassName('select');
for(var i = 0; i < selects.length; i++) {
  var select = selects[i];
  select.onclick = function() {
    document.getElementById(this.id).classList.add('hide');
    showQuestion(this.id.substr(0,1),this.id.substr(this.id.length-1))
  }
}

var qs = document.getElementsByClassName('q');
for(var i = 0; i < selects.length; i++) {
  var q = qs[i];
  q.onclick = function() {
    if(document.getElementById(this.id).classList.contains('show')) {
      document.getElementById(this.id).classList.add('hide');
      document.getElementById(this.id).classList.remove('show');
      showAnswer(this.id.substr(0,1),this.id.substr(this.id.length-1));
    }
  }
}

function showQuestion(letter,number){
  document.getElementById(letter+"_question"+number).classList.remove('hide');
  document.getElementById(letter+"_question"+number).classList.add('show');
}

function showAnswer(letter,number){
  document.getElementById(letter+"_answer"+number).classList.remove('hide');
  document.getElementById(letter+"_answer"+number).classList.add('show');
}
