import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom';
import { router } from './Routes';
import {
    AppProvider,
    BreakpointsProvider,
    ChatWidgetProvider,
    // Error500,
    SettingsPanelProvider
} from "@frs535/react-ui-components";

import './css/user.min.css';
import './css/theme.min.css';
import {Provider} from "react-redux";
import store from "./store/config.ts";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <Provider store={store}>
          <AppProvider>
              <SettingsPanelProvider>
                  <ChatWidgetProvider supportChat={{id: 1, user: { id: 1, status: 'offline', name: "user name"}, unreadMessages: 1, messages: []}}>
                      <BreakpointsProvider>
                          <RouterProvider router={router}/>
                                  {/*<RouterProvider router={router} fallbackElement={<Error500/>}/>*/}
                      </BreakpointsProvider>
                  </ChatWidgetProvider>
              </SettingsPanelProvider>
          </AppProvider>
      </Provider>
  </React.StrictMode>,
)
