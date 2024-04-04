#!/bin/bash

# Start npm run start in the background and capture its PID
npm run start | while IFS= read -r line; do
    echo "$line"
    if [[ "$line" == *"No issues found"* ]]; then
        echo "<=====================App started==================>"
        npm run test-integration
        break
    fi
done
