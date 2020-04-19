deploy-server:
	docker build -t be-image .
	docker-compose up -d
