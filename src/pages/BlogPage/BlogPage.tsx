import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

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
          Blog page
          <IonButton routerLink="/blog/dont-mix-logic">
            Don't Mix Logic In Your Controller/Middleware
          </IonButton>
          <IonButton href="/test/index.html">Test</IonButton>
        </IonContent>
      </IonPage>
    </>
  );
}
