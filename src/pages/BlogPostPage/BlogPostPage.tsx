import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

export function BlogPostPage({ postUrl }: { postUrl: string }) {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/blog" />
          </IonButtons>
          <IonTitle>{postUrl}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{postUrl}</IonTitle>
          </IonToolbar>
        </IonHeader>
        This is post detail page for {postUrl} ???
      </IonContent>
    </IonPage>
  );
}
