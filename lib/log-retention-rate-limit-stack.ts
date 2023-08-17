import { Duration, Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { LambdaIntegration, RestApi } from "aws-cdk-lib/aws-apigateway";
import { Code, Function, Runtime } from "aws-cdk-lib/aws-lambda";
import { RetentionDays } from "aws-cdk-lib/aws-logs";

export class LogRetentionRateLimitStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const api = new RestApi(this, "api", {
      deployOptions: {
        stageName: "dev",
      },
    });

    for (let i = 0; i < 25; i++) {
      const fn = new Function(this, `hello_${i}`, {
        runtime: Runtime.NODEJS_16_X,
        handler: "index.handler",
        code: Code.fromAsset("./lib/hello"),
        logRetention: RetentionDays.ONE_WEEK,
        logRetentionRetryOptions: {
          maxRetries: 8,
          base: Duration.millis(200),
        },
      });

      api.root
        .addResource(i.toString())
        .addMethod("GET", new LambdaIntegration(fn));
    }
  }
}
