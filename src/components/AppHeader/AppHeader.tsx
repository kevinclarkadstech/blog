import {
  IonButton,
  IonButtons,
  IonHeader,
  IonIcon,
  IonToolbar,
} from "@ionic/react";
import { sunnyOutline, cloudyNightOutline } from "ionicons/icons";
import { useEffect, useState } from "react";

export function AppHeader() {
  const [theme, setTheme] = useState("light");
  useEffect(() => {
    const prefersDarkQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const prefersDark = prefersDarkQuery.matches;
    console.log("prefersDark", prefersDark);
    const fromLocalStorage = localStorage.getItem("theme");
    console.log("fromLocalStorage", fromLocalStorage);
    if (fromLocalStorage) {
      setTheme(fromLocalStorage);
    } else if (prefersDark) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, []);

  useEffect(() => {
    console.log("Setting theme", theme);
    if (theme === "dark") {
      document.querySelector("html")!.classList.add("ion-palette-dark");
    } else {
      document.querySelector("html")!.classList.remove("ion-palette-dark");
    }
  }, [theme]);

  function toggleTheme() {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === "light" ? "dark" : "light";
      localStorage.setItem("theme", newTheme);
      return newTheme;
    });
  }

  return (
    <IonHeader>
      <IonToolbar>
        <div slot="start">
          <h1>Kevin's Blog</h1>
        </div>
        <IonButtons slot="end">
          <IonButton
            color={theme === "dark" ? "warning" : "secondary"}
            fill="clear"
            onClick={() => {
              console.log("Toggle theme");
              toggleTheme();
            }}
          >
            <IonIcon
              icon={theme === "dark" ? sunnyOutline : cloudyNightOutline}
            />
          </IonButton>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
}
