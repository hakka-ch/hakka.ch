#!/bin/bash
npm install
npm run start &
sleep 5
hugo --minify
kill %1
