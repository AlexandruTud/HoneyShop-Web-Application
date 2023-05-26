var firebaseConfig = {
    apiKey: "AIzaSyAg6AmsqYCQxMfbb3m-M4AcohEz2HbeFXo",
    authDomain: "comments-linguritademiere.firebaseapp.com",
    databaseURL: "https://comments-linguritademiere-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "comments-linguritademiere",
    storageBucket: "comments-linguritademiere.appspot.com",
    messagingSenderId: "680911610727",
    appId: "1:680911610727:web:b8a1c3c15b65d1a79ac5c2",
    measurementId: "G-98EZKZ6TE4"
  };
  firebase.initializeApp(firebaseConfig);
  var database = firebase.database();
  
  window.addEventListener('DOMContentLoaded', loadComments);
  
  function loadCuvinte() {
    return fetch('cuvinte.json')
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        return data.cuvinte;
      })
      .catch(function(error) {
        console.error('Eroare la încărcarea cuvintelor:', error);
      });
  }
  
  function save() {
    var username = document.getElementById('username').value;
    var say_something = document.getElementById('say_something').value;
    var rating = selectedRating;
  
    var name = username.trim();
    var comment = say_something.trim();
  
    var alertDiv = document.getElementById('alert_message');
  
    if (name === "" || comment === "") {
      alertDiv.innerText = "Te rog completează toate câmpurile.";
      alertDiv.style.color = "red";
      return;
    }
    
    // cel mai simplu asa, deoarece pot sa gestionez comentariile si din baza de date , iar daca vad un cuvant nou care este acceptat, il adaug in json
    loadCuvinte().then(function(cuvinte) {
      var lowerComment = comment.toLowerCase();
      var commentWords = lowerComment.split(" "); 

      for (var i = 0; i < cuvinte.length; i++) {
        var cuvant = cuvinte[i];

        for (var j = 0; j < commentWords.length; j++) {
          var commentWord = commentWords[j];
          if (commentWord.includes(cuvant)) {
            alertDiv.innerText = "Comentariul folosește un limbaj ofensator.";
            alertDiv.style.color = "red";
            return;
          }
        }
      }
    
      
    

    alertDiv.innerText = "";
  
    var timestamp = firebase.database.ServerValue.TIMESTAMP;

    var new_user_ref = database.ref('users').push();
  
    new_user_ref.set({
      username: username,
      say_something: say_something,
      rating: rating,
      timestamp: timestamp
    }).then(function() {
      document.getElementById('username').value = '';
      document.getElementById('say_something').value = '';
      selectedRating = 0;
      rate(0); 
    }).catch(function(error) {
      console.error('Error saving comment:', error);
    });
  });
  }
  
  function displayOutput(username, say_something, rating, timestamp) {
    var outputContainer = document.getElementById('output_container');
    var outputDiv = document.createElement('div');
    outputDiv.classList.add('comment');
  
    var headerDiv = document.createElement('div');
    headerDiv.classList.add('comment-header');
    headerDiv.innerHTML = '<p class="username">' + username + '</p>';
  
    var ratingDiv = document.createElement('div');
    ratingDiv.classList.add('comment-rating');
    for (var i = 1; i <= 5; i++) {
      var starClass = (i <= rating) ? 'star rated' : 'star';
      ratingDiv.innerHTML += '<span class="' + starClass + '">&#9733;</span>';
    }
  
    var textDiv = document.createElement('div');
    textDiv.classList.add('comment-text');
    textDiv.textContent = say_something;
  
    outputDiv.appendChild(headerDiv);
    outputDiv.appendChild(ratingDiv);
    outputDiv.appendChild(textDiv);
    outputContainer.appendChild(outputDiv);

    var dateDiv = document.createElement('div');
    dateDiv.classList.add('comment-date');
    dateDiv.textContent = new Date(timestamp).toLocaleString(); 
    headerDiv.appendChild(dateDiv);

    outputContainer.appendChild(outputDiv);
    countComments();
  
    countComments(); 
  }
  
  function loadComments() {
    var outputContainer = document.getElementById('output_container');
    var commentsRef = database.ref('users');
    commentsRef.on('child_added', function(data) {
      var commentData = data.val();
      displayOutput(commentData.username, commentData.say_something, commentData.rating, commentData.timestamp); 
    });
  
    countComments();
  }
  
  function countComments() {
    var commentsRef = database.ref('users');
  
    commentsRef.once('value', function(snapshot) {
      var commentCount = snapshot.numChildren();
      displayCommentCount(commentCount);
    });
  }
  
  function displayCommentCount(count) {
    var commentCountDiv = document.getElementById('comment_count');
    commentCountDiv.innerText = 'Total comentarii: ' + count;
  }
  
  var selectedRating = 0;
  
  function rate(rating) {
    selectedRating = rating;
    var starRating = document.getElementById('star_rating');
    var stars = starRating.getElementsByClassName('star');
    for (var i = 0; i < stars.length; i++) {
      if (i < rating) {
        stars[i].classList.add('rated');
      } else {
        stars[i].classList.remove('rated');
      }
    }
  }

  
  const acceptCookiesButton = document.getElementById("accept-cookies");
  acceptCookiesButton.addEventListener("click", () => {
    // Update the click count in Firebase
    const clickCountRef = database.ref("clickCount");
    clickCountRef.transaction((currentCount) => {
      return (currentCount || 0) + 1;
    });

    // Set the cookie
    document.cookie = "acceptedCookies=true; path=/";
  });

  
    
  
