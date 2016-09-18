/* header */
import React from 'react';

/*var Header = React.createClass({

  render : function() {
    return (
      <header className="top">
        <h1>Catch
        <span className="ofThe">
          <span className="of">of</span>
          <span className="the">the</span>
        </span>
         Day</h1>
        <h3 className="test1"><span>{this.props.test1}</span></h3>
      </header>

    )

  },
  propTypes : {
    test1 : React.PropTypes.string.isRequired
  }
});*/

//es6 prop types example
class Header extends React.Component {
  render() {
    return (
      <header className="top">
        <h1>Catch
        <span className="ofThe">
          <span className="of">of</span>
          <span className="the">the</span>
        </span>
         Day</h1>
        <h3 className="test1"><span>{this.props.test1}</span></h3>
      </header>

    )
  }
}
Header.propTypes = {
  test1 : React.PropTypes.string.isRequired
}

export default Header;
