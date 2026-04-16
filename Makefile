# --- Configs ---
COMPOSE = docker-compose
DOCKER_BUILDKIT=1

.PHONY: fresh update clean rebuild rebuild-db rebuild-server rebuild-client logs-db logs-server logs-client help

# --- Help ---
help:
	@echo "Usage:"
	@echo "  make fresh            - starts fresh installation"
	@echo "  make update           - updates the containers"
	@echo "  make clean            - removes all containers"
	@echo "  make stop             - stops all containers"
	@echo "  make rebuild          - rebuilds the containers"
	@echo "  make rebuild-db       - rebuilds the db container"
	@echo "  make rebuild-server   - rebuilds the server container"
	@echo "  make rebuild-client   - rebuilds the client container"
	@echo "  make logs-db 	       - tails the db logs"
	@echo "  make logs-server 	   - tails the server logs"	
	@echo "  make logs-client    	 - tails the client logs"

# --- Maintenance ---

fresh:
	$(COMPOSE) down -v
	$(COMPOSE) up -d --build

update:
	$(COMPOSE) pull
	$(COMPOSE) up -d

clean:
	$(COMPOSE) down --rmi all --volumes --remove-orphans

stop:
	$(COMPOSE) down -v

# --- Rebuilds ---

rebuild:
	$(COMPOSE) up -d --build

rebuild-db:
	$(COMPOSE) up -d --build db

rebuild-server:
	$(COMPOSE) up -d --build server

rebuild-client:
	$(COMPOSE) up -d --build client

# --- Logs ---

logs-db:
	$(COMPOSE) logs -f db

logs-server:
	$(COMPOSE) logs -f server

logs-client:
	$(COMPOSE) logs -f client
