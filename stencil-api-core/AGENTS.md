# AGENTS.md (NestJS + Prisma Edition)

You are an expert in TypeScript, NestJS 11+, and Prisma ORM. You write functional, maintainable, and performant server-side code following NestJS architectural best practices.

## TypeScript & Decorator Best Practices
- **Strict Typing:** Use strict type checking. Avoid `any`; use `unknown` for uncertain types.
- **Immutability:** Always use `readonly` for injected dependencies and DTO properties.
- **Metadata:** Ensure all DTOs use `class-validator` and `class-transformer`. Use `@Type(() => Number)` for query parameters to ensure correct type casting.

## NestJS Architecture & Injection
- **Property-based Injection:** Use the `@Inject()` decorator directly on class properties to reduce constructor boilerplate.
  > **Example:** > ```typescript
  > @Inject(PrismaService)
  > private readonly prismaService: PrismaService;
  > ```
- **Modular Design:** Follow the "One Feature, One Module" rule. Encapsulate related Controllers, Services, and Providers.
- **Global Pipes:** Always use a global `ValidationPipe` with `transform: true`, `whitelist: true`, and `forbidNonWhitelisted: true`.
- **Interceptors:** Use `ClassSerializerInterceptor` globally to manage sensitive data exposure via `@Exclude()` and `@Expose()`.

## Controllers & Routing
- **Method Decorators:** Use specific HTTP decorators (`@Get`, `@Post`, etc.) and a clear versioning strategy (e.g., `@Version('1')`).
- **Response Handling:** Do NOT use the `@Res()` decorator unless streaming files. Let Nest handle the response lifecycle for better testability.
- **DTOs:** Every POST/PUT/PATCH request MUST have a dedicated DTO file. Never use the Database Entity directly as a request body.

## Services & Logic
- **Single Responsibility:** Services contain business logic only. Use Custom Decorators (e.g., `@CurrentUser()`) to extract request data instead of passing the whole `@Req()` object to services.
- **Error Handling:** Use built-in `HttpException` classes (e.g., `ConflictException`, `NotFoundException`). Do not throw generic `Error` objects.
- **Async Safety:** All database or I/O operations must return `Promise<T>`. Always use `await` to handle errors correctly.

## State & Lifecycle
- **Singleton Scoping:** Default to `Scope.DEFAULT`. Avoid `Scope.REQUEST` unless multi-tenancy is strictly required.
- **Lifecycle Hooks:** Use `onModuleInit` or `onApplicationBootstrap` for setup; avoid heavy logic in class constructors.
- **Environment:** Use `@nestjs/config`. Validate your `.env` variables using a validation schema (Joi or Zod).

## Database & Persistence (Prisma)
- **Repository Pattern:** Wrap Prisma calls in dedicated services or repositories to decouple domain logic from the database layer.
- **Transactions:** Use `prisma.$transaction([])` for atomic operations involving multiple tables.
- **Soft Deletes:** Implement a `deletedAt` field and use Prisma Middlewares or Extensions to filter out deleted records by default.

## Testing Requirements
- **Unit Tests:** Every service must have a `.spec.ts` file. Use `@golevelup/ts-jest` for deep mocking.
- **E2E Tests:** All public