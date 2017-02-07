#!/bin/bash

TRAVIS_BUILD_NUMBER=$1
JOB_NUMBER=$2
TEST_TYPE=$3
TRAVIS_BUILD_DIR=$4
TRAVIS_BRANCH=$5
TRAVIS_PULL_REQUEST_BRANCH=$6

echo "received args"
echo ${TRAVIS_BUILD_NUMBER} ${JOB_NUMBER} ${TEST_TYPE} ${TRAVIS_BUILD_DIR} ${TRAVIS_BRANCH} ${TRAVIS_PULL_REQUEST_BRANCH}

COVERAGE_DIR=${TRAVIS_BUILD_DIR}/test

if [ ${TEST_TYPE} == "FUNC" ]; then
  ZIP_REPORT_NAME=".coverage-func.zip";
else
  ZIP_REPORT_NAME=".coverage-unit.zip";
  (cd ${COVERAGE_DIR} && zip -r .coverage-unit) > ${COVERAGE_DIR}/${ZIP_REPORT_NAME}
fi

if [ ! -e ${COVERAGE_DIR}/${ZIP_REPORT_NAME} ]; then
  echo "Cannot find the report at path $COVERAGE_DIR/$ZIP_REPORT_NAME";
  exit 1
fi

if [ -n ${TRAVIS_PULL_REQUEST_BRANCH+x} ] && [ ! ${TRAVIS_PULL_REQUEST_BRANCH} -eq "" ]; then
    BRANCH=${TRAVIS_PULL_REQUEST_BRANCH}
else
    BRANCH=${TRAVIS_BRANCH}
fi

#mv ${COVERAGE_DIR}/${ZIP_REPORT_NAME} ${TRAVIS_BUILD_DIR}/.travis
#REPORT_NAME=BRANCH-${BRANCH}-BUILD-${TRAVIS_BUILD_NUMBER}-JOB-${JOB_NUMBER}-OF-${TESTS_COUNT}.zip
#mv ${TRAVIS_BUILD_DIR}/.travis/${ZIP_REPORT_NAME} ${TRAVIS_BUILD_DIR}/.travis/${REPORT_NAME}
COVERALLS_SERVICE_NAME="travis-ci"
COVERALLS_REPO_TOKEN=7s05KDqmPWkwZ6nzU5WtznKkt5FKDE3kv
COVERALLS_PARALLEL=true
COVERALLS_SERVICE_JOB_ID=JOB_NUMBER

echo unzip from ${COVERAGE_DIR}/${ZIP_REPORT_NAME} to ${COVERAGE_DIR}/.coverage

unzip ${COVERAGE_DIR}/${ZIP_REPORT_NAME} -d ${COVERAGE_DIR}/.coverage
ls  ${TRAVIS_BUILD_DIR}/node_modules
ls ${TRAVIS_BUILD_DIR}/node_modules/coveralls
ls ${TRAVIS_BUILD_DIR}/node_module/.bin
cat ${COVERAGE_DIR}/.coverage/lcov.info | ${TRAVIS_BUILD_DIR}/node_modules/coveralls/bin/coveralls.js

echo ${COVERAGE_DIR}/.coverage/lcov.info "SEND TO COVERALLS"
