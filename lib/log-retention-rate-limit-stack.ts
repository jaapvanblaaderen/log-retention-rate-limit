import * as cdk from '@aws-cdk/core';
import { Function, Runtime, Code } from '@aws-cdk/aws-lambda';
import { RestApi, LambdaIntegration } from '@aws-cdk/aws-apigateway';
import logs = require('@aws-cdk/aws-logs');

export class LogRetentionRateLimitStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const api = new RestApi(this, 'api', {
      deployOptions: {
        stageName: 'dev'
      }
    });

    for (let i=0; i<25; i++) {
      const fn = new Function(this, `hello_${i}`, {
        runtime: Runtime.NODEJS_12_X,
        handler: 'index.handler',
        code: Code.asset('./lib/hello'),
        logRetention: logs.RetentionDays.ONE_WEEK,
      });
  
      api.root.addResource(i.toString()).addMethod('GET', new LambdaIntegration(fn));
    }
  }
}
