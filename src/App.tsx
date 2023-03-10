import { AuthProvider, Refine } from "@pankod/refine-core";
import {
    AuthPage,
    ChakraProvider,    
    ErrorComponent,
    ReadyPage,
    refineTheme,
    notificationProvider,
} from "@pankod/refine-chakra-ui";
import { dataProvider} from "@pankod/refine-supabase";
import routerProvider from "@pankod/refine-react-router-v6";
import { IconBrandGoogle, IconBrandGithub } from "@tabler/icons";
import { PostCreate, PostEdit, PostList, PostShow } from "./pages";
import { supabaseClient } from "utility/supabaseClient";
import { Title, Sider, Layout, Header } from "components/layout";

const App: React.FC = () => {
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
                notificationProvider={notificationProvider()}
                routerProvider={{
                    ...routerProvider,
                    routes: [
                        {
                            path: "/register",
                            element: (
                                <AuthPage
                                    type="register"
                                    providers={[
                                        {
                                            name: "google",
                                            label: "Sign in with Google",
                                            icon: <IconBrandGoogle />,
                                        },
                                        {
                                            name: "github",
                                            label: "Sign in with GitHub",
                                            icon: <IconBrandGithub />,
                                        },
                                    ]}
                                />
                            ),
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
                        providers={[
                            {
                                name: "google",
                                label: "Sign in with Google",
                                icon: <IconBrandGoogle />,
                            },
                            {
                                name: "github",
                                label: "Sign in with GitHub",
                                icon: <IconBrandGithub />,
                            },
                        ]}
                    />
                )}
                ReadyPage={ReadyPage}
                catchAll={<ErrorComponent />}
                Title={Title}
                Sider={Sider}
                Layout={Layout}
                Header={Header}
                resources={[
                    {
                        name: "posts",
                        list: PostList,
                        show: PostShow,
                        // use Drawer for edit and create
                        // edit: PostEdit,
                        // create: PostCreate,
                    },
                ]}
            />
        </ChakraProvider>
    );
};

export default App;
