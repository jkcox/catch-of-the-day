/*Storepicker component */
//es6 version, how to include mixins
import React from 'react';
import { History } from 'react-router';
import h from '../helpers';
import reactMixin from 'react-mixin';
import autobind from 'autobind-decorator';

@autobind
class StorePicker extends React.Component {

  goToStore(event) {
    //stop form submission
    event.preventDefault();
    //get data from the input
    var storeId = this.refs.storeId.value;
    this.history.pushState(null, '/store/' + storeId);
    //transition from storepicker to App
  }

  render() {
    return (
      <form className="store-selector" onSubmit={this.goToStore}>
        <h2>Please Enter A Store</h2>
        <input type="text" ref="storeId" defaultValue={h.getFunName()} required />
        <input type="Submit" />
      </form>
    )
  }

}
reactMixin.onClass(StorePicker, History);
/*
var StorePicker = React.createClass({
  mixins: [History],
  goToStore : function(event) {
    //stop form submission
    event.preventDefault();
    //get data from the input
    var storeId = this.refs.storeId.value;
    this.history.pushState(null, '/store/' + storeId);
    //transition from storepicker to App
  },
  render : function (){
    return (
      <form className="store-selector" onSubmit={this.goToStore}>
        <h2>Please Enter A Store</h2>
        <input type="text" ref="storeId" defaultValue={h.getFunName()} required />
        <input type="Submit" />
      </form>
    )
  }

});
*/
export default StorePicker;
