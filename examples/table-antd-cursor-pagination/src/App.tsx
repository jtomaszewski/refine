import { GitHubBanner, Refine } from "@refinedev/core";
import {
  useNotificationProvider,
  ThemedLayout,
  ErrorComponent,
  RefineThemes,
} from "@refinedev/antd";
import routerProvider, {
  NavigateToResource,
  UnsavedChangesNotifier,
  DocumentTitleHandler,
} from "@refinedev/react-router";
import { BrowserRouter, Routes, Route, Outlet } from "react-router";

import { ConfigProvider, App as AntdApp } from "antd";
import "@ant-design/v5-patch-for-react-19";
import "@refinedev/antd/dist/reset.css";

import { dataProvider } from "./rest-data-provider";
import { PostList } from "./pages/posts";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <GitHubBanner />
      <ConfigProvider theme={RefineThemes.Blue}>
        <AntdApp>
          <Refine
            dataProvider={dataProvider("https://api.github.com")}
            routerProvider={routerProvider}
            resources={[
              {
                name: "repos/refinedev/refine/commits",
                list: "/repos/refinedev/refine/commits",
                meta: {
                  label: "Commits",
                },
              },
            ]}
            notificationProvider={useNotificationProvider}
            options={{
              syncWithLocation: true,
              warnWhenUnsavedChanges: true,
            }}
          >
            <Routes>
              <Route
                element={
                  <ThemedLayout>
                    <Outlet />
                  </ThemedLayout>
                }
              >
                <Route
                  index
                  element={
                    <NavigateToResource resource="repos/refinedev/refine/commits" />
                  }
                />

                <Route
                  path="/repos/refinedev/refine/commits"
                  element={<PostList />}
                />

                <Route path="*" element={<ErrorComponent />} />
              </Route>
            </Routes>
            <UnsavedChangesNotifier />
            <DocumentTitleHandler />
          </Refine>
        </AntdApp>
      </ConfigProvider>
    </BrowserRouter>
  );
};

export default App;
