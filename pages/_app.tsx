import React from "react";
import { AppProps } from "next/app";
import { Refine } from "@pankod/refine-core";
import {
  AuthPage,
  notificationProvider,
  ChakraProvider,
  refineTheme,
  ReadyPage,
  ErrorComponent,
} from "@pankod/refine-chakra-ui";
import routerProvider from "@pankod/refine-nextjs-router";
import { dataProvider } from "@pankod/refine-supabase";
import { ChakraUIInferencer } from "@pankod/refine-inferencer/chakra-ui";
import { authProvider } from "src/authProvider";
import { supabaseClient } from "src/utility";
import { Title, Sider, Layout, Header } from "@components/layout";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <ChakraProvider theme={refineTheme}>
      <Refine
        routerProvider={routerProvider}
        dataProvider={dataProvider(supabaseClient)}
        authProvider={authProvider}
        LoginPage={AuthPage}
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
      >
        <Component {...pageProps} />
      </Refine>
    </ChakraProvider>
  );
}

export default MyApp;
