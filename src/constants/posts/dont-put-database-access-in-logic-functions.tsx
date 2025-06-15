import { BlogPost } from "../blogList";

export const dontPutDatabaseAccessInLogicFunctions: BlogPost = {
  title: "Don't Put Database Access in Logic Functions",
  description:
    "A guide on why you should avoid putting database access in logic functions.",
  date: "06/12/2025",
  content: (
    <>
      <p>
        As a senior developer, one consistent anti-pattern I've encountered
        across projects is embedding database access directly within business
        logic functions. While it may seem convenient in the short
        term—especially for smaller scripts or prototypes—this approach tends to
        introduce several long-term challenges that can significantly hinder
        maintainability, testability, and scalability.
      </p>
      <h3>Why It's An Anti-Pattern</h3>
      <ol>
        <li>Tight Coupling</li>
        <ul>
          <li>
            When database queries or ORM operations are placed directly inside
            logic functions, those functions become tightly coupled to the data
            layer. Any change in the database schema, query structure, or even
            the choice of data access technology (e.g., switching from raw SQL
            to an ORM or vice versa) now requires changes in multiple places
            across the codebase.
          </li>
          <li>
            This violates the Single Responsibility Principle (SRP), as the
            function is now responsible for both business logic and data access.
          </li>
        </ul>

        <li>Difficult To Test</li>
        <ul>
          <li>
            Logic functions that touch the database are harder to test in
            isolation. Unit testing such functions often requires a real or
            mocked database, introducing complexity and potential flakiness in
            test suites.
          </li>
          <li>
            Proper unit testing becomes impractical, leading developers to rely
            on integration tests, which are slower and harder to maintain.
            (Which is exactly what happened on my last project!)
          </li>
        </ul>

        <li>Reduced Reusability</li>
        <ul>
          <li>
            When business logic is intertwined with database access, it becomes
            less reusable. If you want to use the same logic in a different
            context (e.g., a different data source or a different type of
            query), you often have to duplicate code or refactor extensively.
          </li>
          <li>
            Business logic tightly bound to specific data sources is harder to
            reuse across different contexts—like switching between a SQL and
            NoSQL backend, or reusing logic in a microservice that only receives
            pre-processed data.
          </li>
        </ul>
        <li>Harder To Maintain</li>
        <ul>
          <li>
            As the codebase grows, locating and modifying database access logic
            embedded deep within application code becomes a tedious and
            error-prone process.
          </li>
          <li>
            It also discourages clear architectural boundaries, making it easier
            for accidental side effects to creep in.
          </li>
        </ul>
      </ol>
      <h3>Preferred Architecture: Separation Of Concerns</h3>
      <p>
        To avoid this anti-pattern, it's important to separate business logic
        from data access concerns. A typical layered or hexagonal architecture
        might include:
      </p>
      <ol>
        <li>
          Respository Pattern or Data Access Layer (DAL)
          <ul>
            <li>
              Utilizes a dedicated layer for data access that encapsulates all
              database interactions (queries, updates, deletes, etc.).
            </li>
            <li>
              This layer should expose clean, abstract methods like
              getUserById(id) or saveOrder(order) that the business logic can
              call without needing to know how the data is retrieved or stored.
            </li>
            <li>
              This allows you to change the underlying data access technology
              without affecting the business logic. For example, you can switch
              from a SQL database to a NoSQL database or even mock the data
              access layer for unit tests.
            </li>
            <li>
              Respository pattern is a common way to implement this layer, where
              repositories are responsible for data retrieval and persistence in
              a predictable pattern. Usually, the interfaces are similar and
              then implemented for different business entities.
            </li>
          </ul>
        </li>
        <li>
          Service/Domain/Business Logic Layer
          <ul>
            <li>
              Contains the core pure business logic of the application, which
              should be agnostic and unaware of how data is stored or retrieved
              (or whether it is even stored at all!!).
            </li>
            <li>
              This layer can call methods from the data access layer to perform
              operations, but it should not contain any direct database queries
              or ORM calls.
            </li>
          </ul>
        </li>
        <li>
          Presentation Layer (Controllers, APIs, etc.)
          <ul>
            <li>
              Responsible for handling user input, invoking the appropriate
              business logic methods, and returning responses.
            </li>
            <li>
              Should not contain any business logic or data access code. It
              should only coordinate between the service layer and the user
              interface.
            </li>
          </ul>
        </li>
      </ol>
      <h3>Benefits Of The Layered Approach</h3>
      <ul>
        <li>
          <strong>Maintainability:</strong> Changes in the data access layer
          don't affect business logic, making it easier to maintain and evolve
          the codebase.
        </li>
        <li>
          <strong>Testability:</strong> Business logic can be unit tested in
          isolation without needing a database, leading to faster and more
          reliable tests.
        </li>
        <li>
          <strong>Reusability:</strong> Business logic can be reused across
          different contexts or data sources without duplication.
        </li>
        <li>
          <strong>Scalability:</strong> The architecture can scale better as
          different layers can be optimized or replaced independently.
        </li>
      </ul>
      <h3>Summary (tl;dr)</h3>
      <p>
        Directly embedding database access in logic functions is a clear
        anti-pattern that compromises key software qualities. By embracing
        separation of concerns and clean architectural boundaries, developers
        can build systems that are easier to maintain, test, and evolve over
        time. For teams striving toward clean code and robust systems, this
        pattern is worth avoiding early and often.
      </p>
    </>
  ),
};
