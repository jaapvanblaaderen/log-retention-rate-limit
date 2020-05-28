#!/bin/bash

mkdir -p "build-log"

deployStack() {
  stackName="LogRetentionRateLimitStack${1}"
  cdk deploy $stackName --profile main-dev --require-approval never &> "build-log/${stackName}.log"
}

for i in {1..5}
do
  deployStack $i &
done