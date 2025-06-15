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
        <li>Tight Coupling To Frameworks and Libraries.</li>
        <IonText color="medium">
          <p style={{ fontSize: "0.9em", fontStyle: "italic" }}>
            Embedding logic in controllers or middleware binds your application
            logic to a specific web framework (e.g., Express, Fastify, NestJS).
            This makes refactoring more painful and can lock you into
            architectural decisions. By contrast, if your logic is encapsulated
            in independent service functions, migrating to a different runtime
            (such as AWS Lambda, Azure Functions, or even a different framework)
            becomes straightforward and low-risk. With web applications that I
            architect, the reason I have the router/controller have minimal
            responsibility other than receiving the request and invoking a
            service function is primarily because it provides agility to easily
            refactor. For example, suppose if I had a hosted Node.js/Express app
            that exploded in popularity and I wanted to convert to serverless
            functions like AWS Lambda or Azure Functions - this would be trivial
            and low-risk.
          </p>
        </IonText>
        <li>Inhibits Reusability and Sharing of Logic.</li>
        <IonText color="medium">
          <p style={{ fontSize: "0.9em", fontStyle: "italic" }}>
            Business logic often needs to be reused across different parts of an
            application—or even across different apps. If that logic is embedded
            in route handlers or middleware, it’s not portable. Keeping it in
            standalone, framework-agnostic functions or classes makes it much
            easier to reuse and test in isolation.
          </p>
        </IonText>
        <li>Violates the DRY Principle</li>
        <IonText color="medium">
          <p style={{ fontSize: "0.9em", fontStyle: "italic" }}>
            When logic is scattered across multiple controllers or middleware,
            it often leads to code duplication. This violates the DRY (Don't
            Repeat Yourself) principle, making the codebase harder to maintain.
            If you need to change a piece of logic, you may have to update it in
            multiple places, increasing the risk of bugs/inconsistencies when
            business requirements change.
          </p>
        </IonText>
      </ol>

      <strong>Well, What Should I Use Controllers/Middleware For?</strong>
      <p>
        Middleware and controllers play an important role—but their
        responsibilities should be narrowly defined. Here are appropriate use
        cases:
      </p>
      <strong>Middleware:</strong>
      <br />
      <br />
      <ul>
        <li>Logging: Capturing request and response details for monitoring.</li>
        <li>Rate limiting: Throttling requests to prevent abuse or overuse.</li>
        <li>CORS: Handling cross-origin resource sharing policies.</li>
        <li>
          Security: Validating tokens, checking permissions, etc. (e.g., JWT
          validation).
        </li>
        <li>
          Request parsing: Parsing JSON bodies, query parameters, etc, using
          Open API or Zod.
        </li>
        <li>
          Authentication: Parsing tokens and attaching the user to the request.
        </li>
        <li>
          Request transformation: Mapping or reshaping incoming data for
          backward compatibility.
        </li>
        <li>
          Dependency injection: Creating or gathering dependencies needed by the
          logic and/or data access layers.
        </li>
      </ul>
      <strong>Controllers/Routers:</strong>
      <br />
      <br />
      <ul>
        <li>Accept and route incoming requests.</li>
        <li>Delegate to appropriate service or domain-layer functions.</li>
        <li>Handle formatting of responses and status codes.</li>
      </ul>

      <h3>What's The Alternative?</h3>
      <p>
        In my opinion, logic should be separated from data access and 3rd party
        dependencies as much as possible. So I would say the logic functions
        should be pure functions without side effects such as pulling data from
        the database, etc. For more, see:
        <a
          href="https://github.com/kevinclarkadstech/ABAC-Authorization-Ideas"
          target="_blank"
        >
          https://github.com/kevinclarkadstech/ABAC-Authorization-Ideas
        </a>
        . If logic is kept separate from these things, AI can help writing unit
        tests (almost write themselves!!), the unit tests do not need to mock
        dependencies, and the logic is much more readable and approachable for
        developers who are not familiar with it...
      </p>
      <h3>Summary (tl;dr)</h3>
      <p>
        Avoiding logic in controllers or middleware isn't just about code
        cleanliness—it's about flexibility, testability, and long-term
        maintainability. As projects grow, well-defined boundaries between
        layers pay massive dividends in agility and developer productivity.
      </p>
      <CodeBlock language="html">
        {`
<!-- Don't do this -->
[ Request ] 
    ↓ 
[ Controller ] 
    ├── Validate Request 
    ├── Authenticate User
    ├── Fetch from DB 
    ├── Apply Business Logic 
        └── Return Response
        `}
      </CodeBlock>
      <CodeBlock language="html">
        {`
<!-- Do this instead -->
[ Request ]
    ↓
[ Middleware ]
    ├── Validate Request
    ├── Authenticate User
    └── Attach User to Request
[ Controller ]
    ├── Route Request
    └── Call Service Function
[ Service/Logic Layer ]
    ├── Apply Business Logic
    |── Call Data Access Layer (if needed)
[ Data Access Layer ]
    └── Interact With DB
        `}
      </CodeBlock>
      <CodeBlock language="typescript">
        {`${() => {
          const test = "test";
          return ``;
        }}`}
      </CodeBlock>
      <CodeBlock language="css">{`.test {
 color: red;
}`}</CodeBlock>
    </>
  ),
};
