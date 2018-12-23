import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here9!
    this.state = { showInstallMessage: false };
  }

  componentWillMount() {
    const isIos = () => {
      const userAgent = window.navigator.userAgent.toLowerCase();
      return /iphone|ipad|ipod/.test(userAgent);
    }
    // Detects if device is in standalone mode
    const isInStandaloneMode = () => ('standalone' in window.navigator) && (window.navigator.standalone);

    // Checks if should display install popup notification:
    if (isIos() && !isInStandaloneMode()) {
      this.setState({ showInstallMessage: true });

    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          {this.props.children}
        </header>
      </div>
    );
  }
}

export default App;
