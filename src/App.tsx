import { Provider } from "react-redux";
import '@ant-design/v5-patch-for-react-19';

import AppRoutes from "./routes/AppRoutes";
import store from "./stores/store";
import EventSession from "./components/ui/event-session/EventSession";
import { BrowserRouter } from "react-router-dom";
import ThemeWrapper from "./styles/ThemeWrapper";

const App = () => {
  return (
    <ThemeWrapper >

      <Provider store={store}>
        <BrowserRouter>
          <EventSession />
          <AppRoutes />
        </BrowserRouter>

      </Provider>

    </ThemeWrapper>
  );
};

export default App;
