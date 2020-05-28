#!/usr/bin/env node
import * as cdk from '@aws-cdk/core';
import { LogRetentionRateLimitStack } from '../lib/log-retention-rate-limit-stack';

const app = new cdk.App();

for(let i=0; i<10; i++) {
  new LogRetentionRateLimitStack(app, `LogRetentionRateLimitStack${i}`);
}
