#!/usr/bin/env bash

# mask1@test -> should be ignored because it's disabled in db
# mask2@test -> should be allowed because it's enabled in db
# mask3@test -> should be inserted in db as new and enabled
# mask1@test3 -> should be ignored because it's disabled in db (and no email should thus get sent to this user)
# mask1@invaliduser -> should be ignored because user does not exist (and no email should thus get sent to this user)
# mask2@invaliduser -> should be ignored because user does not exist (and no email should thus get sent to this user)

swaks --from hello@msk.sh --server 127.0.0.1 "$@"


