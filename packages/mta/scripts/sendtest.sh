#!/usr/bin/env bash

# camo1@test -> should be ignored because it's disabled in db
# camo2@test -> should be allowed because it's enabled in db
# camo3@test -> should be inserted in db as new and enabled
# camo1@test3 -> should be ignored because it's disabled in db (and no email should thus get sent to this user)
# camo1@invaliduser -> should be ignored because user does not exist (and no email should thus get sent to this user)
# camo2@invaliduser -> should be ignored because user does not exist (and no email should thus get sent to this user)

swaks --to camo1@test.cml.pw,camo2@test.cml.pw,camo3@test.cml.pw,camo1@test3.cml.pw,camo1@invaliduser.cml.pw,camo2@invaliduser.cml.pw --server 127.0.0.1

