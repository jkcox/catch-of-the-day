import React from 'react';
import AddFishForm from './AddFishForm';
import autobind from 'autobind-decorator';
import Firebase from 'firebase';
const ref = new Firebase('https://jc-catch-of-the-day.firebaseio.com/')

/*inventory*/
//var Inventory = React.createClass({
//es6 version below
@autobind
class Inventory extends React.Component {
  constructor() {
    super();

    this.state = {
      uid : ''
    }
  }

  authenticate(provider) {
    console.log('login with ' + provider);
    ref.authWithOAuthPopup(provider, this.authHandler);
  }
  componentWillMount() {
    var token = localStorage.getItem('token');
    if(token) {
      ref.authWithCustomToken(token, this.authHandler);
    }
  }

  logout() {
    ref.unauth();
    localStorage.removeItem('token');
    this.setState({
      uid : null
    });
  }
  authHandler(err, authData) {
    if(err){
      console.log('err');
      return;
    }
    //save login token in browser
    localStorage.setItem('token', authData.token);

    const storeRef = ref.child(this.props.params.storeId);
    storeRef.on('value', (snapshot)=> {
      var data = snapshot.val() || {};

      //claim as own store
      if(!data.owner) {
        storeRef.set({
          owner : authData.uid
        });
      }
      //update state to refelect current owner and user
      this.setState({
        uid : authData.uid,
        owner : data.owner || authData.uid
      });
    });
  }

  renderLogin() {
    return (
      <nav className="login">
        <h2>Inventory</h2>
        <p>Sign in to change inventory</p>
        <button className="github" onClick={this.authenticate.bind(this, 'github')}>Github Login</button>
        <button className="facebook" onClick={this.authenticate.bind(this, 'facebook')}>Facebook Login</button>
        <button className="twitter" onClick={this.authenticate.bind(this, 'twitter')}>Twitter Login</button>
      </nav>
    )
  }

  renderInventory(key) {
    var linkState = this.props.linkState;
    return (
      <div className="fish-edit" key={key}>
        <input type="text" valueLink={linkState('fishes.'+ key +'.name')}/>
        <input type="number" valueLink={linkState('fishes.'+ key +'.price')}/>
        <select valueLink={linkState('fishes.'+ key +'.status')}>
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea type="text" valueLink={linkState('fishes.'+ key +'.desc')}></textarea>
        <input type="url" valueLink={linkState('fishes.'+ key +'.image')}/>
        <button onClick={this.props.removeFish.bind(null, key)}>Remove Fish</button>
      </div>
    )
  }

  render() {
    let logoutButton = <button onClick={this.logout}>Log Out</button>
    //first check if they arent logged in
    if(!this.state.uid) {
      return (
        <div>{this.renderLogin()}</div>
      )
    }
    //then check if they arent owner of current store
    if(this.state.uid !== this.state.owner) {
      return (
        <div>
          <p>Sorry you aren't owner of store</p>
          {logoutButton}
        </div>
      )
    }
    return (
      <div>
        <h2>Inventory</h2>
        {logoutButton}
        {Object.keys(this.props.fishes).map(this.renderInventory)}
        <AddFishForm {...this.props} />
        <button onClick={this.props.loadSamples}>Load Sample Fishes</button>
      </div>
    )
  }
  /*es5 way
  propTypes : {
    linkState : React.PropTypes.func.isRequired,
    addFish : React.PropTypes.func.isRequired,
    removeFish : React.PropTypes.func.isRequired,
    fishes : React.PropTypes.object.isRequired,
    loadSamples : React.PropTypes.func.isRequired
  }
  */
};

//es6 after creating class, provide prop types
Inventory.propTypes = {
  linkState : React.PropTypes.func.isRequired,
  addFish : React.PropTypes.func.isRequired,
  removeFish : React.PropTypes.func.isRequired,
  fishes : React.PropTypes.object.isRequired,
  loadSamples : React.PropTypes.func.isRequired
}

export default Inventory;
