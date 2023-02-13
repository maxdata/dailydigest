import React from "react";

import { Refine } from "@pankod/refine-core";
import {
  AuthPage,
  notificationProvider,
  ChakraProvider,
  refineTheme,
  ReadyPage,
  ErrorComponent,
} from "@pankod/refine-chakra-ui";

import { dataProvider, liveProvider } from "@pankod/refine-supabase";
import { ChakraUIInferencer } from "@pankod/refine-inferencer/chakra-ui";
import routerProvider from "@pankod/refine-react-router-v6";
import { supabaseClient } from "utility";
import { Title, Sider, Layout, Header } from "components/layout";
import authProvider from "./authProvider";

function App() {
  return (
    <ChakraProvider theme={refineTheme}>
      <Refine
        dataProvider={dataProvider(supabaseClient)}
        liveProvider={liveProvider(supabaseClient)}
        authProvider={authProvider}
        routerProvider={{
          ...routerProvider,
          routes: [
            {
              path: "/register",
              element: <AuthPage type="register" />,
            },
            {
              path: "/forgot-password",
              element: <AuthPage type="forgotPassword" />,
            },
            {
              path: "/update-password",
              element: <AuthPage type="updatePassword" />,
            },
          ],
        }}
        LoginPage={() => (
          <AuthPage
            type="login"
            providers={[
              {
                name: "google",
                label: "Sign in with Google",
              },
            ]}
            formProps={{
              defaultValues: {
                email: "info@refine.dev",
                password: "refine-supabase",
              },
            }}
          />
        )}
        notificationProvider={notificationProvider()}
        ReadyPage={ReadyPage}
        catchAll={<ErrorComponent />}
        resources={[
          {
            name: "posts",
            list: ChakraUIInferencer,
            edit: ChakraUIInferencer,
            show: ChakraUIInferencer,
            create: ChakraUIInferencer,
            canDelete: true,
          },
        ]}
        Title={Title}
        Sider={Sider}
        Layout={Layout}
        Header={Header}
      />
    </ChakraProvider>
  );
}

export default App;
