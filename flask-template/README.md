# Overview
This template provides a very basic Flask application. This is intended to provide a bare minimum set of files that is executable, and can be compiled into a functional docker image.

# Running locally with pip and flask
This project has been tested with python 3.
```
pip install -r requirements.txt
flask run
```

# Running with docker
To help ensure consistently correct startup across multiple platforms, you may choose to use Docker to containerize your application.  Installation steps for docker can be found on their main page.
https://docs.docker.com/engine/install/

With Docker installed, you can build your a new image. This build needs to be run after any changes are made to the source code.
```
docker build --tag=flask-template:latest .
```

After the image builds successfully, run a container from that image.
```
docker run -d --name flask-template -p5000:5000 flask-template:latest
```

Test the container has successfully started.
```
curl localhost:5000/
```

When you are done testing, stop the server and remove the container.
```
docker rm -f flask-template
```

# Running with docker-compose
```
docker-compose up --build
```