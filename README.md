![Crowi](http://res.cloudinary.com/hrscywv4p/image/upload/c_limit,f_auto,h_900,q_80,w_1200/v1/199673/https_www_filepicker_io_api_file_VpYEP32ZQyCZ85u6XCXo_zskpra.png)

Crowi - Empower the team with sharing your knowledge.
================================================================


[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy?template=https://github.com/Omochice/crowi)

[![Circle CI](https://circleci.com/gh/crowi/crowi.svg?style=svg)](https://circleci.com/gh/crowi/crowi)
[![Docker Pulls](https://img.shields.io/docker/pulls/crowi/crowi.svg)](https://hub.docker.com/r/crowi/crowi)
[![Join the community on Spectrum](https://withspectrum.github.io/badge/badge.svg)](https://spectrum.chat/crowi)


Crowi is a **Markdown Wiki** like:

* Easy to edit and share,
* Markdown supported,
* Useful timeline list view,
* Fast.


Install
---------

Install dependencies and build CSS and JavaScript:

    $ npm install

More info is [here](https://github.com/crowi/crowi/wiki/Install-and-Configuration).

### ⚠️WARNING⚠️

Don't use `master` branch because it is unstable. Use released version except when you want to contribute to the project.


Dependencies
-------------

* Node.js 8.x
* MongoDB
* Elasticsearch 6.x (optional) ([Doc is here](https://github.com/crowi/crowi/wiki/Configure-Search-Functions))
* Redis (optional)
* Amazon S3 (optional)
* Google Project (optional)
* Slack App (optional)


Start Up on Local
-------------------

Crowi is designed to be set up on Heroku or some PaaS, but you can also start up Crowi with ENV parameter on your local.

```
$ PASSWORD_SEED=somesecretstring MONGO_URI=mongodb://username:password@localhost/crowi node app.js
```
or please write `.env`.

### Environment


* `PORT`: Server port. default: `3000`.
* `NODE_ENV`: `production` OR `development`.
* `MONGO_URI`: URI to connect to MongoDB. This parameter is also by `MONGOHQ_URL` OR `MONGOLAB_URI`.
* `REDIS_URL`: URI to connect to Redis (used for session store and socket.io). This parameter is also by `REDISTOGO_URL`.
* `ELASTICSEARCH_URI`: URI to connect to Elasticearch.
* `PASSWORD_SEED`: A password seed used by password hash generator.
* `SECRET_TOKEN`: A secret key for verifying the integrity of signed cookies.
* `FILE_UPLOAD`: `aws` (default), `local`, `none`

Optional:

* `MATHJAX`: If set `1`, enable MathJax feature.
* `PLANTUML_URI`: If set the url of PlantUML server, then enable PlantUML feature. e.g. `http://localhost:18080`.
* `ENABLE_DNSCACHE`: If set `true`, Use internal DNS cache for crowi in Linux VMs. (See also: [#407](https://github.com/crowi/crowi/pull/407))

see: [.env.sample](./.env.sample)

For develop
-------------

We can use docker-compose for develop without complicated settings.

```
$ docker-compose -f docker-compose.development.yml up
```

### Features

- Express restarts when a file changed
- webpack compiled assets automatically

#### When a trouble occured

Please try the following commands.

```
# Stop containers
$ docker-compose -f docker-compose.development.yml stop
# Remove containers
$ docker-compose -f docker-compose.development.yml rm
# Remove images
$ docker-compose -f docker-compose.development.yml images -q | xargs docker rmi -f
# Build images
$ docker-compose -f docker-compose.development.yml build
```

License
---------

* The MIT License (MIT)
* See LICENSE file.
