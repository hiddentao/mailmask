#!/usr/bin/env bash

# camo1@test -> should be ignored because it's disabled in db
# camo2@test -> should be allowed because it's enabled in db
# camo3@test -> should be inserted in db as new and enabled
# camo1@test3 -> should be ignored because it's disabled in db (and no email should thus get sent to this user)
# camo1@invaliduser -> should be ignored because user does not exist (and no email should thus get sent to this user)
# camo2@invaliduser -> should be ignored because user does not exist (and no email should thus get sent to this user)

swaks --to camo1@test.msk.sh,camo2@test.msk.sh,camo3@test.msk.sh,camo1@test3.msk.sh,camo1@invaliduser.msk.sh,camo2@invaliduser.msk.sh --server 127.0.0.1 "$@"

