#!/bin/bash

# ONICLOTH Store Docker Scripts
# Usage: ./docker-scripts.sh [command]

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to check if Docker is running
check_docker() {
    if ! docker info > /dev/null 2>&1; then
        print_error "Docker is not running. Please start Docker and try again."
        exit 1
    fi
}

# Function to build the Docker image
build_image() {
    print_status "Building Docker image..."
    docker build -t onicloth-store .
    print_success "Docker image built successfully!"
}

# Function to run development environment
run_dev() {
    print_status "Starting development environment..."
    print_warning "Husky is disabled in Docker for development"
    docker-compose -f docker-compose.dev.yml --profile dev up --build
}

# Function to run production environment
run_prod() {
    print_status "Starting production environment..."
    docker-compose --profile prod up --build -d
    print_success "Production environment started!"
    print_status "Application is running at http://localhost:3000"
}

# Function to run production with nginx
run_prod_nginx() {
    print_status "Starting production environment with nginx..."
    docker-compose --profile prod-nginx up --build -d
    print_success "Production environment with nginx started!"
    print_status "Application is running at http://localhost:80"
}

# Function to stop all containers
stop_all() {
    print_status "Stopping all containers..."
    docker-compose down
    docker-compose -f docker-compose.dev.yml down
    print_success "All containers stopped!"
}

# Function to clean up Docker resources
cleanup() {
    print_status "Cleaning up Docker resources..."
    docker-compose down -v --remove-orphans
    docker-compose -f docker-compose.dev.yml down -v --remove-orphans
    docker system prune -f
    print_success "Cleanup completed!"
}

# Function to view logs
logs() {
    if [ -z "$2" ]; then
        docker-compose logs -f
        docker-compose -f docker-compose.dev.yml logs -f
    else
        docker-compose logs -f "$2"
        docker-compose -f docker-compose.dev.yml logs -f "$2"
    fi
}

# Function to execute commands inside the container
exec() {
    if [ -z "$2" ]; then
        print_error "Please specify a service name (e.g., app-dev, app-prod)"
        exit 1
    fi
    docker-compose exec "$2" sh
}

# Function to show status
status() {
    print_status "Container status:"
    docker-compose ps
    docker-compose -f docker-compose.dev.yml ps
}

# Function to rebuild without cache
rebuild() {
    print_status "Rebuilding without cache..."
    docker-compose build --no-cache
    docker-compose -f docker-compose.dev.yml build --no-cache
    print_success "Rebuild completed!"
}

# Function to show help
show_help() {
    echo "ONICLOTH Store Docker Scripts"
    echo ""
    echo "Usage: $0 [command]"
    echo ""
    echo "Commands:"
    echo "  build           Build the Docker image"
    echo "  dev             Start development environment (Husky disabled)"
    echo "  prod            Start production environment"
    echo "  prod-nginx      Start production environment with nginx"
    echo "  stop            Stop all containers"
    echo "  cleanup         Clean up Docker resources"
    echo "  logs [service]  View logs (all services or specific service)"
    echo "  exec <service>  Execute commands inside a container"
    echo "  status          Show container status"
    echo "  rebuild         Rebuild without cache"
    echo "  help            Show this help message"
    echo ""
    echo "Notes:"
    echo "  - Husky is automatically disabled in Docker containers"
    echo "  - Development uses docker-compose.dev.yml"
    echo "  - Production uses docker-compose.yml"
    echo ""
    echo "Examples:"
    echo "  $0 dev                    # Start development"
    echo "  $0 prod                   # Start production"
    echo "  $0 logs app-dev           # View development logs"
    echo "  $0 exec app-dev           # Access development container"
}

# Main script logic
case "$1" in
    "build")
        check_docker
        build_image
        ;;
    "dev")
        check_docker
        run_dev
        ;;
    "prod")
        check_docker
        run_prod
        ;;
    "prod-nginx")
        check_docker
        run_prod_nginx
        ;;
    "stop")
        stop_all
        ;;
    "cleanup")
        cleanup
        ;;
    "logs")
        logs "$@"
        ;;
    "exec")
        exec "$@"
        ;;
    "status")
        status
        ;;
    "rebuild")
        check_docker
        rebuild
        ;;
    "help"|"--help"|"-h"|"")
        show_help
        ;;
    *)
        print_error "Unknown command: $1"
        echo ""
        show_help
        exit 1
        ;;
esac 