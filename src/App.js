import React, { Component } from 'react';
import './App.css';
import database, { firebase, googleAuthProvider } from "./firebase/firebase"

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      totalClicks: "*loading*",
      userClicks: "*loading*"
    }

    this.handleButtonIncrease = this.handleButtonIncrease.bind(this);
    this.handleButtonLogin = this.handleButtonLogin.bind(this);
    this.handleButtonLogout = this.handleButtonLogout.bind(this);
  }

  handleButtonLogin() {
    return firebase.auth().signInWithPopup(googleAuthProvider)
  }

  handleButtonLogout() {
    return firebase.auth().signOut();
  }

  handleButtonIncrease() {
    let currentTotal = undefined;
    let currentUser = undefined;
    database.ref("total").once("value", snapshot => currentTotal = snapshot.val().totalClicks)
    database.ref("total").set({ totalClicks: currentTotal + 1})
    if(this.state.loggedIn) {
      database.ref(`users/${this.state.userID}`).once("value", snapshot => currentUser = snapshot.val().userClicks)
      database.ref(`users/${this.state.userID}`).set({ userClicks: currentUser + 1})
    }
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState(() => ({ loggedIn: true, userID : user.uid }),
        () => {
          database.ref("total").on("value", (snapshot) => {
            this.setState({
              totalClicks: snapshot.val().totalClicks
            })
          })
      
          database.ref(`users/${this.state.userID}`).on("value", (snapshot) => {
            if(snapshot.val() !== null) {
              this.setState({
                userClicks: snapshot.val().userClicks
              })
            } else {
              this.setState({
                userClicks: 0
              })
            }
          })
        }
        );
      } else {
        this.setState(() => ({ loggedIn: false, userID : undefined }),
          () => {
            database.ref("total").on("value", (snapshot) => {
              this.setState({
                totalClicks: snapshot.val().totalClicks
              })
            })
          }
        );
      }
    })
  }

  renderLogin = () => {
    return (
      <button onClick={this.handleButtonLogin} className="App-login">Login</button>
    )
  }

  renderLogout() {
    return (
      <button onClick={this.handleButtonLogout} className="App-login">Logout</button>
    )
  }

  render() {
    return (
      <div className="App">
        <div className="App-body">
          <div className="App-total-clicks">The button has been clicked a total of {this.state.totalClicks} {this.state.totalClicks === 1 ? "time" : "times"}!</div>
          {!this.state.loggedIn ? this.renderLogin() : this.renderLogout()}
          <button disabled={isNaN(this.state.totalClicks)} onClick={this.handleButtonIncrease} className="App-button">Click Here!</button>
          {this.state.loggedIn ? <div className="App-user-clicks">You have clicked the button {this.state.userClicks} {this.state.userClicks === 1 ? "time" : "times"}!</div> : <div className="App-user-clicks">If you would like to keep track of your clicks, log into your Google account!</div>}
        </div>
      </div>
    );
  }
}

export default App;
