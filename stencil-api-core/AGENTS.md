# AGENTS.md (NestJS Edition)

You are an expert in TypeScript, NestJS, and scalable backend architecture. You write functional, maintainable, and performant server-side code following NestJS and architectural best practices.

## TypeScript & Decorator Best Practices
- Use strict type checking.
- Prefer type inference when the type is obvious.
- Avoid the `any` type; use `unknown` for uncertain types.
- **Always use `readonly`** for injected dependencies to ensure immutability.
- **Metadata:** Ensure all DTOs use `class-validator` and `class-transformer` decorators.

## NestJS Architecture
- **Dependency Injection:** Use the `inject()` function instead of constructor injection for cleaner, more readable classes (NestJS 11+ style).
- **Modular Design:** Follow the "One Feature, One Module" rule. Encapsulate related Controllers, Services, and Providers.
- **Global Pipes:** Always use a global `ValidationPipe` with `whitelist: true` and `forbidNonWhitelisted: true`.
- **Custom Decorators:** Do NOT access the `@Req()` object directly in services. Use custom decorators (e.g., `@CurrentUser()`) to extract data from the request.

## Controllers & Routing
- **Method Decorators:** Use specific HTTP decorators (`@Get`, `@Post`, etc.) and ensure a clear versioning strategy (e.g., `@Version('1')`).
- **Response Handling:** Do NOT use the `@Res()` decorator unless streaming files. Let Nest handle the response lifecycle to keep code testable.
- **DTOs:** Every POST/PUT request MUST have a dedicated DTO file. Never use the Entity/Model directly as a request body.

## Services & Logic
- **Single Responsibility:** Services should contain business logic only; keep controllers thin.
- **Error Handling:** Use built-in `HttpException` classes (e.g., `ConflictException`, `UnprocessableEntityException`). Do not throw generic `Error` objects.
- **Async Safety:** All database or I/O operations must return `Promise<T>`. Ensure `await` is used correctly to avoid unhandled rejections.

## State & Lifecycle
- **Singleton Scoping:** Default to `Scope.DEFAULT`. Avoid `Scope.REQUEST` unless multi-tenancy is strictly required, as it impacts performance.
- **Lifecycle Hooks:** Use `onModuleInit` or `onApplicationBootstrap` for setup logic; do not put heavy logic in class constructors.
- **Environment:** Use `@nestjs/config`. Never hardcode strings or numbers that should be environment variables.

## Database & Persistence
- **Repository Pattern:** Wrap database calls in repositories or dedicated services to keep the domain logic decoupled from the ORM.
- **Transactions:** Use the native ORM transaction utility rather than manual connection management.

## Testing Requirements
- **Unit Tests:** Every service must have a `.spec.ts` file using `Test.createTestingModule`.
- **E2E Tests:** All public API endpoints must have a corresponding test in the `test/` folder using `supertest`.
- **Mocks:** Use `@golevelup/ts-jest` for creating deep mocks of dependencies during testing.