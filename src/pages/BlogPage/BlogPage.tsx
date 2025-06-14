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
            {Object.entries(blogList).map(([postUrl, post]) => (
              <IonItem key={postUrl} button routerLink={`/blog/${postUrl}`}>
                <IonLabel>{post.title}</IonLabel>
              </IonItem>
            ))}
          </IonList>
        </IonContent>
      </IonPage>
    </>
  );
}
