DIST_DIR = ./dist
SRC_DIR = src
BUILD_DIR = build

# Used to lint scripts
RHINO ?= java -jar ${BUILD_DIR}/js.jar

# Compression
YUI_COMPRESSOR = ${BUILD_DIR}/yuicompressor.jar
COMPRESS ?= java -jar ${YUI_COMPRESSOR} --preserve-semi

# Version
SEXY_VER = $(shell cat version.txt)
VER = sed s/@VERSION/${SEXY_VER}/

# Packages
SEXY_STANDALONE = Sexy
SEXY_STANDALONE_JS = ${DIST_DIR}/${SEXY_STANDALONE}.js
SEXY_STANDALONE_MIN = ${DIST_DIR}/${SEXY_STANDALONE}.min.js
SEXY_STANDALONE_MODULES = ${SRC_DIR}/intro.js\
	${SRC_DIR}/sexy.js\
	${SRC_DIR}/css.js\
	${SRC_DIR}/jquery.ajax.js

SEXY_SLIM_STANDALONE = Sexy-slim
SEXY_SLIM_STANDALONE_JS = ${DIST_DIR}/${SEXY_SLIM_STANDALONE}.js
SEXY_SLIM_STANDALONE_MIN = ${DIST_DIR}/${SEXY_SLIM_STANDALONE}.min.js
SEXY_SLIM_STANDALONE_MODULES = ${SRC_DIR}/intro.js\
	${SRC_DIR}/sexy-slim.js\
	${SRC_DIR}/jquery.ajax.js

SEXY_JQUERY = jquery.Sexy
SEXY_JQUERY_JS = ${DIST_DIR}/${SEXY_JQUERY}.js
SEXY_JQUERY_MIN = ${DIST_DIR}/${SEXY_JQUERY}.min.js
SEXY_JQUERY_MODULES = ${SRC_DIR}/intro.js\
	${SRC_DIR}/sexy.js\
	${SRC_DIR}/css.js\
	${SRC_DIR}/plugin-outro.js

SEXY_SLIM_JQUERY = jquery.Sexy-slim
SEXY_SLIM_JQUERY_JS = ${DIST_DIR}/${SEXY_SLIM_JQUERY}.js
SEXY_SLIM_JQUERY_MIN = ${DIST_DIR}/${SEXY_SLIM_JQUERY}.min.js
SEXY_SLIM_JQUERY_MODULES = ${SRC_DIR}/intro.js\
	${SRC_DIR}/sexy-slim.js\
	${SRC_DIR}/css.js\
	${SRC_DIR}/plugin-outro.js

all: init build lint min
	@@echo "Sexy build complete."

init:
  @@echo "Making distribution directory:" ${DIST_DIR}
	@@mkdir -p ${DIST_DIR}

build:
	@@echo "Building:" ${SEXY_STANDALONE_JS}
	@@cat ${SEXY_STANDALONE_MODULES} | \
	  sed s/@SCRIPT/${SEXY_STANDALONE}/ | \
	  ${VER} > ${SEXY_STANDALONE_JS};
	@@echo "Building:" ${SEXY_SLIM_STANDALONE_JS}
	@@cat ${SEXY_SLIM_STANDALONE_MODULES} | \
    sed s/@SCRIPT/${SEXY_SLIM_STANDALONE}/ | \
	  ${VER} > ${SEXY_SLIM_STANDALONE_JS};
	@@echo "Building:" ${SEXY_JQUERY_JS}
	@@cat ${SEXY_JQUERY_MODULES} | \
    sed s/@SCRIPT/${SEXY_JQUERY}/ | \
	  ${VER} > ${SEXY_JQUERY_JS};
	@@echo "Building:" ${SEXY_SLIM_JQUERY_JS}
	@@cat ${SEXY_SLIM_JQUERY_MODULES} | \
    sed s/@SCRIPT/${SEXY_SLIM_JQUERY}/ | \
	  ${VER} > ${SEXY_SLIM_JQUERY_JS};

lint:
	@@echo "Checking Sexy against JSLint..."
	@@${RHINO} ${BUILD_DIR}/jslint-check.js

min:
	@@echo "Minimizing:" ${SEXY_STANDALONE_MIN}
	@@${COMPRESS} -o ${SEXY_STANDALONE_MIN} ${SEXY_STANDALONE_JS}
	@@echo "Minimizing:" ${SEXY_SLIM_STANDALONE_MIN}
	@@${COMPRESS} -o ${SEXY_SLIM_STANDALONE_MIN} ${SEXY_SLIM_STANDALONE_JS}
	@@echo "Minimizing:" ${SEXY_JQUERY_MIN}
	@@${COMPRESS} -o ${SEXY_JQUERY_MIN} ${SEXY_JQUERY_JS}
	@@echo "Minimizing:" ${SEXY_SLIM_JQUERY_MIN}
	@@${COMPRESS} -o ${SEXY_SLIM_JQUERY_MIN} ${SEXY_SLIM_JQUERY_JS}

.PHONY: all build lint min init
