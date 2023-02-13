import React from "react";
import { AppProps } from "next/app";
import { AuthProvider, Refine } from "@pankod/refine-core";
// import { authProvider } from "src/authProvider";
import {
  AuthPage,
  notificationProvider,
  ChakraProvider,
  refineTheme,
  ReadyPage,
  ErrorComponent,
} from "@pankod/refine-chakra-ui";
import routerProvider from "@pankod/refine-nextjs-router";
// import routerProvider from "@pankod/refine-react-router-v6";
import { dataProvider } from "@pankod/refine-supabase";
import { ChakraUIInferencer } from "@pankod/refine-inferencer/chakra-ui";
import { supabaseClient } from "src/utility";
import { Title, Sider, Layout, Header } from "@components/layout";
import { IconBrandGithub, IconBrandGoogle } from "@tabler/icons";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const authProvider: AuthProvider = {
    login: async ({ providerName, email }) => {
        if (providerName === "google") {
            window.location.href =
                "https://accounts.google.com/o/oauth2/v2/auth";
            return Promise.resolve(false);
        }

        if (providerName === "github") {
            window.location.href =
                "https://github.com/login/oauth/authorize";
            return Promise.resolve(false);
        }

        if (email) {
            localStorage.setItem("email", email);
            return Promise.resolve();
        }

        return Promise.reject();
    },
    register: (params) => {
        if (params.email && params.password) {
            localStorage.setItem("email", params.email);
            return Promise.resolve();
        }
        return Promise.reject();
    },
    updatePassword: (params) => {
        if (params.newPassword) {
            //we can update password here
            return Promise.resolve();
        }
        return Promise.reject();
    },
    forgotPassword: (params) => {
        if (params.email) {
            //we can send email with reset password link here
            return Promise.resolve();
        }
        return Promise.reject();
    },
    logout: () => {
        localStorage.removeItem("email");
        return Promise.resolve();
    },
    checkError: () => Promise.resolve(),
    checkAuth: () =>
        localStorage.getItem("email")
            ? Promise.resolve()
            : Promise.reject(),
    getPermissions: () => Promise.resolve(["admin"]),
    getUserIdentity: () =>
        Promise.resolve({
            id: 1,
            name: "Jane Doe",
            avatar: "https://unsplash.com/photos/IWLOvomUmWU/download?force=true&w=640",
        }),
    };

  return (
    <ChakraProvider theme={refineTheme}>
      <Refine
        dataProvider={dataProvider(supabaseClient)}
        authProvider={authProvider}
        routerProvider={routerProvider}                
        // LoginPage={AuthPage}
        LoginPage={() => (
          <AuthPage
              providers={[
                  {
                      name: "google",
                      label: "Sign in with Google",
                      icon: <IconBrandGoogle />,
                  },
                  // {
                  //     name: "github",
                  //     label: "Sign in with GitHub",
                  //     icon: <IconBrandGithub />,
                  // },
              ]}
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
      >
        <Component {...pageProps} />
      </Refine>
    </ChakraProvider>
  );
}

export default MyApp;
