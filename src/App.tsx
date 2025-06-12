import {
  IonApp,
  IonRouterOutlet,
  IonSplitPane,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router-dom";
// import Menu from "./components/Menu";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
import "@ionic/react/css/palettes/dark.class.css";
// import "@ionic/react/css/palettes/dark.system.css";

/* Theme variables */
import "./theme/variables.css";
import { BlogPage } from "./pages/BlogPage/BlogPage";
import { BlogPostPage } from "./pages/BlogPostPage/BlogPostPage";
import { AppHeader } from "./components/AppHeader/AppHeader";

setupIonicReact();

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <AppHeader />
        <IonSplitPane contentId="main" style={{ marginTop: "68px" }}>
          {/* <Menu /> */}
          <IonRouterOutlet id="main">
            <Route path="/" exact={true}>
              <Redirect to="/blog" />
            </Route>
            <Route path="/blog" exact={true}>
              <BlogPage />
            </Route>
            <Route
              path="/blog/:postUrl"
              exact={true}
              render={(props) => (
                <BlogPostPage postUrl={props.match.params.postUrl} />
              )}
            />
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
