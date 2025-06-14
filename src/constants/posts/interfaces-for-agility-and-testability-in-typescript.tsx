import { CodeBlock } from "../../components/CodeBlock/CodeBlock";
import { BlogPost } from "../blogList";

export const interfacesForAgilityAndTestabilityInTypescript: BlogPost = {
  title: "Interfaces for Agility and Testability in TypeScript",
  description:
    "Learn how to use interfaces in TypeScript to enhance agility and testability in your code.",
  date: "06/12/2025",
  content: (
    <>
      <p>
        One of the most effective ways to design flexible, maintainable systems
        in TypeScript is to program to interfaces rather than concrete
        implementations. This principle not only enhances unit testability but
        also improves your application's agility—allowing you to substitute or
        evolve implementations without affecting dependent code.
      </p>
      <h3>Why Interfaces Matter</h3>
      By abstracting behavior behind interfaces, you decouple the what from the
      how. Consumers of the interface depend only on the contract, not on the
      implementation. This reduces the risk of introducing bugs during
      refactoring, and minimizes the blast radius when dependencies change. It
      also makes mocking for unit tests trivial, as you can easily provide stub
      implementations.
      <ol>
        <li>
          <strong>Decoupling:</strong> Interfaces allow you to decouple your
          business logic from specific implementations, making it easier to swap
          out components without breaking the system.
        </li>
        <li>
          <strong>Testability:</strong> By depending on interfaces, you can
          easily mock or stub implementations in unit tests, leading to faster
          and more reliable test suites.
        </li>
        <li>
          <strong>Agility:</strong> As requirements change, you can implement
          new features or modify existing ones without affecting the entire
          codebase.
        </li>
      </ol>
      <h3>Example Use Case: A Cache Interface</h3>
      <p>
        Let's say you have a caching mechanism that can be implemented in
        various ways (e.g., in-memory, Redis, etc.). By defining a cache
        interface, you can easily swap out implementations without affecting the
        rest of your application. Here’s a simple but practical example—a
        generic cache interface:
      </p>
      <CodeBlock language="typescript">
        {`      
  export interface ICache<T extends { [key: string]: any }> {
    initialize(): Promise<void>;
    populate(values: T[], getKey: (value: T) => string): Promise<void>;
    set(key: string, value: T): Promise<void>;
    getAll(): Promise<T[]>;
    getOrThrow(key: string): Promise<T>;
    getOrThrowAndRemove(key: string): Promise<T>;
    getOrNull(key: string): Promise<T | null>;
    removeOne(key: string): Promise<void>;
    removeMultiple(keys: string[]): Promise<void>;
    clear(): Promise<void>;
  }
`}
      </CodeBlock>
      <p>
        With this interface in place, we can create multiple implementations
        that conform to the same contract.
      </p>
      <h3>In-Memory Cache: Local Use or Testing</h3>
      <p>A fast, simple cache for local development or unit tests:</p>
      <CodeBlock language="typescript">
        {`
import { ICache } from "../interfaces/i-cache";

export class LocalCache<T extends { [key: string]: any }> implements ICache<T> {
  protected cache = new Map<string, T>();

  async initialize(): Promise<void> {}

  async populate(values: T[], getKey: (value: T) => string): Promise<void> {
    for (const value of values) {
      this.cache.set(getKey(value), value);
    }
  }

  async set(key: string, value: T): Promise<void> {
    this.cache.set(key, value);
  }

  async getAll(): Promise<T[]> {
    return Array.from(this.cache.values());
  }

  async getOrThrow(key: string): Promise<T> {
    const value = this.cache.get(key);
    if (!value) throw new Error(\`Key not found: \${key}\`);
    return value;
  }

  async getOrNull(key: string): Promise<T | null> {
    return this.cache.get(key) ?? null;
  }

  async getOrThrowAndRemove(key: string): Promise<T> {
    const value = await this.getOrThrow(key);
    this.cache.delete(key);
    return value;
  }

  async removeOne(key: string): Promise<void> {
    this.cache.delete(key);
  }

  async removeMultiple(keys: string[]): Promise<void> {
    for (const key of keys) {
      this.cache.delete(key);
    }
  }

  async clear(): Promise<void> {
    this.cache.clear();
  }

  async merge(values: T[], getKey: (value: T) => string): Promise<void> {
    for (const value of values) {
      const key = getKey(value);
      const existing = this.cache.get(key);
      this.cache.set(key, existing ? { ...existing, ...value } : value);
    }
  }
}
        `}
      </CodeBlock>
      <h3>Distributed Cache: Backed by Redis</h3>
      <p>A production-ready, Redis-backed implementation:</p>
      <CodeBlock language="typescript">
        {`
import { RedisClient } from "../dependencies/redis-client";
import { ICache } from "../interfaces/i-cache";

export class DistributedCache<T extends { [key: string]: any }> implements ICache<T> {
  constructor(private client: RedisClient, private cacheName: string) {}

  async initialize(cb?: () => Promise<void>): Promise<void> {
    if (!this.client.isOpen) {
      await this.client.connect();
    }
    if (cb) await cb();
  }

  async populate(values: T[], getKey: (value: T) => string): Promise<void> {
    for (const value of values) {
      try {
        await this.set(getKey(value), value);
      } catch {
        // optional: log or handle errors
      }
    }
  }

  async set(key: string, value: T): Promise<void> {
    await this.client.hSet(this.cacheName, key, JSON.stringify(value));
  }

  async getAll(): Promise<T[]> {
    const raw = await this.client.hGetAll(this.cacheName);
    return Object.values(raw).map(val =>
      typeof val === "string" ? JSON.parse(val) : val as T
    );
  }

  async getOrThrow(key: string): Promise<T> {
    const str = await this.client.hGet(this.cacheName, key);
    if (!str) throw new Error(\`Key not found: \${key}\`);
    return JSON.parse(str);
  }

  async getOrNull(key: string): Promise<T | null> {
    const str = await this.client.hGet(this.cacheName, key);
    return str ? JSON.parse(str) : null;
  }

  async getOrThrowAndRemove(key: string): Promise<T> {
    const value = await this.getOrThrow(key);
    await this.client.hDel(this.cacheName, key);
    return value;
  }

  async removeOne(key: string): Promise<void> {
    await this.client.hDel(this.cacheName, key);
  }

  async removeMultiple(keys: string[]): Promise<void> {
    await Promise.allSettled(keys.map(key => this.client.hDel(this.cacheName, key)));
  }

  async clear(): Promise<void> {
    await this.client.del(this.cacheName);
  }
}
 `}
      </CodeBlock>
      <h3>Flexibility In Implementation</h3>
      <p>
        Note that DistributedCache has a concrete Redis dependency, which is
        perfectly acceptable at the implementation level. If your architecture
        changes (e.g., switching from Redis to Memcached), you only need to
        change how the implementation is instantiated—not the code that consumes
        it.
      </p>
      <p>
        If you need to support multiple backends, your constructor could accept
        a union type like:
      </p>
      <CodeBlock language="typescript">
        {`
type CacheClient =
  | { type: "redis"; client: RedisClient }
  | { type: "memcached"; client: MemcachedClient };
        `}
      </CodeBlock>
      <p>
        This allows you to easily swap or expand your cache backends with
        minimal code changes.
      </p>
      <h3>Summary:</h3>
      <p>
        Interfaces are essential for building robust, testable, and adaptable
        software. Specifically:
      </p>
      <ul>
        <li>
          They enable mocking for unit testing without relying on heavy or
          stateful dependencies.
        </li>
        <li>
          They decouple consumers from implementations, reducing the impact of
          change.
        </li>
        <li>
          They improve agility and support scalability—whether you're swapping
          Redis for Memcached, or replacing local in-memory logic with
          distributed caching.
        </li>
      </ul>
      <p>
        By adhering to the principle of programming to interfaces, you can
        create systems that are not only easier to test but also more resilient
        to change. This is a key practice for any developer aiming for long-term
        maintainability and flexibility in their codebase. By leaning into
        interface-driven design, you future-proof your application and keep
        technical debt under control as your needs evolve.
      </p>
    </>
  ),
};
