#!/bin/bash

mkdir -p "build-log"

for i in {1..5}
do
  stackName="LogRetentionRateLimitStack${i}"
  cdk deploy $stackName --profile $1 --require-approval never &> "build-log/serial-deploy-${stackName}.log"
done