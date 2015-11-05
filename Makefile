ORG = maestro
NAME = getwarm
SHA1 = $(shell git log -1 --pretty=oneline | cut -c-10)
BRANCH = $(shell git branch -a --contains $(SHA1) | egrep '(remotes/|\*)' | egrep -v "(HEAD|detached)" | head -1 | sed -e "s/\* //" -e "s/.*\///")
VERSION = $(BRANCH)-$(SHA1)
REGISTRY = registry.ticket-tool.com:5000

gulp-build:
	# Build the front static website
	npm install /Users/BoB/Prog/warm --save && npm install && gulp clean && gulp build

	# Generate info.json using current git sha1
	#../etc/bin/generate-info.sh dist/info.json

	# Copy the generated dist/ directory here to have it in the docker build context
	#rm -rf docker/dist && mv dist docker

gulp-build-cal:
	# Build the front static website
	npm install /Users/callum/Desktop/maestro-dev/warm --save && npm install && gulp clean && gulp build

	# Generate info.json using current git sha1
	#../etc/bin/generate-info.sh dist/info.json

	# Copy the generated dist/ directory here to have it in the docker build context
	#rm -rf docker/dist && mv dist docker


build: gulp-build
	cd docker && docker build --rm -t $(ORG)/$(NAME):${VERSION} .

	docker tag -f $(ORG)/$(NAME):${VERSION} $(ORG)/$(NAME):$(BRANCH)-latest

cal-build: gulp-build-cal
	cd docker && docker build --rm -t $(ORG)/$(NAME):${VERSION} .

	docker tag -f $(ORG)/$(NAME):${VERSION} $(ORG)/$(NAME):$(BRANCH)-latest

push:
	docker tag -f $(ORG)/$(NAME):${VERSION} $(REGISTRY)/$(ORG)/$(NAME):${VERSION}
	docker tag -f $(ORG)/$(NAME):${VERSION} $(REGISTRY)/$(ORG)/$(NAME):$(BRANCH)-latest
	docker push $(REGISTRY)/$(ORG)/$(NAME)
