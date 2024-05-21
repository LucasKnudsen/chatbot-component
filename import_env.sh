#!/bin/bash

# Define the environment name
ENV=$1
PROFILE=$2

# Check if environment name is provided
if [ -z "$ENV" ]; then
  echo "Usage: $0 <env-name> <profile-name>"
  exit 1
fi

# Check if profile name is provided
if [ -z "$PROFILE" ]; then
  echo "Usage: $0 <env-name> <profile-name>"
  exit 1
fi

# Define the path to the team-provider-info.json
TEAM_PROVIDER_INFO="./amplify/team-provider-info.json"

# Check if the team-provider-info.json file exists
if [ ! -f "$TEAM_PROVIDER_INFO" ]; then
  echo "Error: $TEAM_PROVIDER_INFO not found!"
  exit 1
fi

PROVIDER_CONFIG=$(jq -r ".$ENV" "$TEAM_PROVIDER_INFO")

echo $PROVIDER_CONFIG

AWS_CONFIG="{\
\"configLevel\":\"project\",\
\"useProfile\":true,\
\"profileName\":\"$PROFILE\"\
}"

# Import the environment
amplify env import \
  --name "$ENV" \
  --config "$PROVIDER_CONFIG" \
  --awsInfo "$AWS_CONFIG" \
  --yes