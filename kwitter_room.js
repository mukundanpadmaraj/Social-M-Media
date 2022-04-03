var firebaseConfig = {
      apiKey: "AIzaSyC5vvcTP_z2aDbolRUeX-6D2VRpB9maSCM",
      authDomain: "social-m-media.firebaseapp.com",
      databaseURL: "https://social-m-media-default-rtdb.firebaseio.com",
      projectId: "social-m-media",
      storageBucket: "social-m-media.appspot.com",
      messagingSenderId: "891269247116",
      appId: "1:891269247116:web:651d03ec156c897f1d8ba9"
};

firebase.initializeApp(firebaseConfig);
var user_name= localStorage.getItem("user_name");

document.getElementById("user_name").innerHTML="Welcome "+user_name+"!";

function addRoom(){
      var room_name=document.getElementById("add_room").value;
      firebase.database().ref("/").child(room_name).update({
            purpose:"adding room name"
      })
      localStorage.setItem("room_name",room_name);
      window.location="";
}

function getData() {
      firebase.database().ref("/").on('value', function (snapshot) {
            document.getElementById("output").innerHTML = ""; snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  Room_names = childKey;
                  console.log(childKey)
                  row="<div class='room_name' id="+Room_names+" onclick='redirectToRoomName(this.id)'>#"+Room_names+"</div>";
                  document.getElementById("output").innerHTML += row;

                  //End code
            });
      });
}
getData();

function redirectToRoomName(name){
      localStorage.setItem("room_name",name);
      window.location="kwitter_page.html";
}

function logout(){
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
      window.location="index.html";
}