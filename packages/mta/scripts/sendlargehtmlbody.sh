#!/usr/bin/env bash

swaks --from hello@msk.sh --to ohyeah@test.msk.sh --server 127.0.0.1 --body ./scripts/large.html --add-header "MIME-Version: 1.0" --add-header "Content-Type: text/html"  "$@"