#!/bin/bash

# Call the Node.js script to fetch the schema
node ./scripts/fraia-codegen/fetch-model-schema.js

# Call the codegen script
cat ./scripts/fraia-codegen/temp-schema.json | npx json2ts > ./src/api/models.d.ts


# Remove the temp schema file
rm ./scripts/fraia-codegen/temp-schema.json
