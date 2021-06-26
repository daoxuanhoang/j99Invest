import SignInPage from "./pages/signin";
import SignUpPage from "./pages/signup";
import ForgotPasswordPage from "./pages/forgot";
import ActivePage from "./pages/active";
import NewPasswordPage from "./pages/newpassword";
import ChangeEmailPage from "./pages/changEmail";
import AuthReducer from "./redux/reducer";
import AuthSaga from "./redux/sagas";

export { SignInPage, SignUpPage, ForgotPasswordPage, ActivePage, NewPasswordPage, ChangeEmailPage };

export { AuthReducer, AuthSaga };
