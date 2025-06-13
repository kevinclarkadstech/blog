import { JSX, useEffect, useRef } from "react";
import { renderToString } from "react-dom/server";
import prismjs from "prismjs";
// import "prismjs/components/prism-typescript";
// import "prismjs/components/prism-javascript"; // If you need JavaScript highlighting
// import "prismjs/components/prism-html";
// import "prismjs/components/prism-css";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";
import "prismjs/themes/prism-tomorrow.min.css";
import { IonButton, IonIcon, IonText } from "@ionic/react";
import { copyOutline } from "ionicons/icons";

type AllowedChildren = JSX.Element | string | Function;
export function CodeBlock({
  children,
  language,
}: {
  children: AllowedChildren;
  language: "javascript" | "typescript" | "html" | "css" | "jsx";
}) {
  const preRef = useRef<HTMLPreElement>(null);

  useEffect(() => {
    const preElement = preRef.current;
    if (preElement) {
      // Highlight code blocks using Prism.js
      const codeBlocks = preElement.querySelectorAll("code");
      codeBlocks.forEach((block) => {
        prismjs.highlightElement(block);
      });
    }
  });

  function removeLeadingSpaces(multilineString: string): string {
    return multilineString
      .split("\n")
      .map((line) => line.trimStart())
      .join("\n");
  }

  function renderContent(content: JSX.Element | string | Function): string {
    if (typeof content === "string") {
      return content;
    }
    if (typeof content === "function") {
      console.log("content", content.toString());
      console.log("indexof", content.toString().indexOf("{"));
      const string = removeLeadingSpaces(
        content.toString().slice(content.toString().indexOf("{") + 1, -1)
      );
      console.log("string", string);
      return string.trimStart();
    }
    return renderToString(content);
  }

  return (
    <pre ref={preRef} style={{ overflowX: "auto", position: "relative" }}>
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          //   paddingRight: "0.5em",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <IonText color="medium" style={{ fontSize: "0.8em" }}>
            {language.toUpperCase()}
          </IonText>
          <IonButton
            slot="icon-only"
            size="small"
            color="dark"
            fill="clear"
            style={{ margin: "0" }}
            onClick={() =>
              navigator.clipboard.writeText(renderContent(children))
            }
          >
            <IonIcon icon={copyOutline} />
          </IonButton>
        </div>
      </div>
      <code className={`language-${language}`}>{renderContent(children)}</code>
    </pre>
  );
}
