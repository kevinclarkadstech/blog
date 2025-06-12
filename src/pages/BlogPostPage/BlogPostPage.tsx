import {
  IonBackButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useEffect, useMemo } from "react";
import { blogList, BlogPostKey } from "../../constants/blogList";
import prismjs from "prismjs";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-javascript"; // If you need JavaScript highlighting
import "prismjs/themes/prism-tomorrow.min.css";
import "./BlogPostPage.css"; // Import your custom styles if needed
import { CodeBlock } from "../../components/CodeBlock/CodeBlock";

export function BlogPostPage({ postUrl }: { postUrl: BlogPostKey }) {
  const blog = useMemo(() => {
    return blogList[postUrl];
  }, [postUrl]);

  useEffect(() => {
    setTimeout(() => {
      // Highlight code blocks using Prism.js
      const codeBlocks = document.querySelectorAll("pre code");
      codeBlocks.forEach((block) => {
        prismjs.highlightElement(block as HTMLElement);
      });
    }, 300);
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/blog" />
          </IonButtons>
          <IonTitle>Blog Post</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent
        fullscreen
        className="ion-padding"
        // style={{ "--padding-start": "5%", "--padding-end": "5%" }}
      >
        <IonGrid>
          <IonRow>
            <IonCol size="12" sizeLg="8">
              {blog ? (
                <div>
                  <h1>{blog.title}</h1>
                  <IonText color="medium">
                    <p>{blog.description}</p>
                    <p> {blog.date}</p>
                  </IonText>
                  <div>
                    {blog.content ?? <div>No content for this post.</div>}
                  </div>
                </div>
              ) : (
                <div>
                  <h1>Blog Post Not Found</h1>
                  <p>The blog post you are looking for does not exist.</p>
                </div>
              )}
            </IonCol>
            <IonCol size="12" sizeLg="4">
              <h3> More Posts</h3>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
}
