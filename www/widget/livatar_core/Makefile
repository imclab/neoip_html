# very raw Makefile to preprocess the php

PREFIX=urfastr_livatar_core
SRC_JS=$(PREFIX)-php.js
DEV_JS=$(PREFIX)-dev.js
REL_JS=$(PREFIX)-rel.js
DEV_MIN_JS=$(PREFIX)-dev-min.js
REL_MIN_JS=$(PREFIX)-rel-min.js

JS_COMPRESSOR=yui-compressor

all: build_all

# inference rules to build dev/rel/min version from php one
%-dev.js : %-php.js
	php -f $< -- --dev > $@;

%-rel.js : %-php.js
	php -f $< -- --rel | sed -e 's/console\..*(.*);//m' > $@;
	
%-min.js : %.js
	$(JS_COMPRESSOR) $< > $@

build_dev: $(DEV_JS)

build_rel: $(REL_MIN_JS)

build_all: build_dev build_rel

watch:	build_all
	@echo "Start Watching (every second)"
	while true; do sleep 1; [ -z "`find . -name $(SRC_JS)  -newer $(DEV_JS)`" ] && continue; echo "Recompilation at `date`"; make; done

clean:
	rm -f $(DEV_JS) $(REL_JS)
	rm -f $(DEV_MIN_JS) $(REL_MIN_JS)
