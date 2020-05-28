# Log Retention Rate Limit Exceeded test project

Test project to reproduce rate limit exceeded errors for CDK stacks that deploy a lot of Lambdas with a custom log retention resource.

Project deploys 5 identical stacks, each containing 25 Lambda functions.

## Commands

Note: The deploy shell scripts assumes a configuration using an AWS profile named `main-dev`.

 * `npm install`              Install dependencies
 * `npm run build`            Compile typescript to js
 * `npm run deploy`           Deploy stacks sequentially
 * `npm run deploy-parallel`  Deploy stacks in parallel
 * `npm run destroy`          Destroy stacks

## Issue details

The issue seems hard to reproduce when deploying the stacks sequentially, but it is when doing it in parallel:

```
 128/101 | 9:04:29 AM | CREATE_IN_PROGRESS   | Custom::LogRetention        | hello_5/LogRetention (hello5LogRetention5D258C6A) Resource creation Initiated
 129/101 | 9:04:29 AM | CREATE_FAILED        | Custom::LogRetention        | hello_5/LogRetention (hello5LogRetention5D258C6A) Failed to create resource. Rate exceeded
	new LogRetention (/repos/logretention-rate-limit/node_modules/@aws-cdk/aws-lambda/lib/log-retention.ts:67:22)
	\_ new Function (/repos/logretention-rate-limit/node_modules/@aws-cdk/aws-lambda/lib/function.ts:537:28)
	\_ new LogRetentionRateLimitStack (/repos/logretention-rate-limit/lib/log-retention-rate-limit-stack.ts:17:18)
	\_ Object.<anonymous> (/repos/logretention-rate-limit/bin/log-retention-rate-limit.ts:8:3)
	\_ Module._compile (internal/modules/cjs/loader.js:1151:30)
	\_ Module.m._compile (/repos/logretention-rate-limit/node_modules/ts-node/src/index.ts:858:23)
	\_ Module._extensions..js (internal/modules/cjs/loader.js:1171:10)
	\_ Object.require.extensions.<computed> [as .ts] (/repos/logretention-rate-limit/node_modules/ts-node/src/index.ts:861:12)
	\_ Module.load (internal/modules/cjs/loader.js:1000:32)
	\_ Function.Module._load (internal/modules/cjs/loader.js:899:14)
	\_ Function.executeUserEntryPoint [as runMain] (internal/modules/run_main.js:71:12)
	\_ main (/repos/logretention-rate-limit/node_modules/ts-node/src/bin.ts:227:14)
	\_ Object.<anonymous> (/repos/logretention-rate-limit/node_modules/ts-node/src/bin.ts:513:3)
	\_ Module._compile (internal/modules/cjs/loader.js:1151:30)
	\_ Object.Module._extensions..js (internal/modules/cjs/loader.js:1171:10)
	\_ Module.load (internal/modules/cjs/loader.js:1000:32)
	\_ Function.Module._load (internal/modules/cjs/loader.js:899:14)
	\_ Function.executeUserEntryPoint [as runMain] (internal/modules/run_main.js:71:12)
	\_ /usr/local/lib/node_modules/npm/node_modules/libnpx/index.js:268:14

```