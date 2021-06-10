import './App.css';
import { IntlProvider } from "react-intl";
// import SignInPage from "./modules/auth/signin/index";
import SignUpPage from "./modules/auth/signup/index";

function App() {
  return (
    <IntlProvider>
      <div className="App">
      {/* <SignInPage/> */}
      <SignUpPage/>
    </div>
    </IntlProvider>
  );
}

export default App;
