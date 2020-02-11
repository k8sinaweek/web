import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      creator: ""
    }
  }

  componentDidMount() {
    fetch("/api")
      .then(res => res.text())
      .then((result) => {
        this.setState({
          creator: result
        })
      },
        (err) => {
          console.log(err)
        }
      )
  }

  render() {
    return (
      <h1>Hello {this.state.creator}, you have successfully deployed the example 3 tier application!</h1>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))
