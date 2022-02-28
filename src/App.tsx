import React from "react";

import TodoListContainer from "containers/TodoListContainer";
import Header from "containers/Header";
import ThemeProvider from "providers/ThemeProvider";

const App: React.FC = () => {
  return (
    <>
      <ThemeProvider>
        <Header />
        <TodoListContainer />
      </ThemeProvider>
    </>
  );
};

export default App;
