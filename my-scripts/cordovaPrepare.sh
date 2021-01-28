#!/bin/bash

#${1} : platform, i.e. windows, ios, macos, android
#${2} : Product or not: Y

if [ "${2}" == "Y" ]; then
    touch dist/buildProd;
else
    rm dist/buildProd;
fi
cd cordova-test;
cordova prepare ${1}
cd ..