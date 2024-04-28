import { expect } from "chai";
import jwt from "jsonwebtoken";
import sinon from "sinon";

import authMiddleware from "../middleware/is_auth.js";

describe("Auth Middleware", () => {
  it("should throw an error if no authorization header is present", () => {
    const req = {
      get: (_headerName) => {
        return null;
      },
    };

    const result = authMiddleware(req, {}, () => {});
    expect(result).to.be.an("error");
    expect(result).to.have.property("statusCode", 401);
    expect(result).to.have.property("message", "Not authenticated.");
  });

  it("should throw an error if the authorization header is only one string", () => {
    const req = {
      get: (_headerName) => {
        return "xyz";
      },
    };

    const result = authMiddleware(req, {}, () => {});
    expect(result).to.have.property("statusCode", 500);
  });

  it("should yield a userId after decoding the token", () => {
    const req = {
      get: (_headerName) => {
        return "Bearer djfkalsdjfaslfjdlas";
      },
    };

    sinon.stub(jwt, "verify");
    jwt.verify.returns({ userId: "abc" });

    authMiddleware(req, {}, () => {});
    expect(req).to.have.property("userId");
    expect(req).to.have.property("userId", "abc");
    expect(jwt.verify.called).to.be.true;

    jwt.verify.restore();
  });

  it("should throw an error if the token cannot be verified", () => {
    const req = {
      get: (_headerName) => {
        return "Bearer xyz";
      },
    };

    const result = authMiddleware(req, {}, () => {});
    expect(result).to.have.property("statusCode", 500);
  });
});
