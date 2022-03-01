import React from "react";
import { Provider } from "react-redux";

import store from "store";
import TodoListContainer from "containers/TodoListContainer";
import Header from "containers/Header";
import ThemeProvider from "providers/ThemeProvider";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <Header />
        <TodoListContainer />
      </ThemeProvider>
    </Provider>
  );
};

export default App;
