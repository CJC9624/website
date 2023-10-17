let saveButton = document.getElementById("saveMe");
let saveThis = document.getElementById("savedItems");
let saveThisComment = document.getElementById("commentForm");
//array to save pages
let saveList = [];

//saving page item object set up
function item(index, page, url) {
  this.index = index;
  this.page = page;
  this.url = url;
}

//have you loaded before or not?
function firstTimeLoad() {
  let saveList;
  //get from session storage if run before == null
  if (sessionStorage.getItem("runBefore") === null) {
    //set the list on the session storage
    sessionStorage.setItem("pages", JSON.stringify(saveList));
    //now this has run before
    sessionStorage.setItem("runBefore", true);
  } else {
    //get the list from session storage
    saveList = JSON.parse(sessionStorage.getItem("pages"));
    //create the element
    saveList.forEach(function (pageChosen, index) {
      let newPage = document.createElement("li");
      newPage.setAttribute("id", index);
      //the content of the element
      newPage.innerHTML = `
              Page name: ${pageChosen.page}, 
              Page URL ${pageChosen.url}`;
              //index count up
      index++;
      //add to the correct location
      saveThis.appendChild(newPage);
    });
  }
}

//save function, this saves to session storage, amd can be used in different contexts as not made to be specific
function save(name, array){
  //set item as name of your choice and array of your choice
  sessionStorage.setItem(name, JSON.stringify(array));
}

//function to save the pages in a list on the save page page
function savePage() {
  //new item object to add to list
  let newItem = new item(
    //index, body (which will tell us the page name), and the URL
    (index = saveList.length),
    document.getElementsByClassName("body"),
    window.location.href
  );
  //get the pages from storage and add to save list created at line 5
  if (sessionStorage.getItem("pages")) {
    saveList = JSON.parse(sessionStorage.getItem("pages"));
  }
  //push the new item to the saved list
  saveList.push(newItem);
  //save using save function
  save("pages", saveList);
  //reload page to show new output
  window.location.reload();
  //alert user that we have new items
  alert(`You have saved ${saveList.length} items`);
}


//create a comment so we can use it in the submitComment function
function comment(name, comment) {
  this.name = name;
  this.comment = comment;
}

//initiate comment array for use below
let comments = [];
//comment section id for finding right place
let commentSection = document.getElementById("comments");

//function to add comments to the pages
function submitComment() {
  let savedComment = [];
  //telling the user that they have submitted a commnet
  alert("You have submitted a comment!");
  //check if tehre are comments in session storage before using
  if (sessionStorage.getItem("commentRunBefore") === null) {
    //if yes, these will be presented
    sessionStorage.setItem("comments", JSON.stringify(comments));
    //this has been run before
    sessionStorage.setItem("commentRunBefore", true);
  } else {
    //get the comments from session storage
    savedComment = JSON.parse(sessionStorage.getItem("comments"));
    savedComment.forEach(function (comment, index) {
      //create list element as comment
      let newComment = document.createElement("li");
      //add the id of the index num
      newComment.setAttribute("id", index);
      //the content of the element
      newComment.innerHTML = `
              Author: ${comment.name}, 
              Comment: ${comment.comment}`;
      index++;
      commentSection.appendChild(newComment);
    });
  }
}

function saveComment() {
  //creation of the comment
  let newComment = new Comment(
    document.getElementsByClassName("name"),
    document.getElementsByClassName("comment")
  );
  if (sessionStorage.getItem("comments")) {
    saveList = JSON.parse(sessionStorage.getItem("comments"));
  }
  commentSection.push(newComment);
  save("comments", comments);
  window.location.reload();
}

//find the like button
let likeButton = document.getElementsByClassName("like");
//functionality for like button
function likePage() {
  //show that you have liked the page by changing the button
  likeButton.style.backgroundcolor = "green";
  likeButton.innerHTML = "Liked";
}

//this is the only thing I can do for now since I will need more practice on db tables first
function contact() {
  alert("Congrats you are now on the mailing list!");
}
