#!/usr/bin/env node

const fs = require('fs')

const { exec, TFVARS_JSON_PATH, TFVARS_ENC_PATH } = require('./utils')

exec(`openssl enc -d -aes-256-cbc -salt -in ${TFVARS_ENC_PATH} -out ${TFVARS_JSON_PATH}`)

const json = require(TFVARS_JSON_PATH)

json.pub_key = exec('echo ${HOME}/.ssh/id_rsa.pub')
json.pvt_key = exec('echo ${HOME}/.ssh/id_rsa')
json.ssh_fingerprint = exec('echo $(ssh-keygen -E md5 -lf ~/.ssh/id_rsa.pub | awk \'{ print $2 }\' | sed -e "s/^MD5://")')
json.trace_cloud_endpoint = `https://${exec('dig +short jaeger2.hiddentao.com')}/api/v2/spans`

fs.writeFileSync(TFVARS_JSON_PATH, JSON.stringify(json, null, 2), 'utf8')
