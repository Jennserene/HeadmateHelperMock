class Chat {
  constructor() {
    this.parentDiv = document.querySelector("#chatView")
    this.postsURL = 'https://jsonplaceholder.typicode.com/posts/'
    this.usersURL = 'https://jsonplaceholder.typicode.com/users/'
    this.allPosts = undefined
    this.allUsers = undefined
  }

  async getPosts() {
    let response = await fetch(this.postsURL)
    let respJSON = await response.json()
    return respJSON
  }

  async getUsers() {
    let response = await fetch(this.usersURL)
    let respJSON = await response.json()
    return respJSON
  }

  async displayPosts(num) {
    for(let i = 1; i < num; i++) {
      let postData = this.allPosts[this.allPosts.length - i]
      let userID = postData.userId
      let userName = await this.getUserName(userID)
      let postText = postData.title
      this.createPost(userName, postText)
    }
  }

  createPost(userName, postText) {
    let post = document.createElement('div')
    post.className = "post"
    let name = document.createElement('h5')
    name.className = "postTitle"
    let temp = document.createTextNode(userName)
    name.appendChild(temp)
    let text = document.createElement('p')
    text.className = "postText"
    temp = document.createTextNode(postText)
    text.appendChild(temp)
    post.appendChild(name)
    post.appendChild(text)
    this.parentDiv.appendChild(post)

  }

  async getUserName(userId) {
    for(let i = 0; i <= this.allUsers.length - 1; i++) {
      if (this.allUsers[i].id == userId) {
        return this.allUsers[i].username
      }
    }
    console.log("ERROR: UserID not found")
    return "UNKNOWN"
  }

  async populate() {
    if (this.allPosts == undefined) {
      this.allUsers = await this.getUsers()
      let unshuffled = await this.getPosts()
      this.allPosts = this.shuffle(unshuffled) // REMOVE AFTER CONNECTED TO ACTUAL DB
      this.displayPosts(30)
    } else {
      this.displayPosts(30)
    }
  }

  // REMOVE THIS ONCE CONNECTED TO ACTUAL DB
  shuffle(array) {
    var currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }
}

window.onload = () => {
  let ch = new Chat()
  ch.populate()
}