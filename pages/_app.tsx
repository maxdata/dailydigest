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
import { appWithTranslation, useTranslation } from "next-i18next";
import { RefineKbarProvider } from "@pankod/refine-kbar";
import { authProvider } from "src/authProvider";
import { supabaseClient } from "src/utility";
import { Title, Sider, Layout, Header } from "@components/layout";
import { OffLayoutArea } from "@components/offLayoutArea";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const { t, i18n } = useTranslation();

  const i18nProvider = {
    translate: (key: string, params: object) => t(key, params),
    changeLocale: (lang: string) => i18n.changeLanguage(lang),
    getLocale: () => i18n.language,
  };

  return (
    <ChakraProvider theme={refineTheme}>
      <RefineKbarProvider>
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
          i18nProvider={i18nProvider}
          OffLayoutArea={OffLayoutArea}
        >
          <Component {...pageProps} />
        </Refine>
      </RefineKbarProvider>
    </ChakraProvider>
  );
}

export default appWithTranslation(MyApp);
