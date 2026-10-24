// Unit tests (npm test): the secret of the CMS "content changed" call.
import { test } from "node:test";
import assert from "node:assert/strict";
import { isRevalidateSecret } from "../server/utils/revalidate-secret.ts";

test("only the configured secret is accepted, and nothing without one", () => {
    assert.equal(isRevalidateSecret("s3cret-value", "s3cret-value"), true);
    assert.equal(isRevalidateSecret("s3cret-valuE", "s3cret-value"), false);
    assert.equal(isRevalidateSecret("short", "s3cret-value"), false);
    assert.equal(isRevalidateSecret("", "s3cret-value"), false);
    assert.equal(isRevalidateSecret(undefined, "s3cret-value"), false);
    assert.equal(isRevalidateSecret("anything", ""), false);
    assert.equal(isRevalidateSecret(null, null), false);
});
