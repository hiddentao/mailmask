#!/usr/bin/env node

const { exec, TFVARS_JSON_PATH, TFVARS_ENC_PATH } = require('./utils')

exec(`openssl enc -aes-256-cbc -salt -in ${TFVARS_JSON_PATH} -out ${TFVARS_ENC_PATH}`)