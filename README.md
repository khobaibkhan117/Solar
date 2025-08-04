# Solar Project ☀️

A full-stack application with **React frontend**, **NestJS backend**, and **Kubernetes deployment** using Kind.

## 📂 Project Structure
- frontend/ → React app served via Nginx
- backend/ → NestJS API
- k8s/ → Kubernetes manifests

## 🚀 Setup

1. Clone repo:
   ```bash
   git clone <repo-url>
   cd solar
   ```

2. Copy environment variables:
   ```bash
   cp .env.sample .env
   ```

3. Start with Docker Compose:
   ```bash
   docker-compose up --build
   ```

4. Or deploy with Kubernetes:
   ```bash
   kubectl apply -f k8s/
   ```
