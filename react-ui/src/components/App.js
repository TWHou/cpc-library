import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';

import Header from './Header';
import BookList from './BookList';
import BookDetail from './BookDetail';
import AddBook from './AddBook';


class App extends Component {

  render() {
    return (
      <div className="container">
        <Header />
        <Switch>
          <Route exact path="/" component={BookList} />
          <Route exact path="/new" component={AddBook} />
          <Route exact path="/:bookId" component={BookDetail} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);