import { redactString, redactObject } from "./dist/index.js";

const input = "Email me at test@example.com and token sk_test_123456";

console.log("String:");
console.log(redactString(input));

console.log("\nObject:");
console.log(
  redactObject({
    email: "test@example.com",
    password: "secret123",
    nested: { token: "abc123" }
  })
);