import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { blogList, BlogPostUrl } from "../../constants/blogList";

export function BlogPage() {
  return (
    <>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonTitle>Blog</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent fullscreen>
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large"></IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonList>
            <IonItem
              button
              routerLink="/blog/dont-mix-logic-in-your-controller-router-or-middleware"
            >
              <IonLabel>
                Don't Mix Logic In Your Controller/Router or Middleware
              </IonLabel>
            </IonItem>
            <IonItem
              button
              routerLink="/blog/dont-put-database-access-in-logic-functions"
            >
              <IonLabel>Don't Put Database Access In Logic Functions</IonLabel>
            </IonItem>
          </IonList>
          <IonButton
            routerLink={
              "/blog/dont-mix-logic-in-your-controller-router-middleware" as BlogPostUrl
            }
          >
            Don't Mix Logic In Your Controller/Router or Middleware
          </IonButton>
          <IonButton
            routerLink={
              "/blog/dont-put-database-access-in-logic-functions" as BlogPostUrl
            }
          >
            Don't Put Database Access In Logic Functions
          </IonButton>
          <IonButton href="/test/index.html">Test</IonButton>
        </IonContent>
      </IonPage>
    </>
  );
}
