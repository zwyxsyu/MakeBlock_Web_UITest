git_version = $$(git branch 2>/dev/null | sed -e '/^[^*]/d'-e's/* \(.*\)/\1/')
npm_bin= $$(npm bin)

all: test
install:
	@npm install
test:
	@echo ""
	@echo "make test-ios             Test sample for iOS"
	@echo "make test-ios-safari      Test sample for iOS Safari"
	@echo "make test-android         Test sample for Android"
	@echo "make test-android-chrome  Test sample for Android Chrome"
	@echo "make test-pc              Test sample for PC"
test-ios: install
	macaca doctor
	platform=ios macaca run --verbose -d ./macaca-test/macaca-mobile-sample.test.js
test-ios-safari: install
	macaca doctor
	browser=safari macaca run --verbose -d ./macaca-test/macaca-mobile-browser-sample.test.js
test-android-chrome: install
	macaca doctor
	browser=chrome macaca run --verbose -d ./macaca-test/macaca-mobile-browser-sample.test.js
test-android: install
	macaca doctor
	platform=android macaca run --verbose -d ./macaca-test/macaca-mobile-sample.test.js
test-pc:
	macaca install chrome
	macaca doctor
	macaca run --verbose -d ./macaca-test/test-pc/*.test.js
travis-pc:
	${npm_bin}/macaca install chrome
	${npm_bin}/macaca doctor
	${npm_bin}/macaca run -d ./macaca-test/test-pc/*.test.js --no-window
travis: install travis-pc
	@echo travis passed
travis-android: install
	${npm_bin}/macaca install android
	${npm_bin}/macaca doctor
	platform=android ${npm_bin}/macaca run --verbose -d ./macaca-test/macaca-mobile-sample.test.js
travis-ios: install
	${npm_bin}/macaca install ios
	${npm_bin}/macaca doctor
	platform=ios ${npm_bin}/macaca run --verbose -d ./macaca-test/macaca-mobile-sample.test.js
jshint:
	@${npm_bin}/jshint .
.PHONY: test
