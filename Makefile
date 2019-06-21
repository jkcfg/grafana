.PHONY: dist clean gen test

all: dist

dist:
	npx tsc
	cp README.md LICENSE package.json @jkcfg/grafana

clean:
	rm -rf @jkcfg
