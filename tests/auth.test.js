import { describe, it, expect, vi } from "vitest";
import request from "supertest";
import app from "../src/index.js";

vi.mock("../src/db.js", () => ({
  supabase: {
    auth: {
      signUp: vi.fn().mockResolvedValue({
        data: { user: { id: "123" }, session: { access_token: "token" } },
        error: null,
      }),
      signInWithPassword: vi.fn().mockResolvedValue({
        data: { user: { id: "123" }, session: { access_token: "token" } },
        error: null,
      }),
    },
  },
  supabaseAdmin: {
    from: vi.fn().mockReturnThis(),
    insert: vi.fn().mockReturnThis(),
    select: vi.fn().mockReturnThis(),
    eq: vi.fn().mockReturnThis(),
    single: vi.fn().mockResolvedValue({
      data: { id: "123", email: "test@test.com" },
      error: null,
    }),
  },
}));

describe("Auth API Endpoints", () => {
  it("should fail registration without required fields (Zod Validation)", async () => {
    const res = await request(app).post("/auth/registerCandidate").send({
      email: "invalidemail",
    });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("error", "Validation Error");
    expect(res.body.details).toBeInstanceOf(Array);
  });

  it("should mock a successful candidate registration", async () => {
    const res = await request(app).post("/auth/registerCandidate").send({
      full_name: "Test Candidate",
      email: "test@test.com",
      password: "password123",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
  });

  it("should fail login without required fields", async () => {
    const res = await request(app).post("/auth/loginCandidate").send({
      email: "test@test.com",
    });

    expect(res.statusCode).toBe(400);
    expect(res.body.details).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ path: ["body", "password"] }),
      ]),
    );
  });

  it("should mock a successful login", async () => {
    const res = await request(app).post("/auth/loginCandidate").send({
      email: "test@test.com",
      password: "password123",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
  });
});
