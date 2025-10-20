import { Provider } from "react-redux";
import '@ant-design/v5-patch-for-react-19';

import AppRoutes from "./routes/AppRoutes";
import store from "./stores/store";
import EventSession from "./components/ui/event-session/EventSession";
import { BrowserRouter } from "react-router-dom";
import ThemeWrapper from "./styles/ThemeWrapper";
import { persistStore } from 'redux-persist'
import { PersistGate } from "redux-persist/integration/react";

let persistor = persistStore(store)

const App = () => {
  return (
    <ThemeWrapper >

      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <EventSession />
            <AppRoutes />
          </BrowserRouter>
        </PersistGate>
      </Provider>

    </ThemeWrapper>
  );
};

export default App;
