#!/bin/bash
for i in {1..5}
do
  stackName="LogRetentionRateLimitStack${i}"
  cdk destroy $stackName -f --profile $1
done