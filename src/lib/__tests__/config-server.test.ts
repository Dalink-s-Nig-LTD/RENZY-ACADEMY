import { describe, it, expect, vi, afterEach } from "vitest";
import { getServerConfig } from "../config.server";

describe("getServerConfig", () => {
  const originalEnv = process.env.NODE_ENV;

  afterEach(() => {
    process.env.NODE_ENV = originalEnv;
  });

  it("returns an object with nodeEnv property", () => {
    const config = getServerConfig();
    expect(config).toHaveProperty("nodeEnv");
  });

  it("reads NODE_ENV from process.env", () => {
    process.env.NODE_ENV = "production";
    const config = getServerConfig();
    expect(config.nodeEnv).toBe("production");
  });

  it("returns undefined for nodeEnv when NODE_ENV is not set", () => {
    delete process.env.NODE_ENV;
    const config = getServerConfig();
    expect(config.nodeEnv).toBeUndefined();
  });

  it("returns a fresh object on each call", () => {
    const a = getServerConfig();
    const b = getServerConfig();
    expect(a).not.toBe(b);
    expect(a).toEqual(b);
  });
});
