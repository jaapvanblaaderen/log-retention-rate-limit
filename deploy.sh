#!/bin/bash
for i in {1..5}
do
  stackName="LogRetentionRateLimitStack${i}"
  cdk deploy $stackName --profile main-dev --require-approval never
done