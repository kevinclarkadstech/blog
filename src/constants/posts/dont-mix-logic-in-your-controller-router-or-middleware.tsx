import { IonText } from "@ionic/react";
import { CodeBlock } from "../../components/CodeBlock/CodeBlock";
import { BlogPost } from "../blogList";

export const dontMixLogicInYourControllerRouterOrMiddleware: BlogPost = {
  title: "Don't Mix Logic In Your Controller/Router Or Middleware",
  description:
    "A guide on keeping your controller/router and middleware free of logic.",
  date: "06/12/2025",
  content: (
    <>
      <p>
        As a senior developer, one recurring anti-pattern I’ve observed is the
        practice of embedding business logic directly within routers,
        controllers, or middleware. While this may feel convenient during early
        development, it leads to several long-term challenges that make systems
        harder to test, maintain, and scale. A common nomenclature is "thin
        controllers, fat services", which means putting the bulk of your code at
        the service level, rather than in the controller or router.
      </p>
      <h3>Why This Is An Anti-Pattern</h3>
      <ol>
        <li>Testing Becomes Cumbersome.</li>

        <IonText color="medium">
          <p style={{ fontSize: "0.9em", fontStyle: "italic" }}>
            Placing logic in controllers or middleware tightly couples it to the
            HTTP layer, which complicates unit testing. Instead of simply
            testing a function with mock inputs, you now have to simulate entire
            HTTP requests—often with tools like Supertest (in Node.js)—and mock
            aspects like authentication headers, full JSON payloads, and route
            behavior. This slows down feedback loops and adds unnecessary
            friction.
          </p>
        </IonText>
        <li>
          It ties you to the framework and makes refactoring less possible, or
          at least more tedious.
        </li>
        <IonText color="medium">
          <p style={{ fontSize: "0.9em", fontStyle: "italic" }}>
            With web applications that I architect, the reason I have the
            router/controller have minimal responsibility other than receiving
            the request and invoking a service function is it provides agility
            to easily refactor. For example, suppose if I had a hosted
            Node.js/Express app that exploded in popularity and I wanted to
            convert to serverless functions like AWS Lambda or Azure Functions -
            this would be trivial and low-risk.
          </p>
        </IonText>
        <li>
          It makes it difficult, if not impossible, to share the logic easily.
        </li>
        <IonText color="medium">
          <p style={{ fontSize: "0.9em", fontStyle: "italic" }}>
            DRY pattern becomes much more important when it comes to business
            logic. You do not want to duplicate logic if possible, because any
            changes to the logic must be done in multiple places. It’s better to
            keep logic at the service layer as it is easier to maintain and
            share if business requirements change.
          </p>
        </IonText>
      </ol>
      <p>
        <strong>So all middleware is an anti-pattern?</strong>
        <br />
        <br />
        Absolutely not. But I would say it’s best for things that don’t fall
        under logic. A good use case would be populating the user from the
        request by verifying the token and pulling the user from the database,
        transforming the shape of the body (perhaps for backwards compatibility
        issues), doing object mapping, instantiating a dependency, etc. There is
        a bit of a “gray area”, and that comes with object parsing/validation
        with something like Zod at the middleware level so the request body is
        already validated when the controller gets the request.
      </p>
      <p>
        <strong>What do you (the author) propose?</strong>
        <br />
        <br />
        In my opinion, logic should be separated from 3rd party dependencies as
        much as possible (unless they are helping validate something). So I
        would say the logic functions should be pure functions without side
        effects such as pulling data from the database, etc. For more, see:
        <a
          href="https://github.com/kevinclarkadstech/ABAC-Authorization-Ideas"
          target="_blank"
        >
          https://github.com/kevinclarkadstech/ABAC-Authorization-Ideas
        </a>
        . If logic is kept separate from these things, AI can help writing unit
        tests (almost write themselves!!), the unit tests do not need to mock
        dependencies, and the logic is much more readable and approachable for
        developers who are not familiar with it.
      </p>
      <CodeBlock language="jsx">
        <div>Hello</div>
      </CodeBlock>
      <CodeBlock language="typescript">
        {function test() {
          const test: string = "This is a test";
          return test;
        }}
      </CodeBlock>
      <CodeBlock language="css">{`.test {
 color: red;
}`}</CodeBlock>
    </>
  ),
};
