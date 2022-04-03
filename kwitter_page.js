//YOUR FIREBASE LINKS
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

var user_name = localStorage.getItem("user_name");
var room_name = localStorage.getItem("room_name");

function send() {
      message = document.getElementById("msg").value;
      firebase.database().ref(room_name).push({
            name: user_name,
            message: message,
            likes: 0
      })
      document.getElementById("msg").value = "";
}

function getData() {
      firebase.database().ref("/" + room_name).on('value', function (snapshot) {
            document.getElementById("output").innerHTML = "";
            snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  childData = childSnapshot.val();
                  if (childKey != "purpose") {
                        firebase_message_id = childKey;
                        message_data = childData;
                        console.log(firebase_message_id);
                        console.log(message_data);
                        name_of_the_user=message_data["name"];
                        msg=message_data["message"];
                        likes=message_data["likes"];
                        name_tag="<h4>"+name_of_the_user+"<img class='user_tick' src='tick.png'></h4>"
                        message_tag="<h4 class='message_h4'>"+msg+"</h4>"
                        likes_tag="<button class='btn btn-warning' id="+firebase_message_id+" value="+likes+" onclick='updateLikes(this.id)'>"
                        span_tag="<span class='glyphicon glyphicon-thumbs-up'>Likes: "+likes+"</span></button><hr>"

                        row=name_tag+message_tag+likes_tag+span_tag
                        document.getElementById("output").innerHTML+=row
                  }
            });
      });
}
function updateLikes(message_id){
      console.log(message_id);
      var likes_count=document.getElementById(message_id).value;
      var updated_likes_count=Number(likes_count)+1
      console.log(updated_likes_count)
      firebase.database().ref(room_name).child(message_id).update({
            likes:updated_likes_count
      })
}
getData();

function logout() {
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
      window.location = "index.html";
}