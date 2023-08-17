#!/usr/bin/env node
import { App } from "aws-cdk-lib";
import { LogRetentionRateLimitStack } from "../lib/log-retention-rate-limit-stack";

const app = new App();

for (let i = 0; i < 10; i++) {
  new LogRetentionRateLimitStack(app, `LogRetentionRateLimitStack${i}`);
}
