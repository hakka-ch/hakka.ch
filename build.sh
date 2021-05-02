#!/bin/bash
npm install
npm run start &
sleep 5
hugo --minify
RET=$?
kill %1
exit $RET
