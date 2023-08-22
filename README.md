# Log Retention Rate Limit Exceeded test project

Test project to reproduce rate limit exceeded errors for CDK stacks that deploy a lot of Lambdas with a custom log retention resource.

Project deploys 5 identical stacks, each containing 25 Lambda functions.

## Commands

Note: The deploy shell scripts assume you specify an AWS profile to run with.

 * `npm install`              					Install dependencies
 * `npm run deploy -- <AWS_PROFILE>`    		Deploy stacks serial
 * `npm run deploy-parallel -- <AWS_PROFILE>`  	Deploy stacks in parallel
 * `npm run destroy -- <AWS_PROFILE>`          	Destroy stacks

## Issue details

The issue seems hard to reproduce when deploying the stacks in serial, but it is when doing it in parallel:

```
LogRetentionRateLimitStack3 |  57/183 | 11:34:35 AM | CREATE_FAILED        | Custom::LogRetention        | hello_11/LogRetention (hello11LogRetention0EC20DD0) Received response status [FAILED] from custom resource. Message returned: Rate exceeded (RequestId: b84c54c4-3053-487a-82b9-48671904d05a)
```