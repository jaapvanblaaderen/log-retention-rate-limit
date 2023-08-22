#!/bin/bash

mkdir -p "build-log"

deployStack() {
  stackName="LogRetentionRateLimitStack${2}"
  cdk deploy $stackName --output "cdk.out.${2}" --profile $1 --require-approval never &> "build-log/parallel-deploy-${stackName}.log"
}

for i in {1..5}
do
  deployStack $1 $i &
done