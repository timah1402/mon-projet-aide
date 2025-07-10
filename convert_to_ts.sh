#!/bin/bash

# Files/dirs to EXCLUDE (regex)
EXCLUDE="(node_modules|__tests__|babel|metro|jest|webpack|app|index).js$"

find . -type f -name "*.js" | grep -vE "$EXCLUDE" | while read -r file; do
  if grep -q -E '<[a-zA-Z]|/>' "$file"; then
    mv "$file" "${file%.js}.tsx"
  else
    mv "$file" "${file%.js}.ts"
  fi
  echo "Renamed: $file → ${file%.js}.ts(x)"
done