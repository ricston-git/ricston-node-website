#!/bin/bash
echo -n 'DEBUG=info,debug nodemon ricston-node-website.js ' && echo "$@" && DEBUG=info,debug nodemon ricston-node-website.js "$@"
