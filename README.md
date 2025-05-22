# File Upload Service

A Node.js/TypeScript service for authenticated file uploads, background processing, and task tracking.

## How to Run Locally

1. **Clone the repository**
   git clone <https://github.com/siddhesh74/file_upload_service.git>
   cd file_upload_service
   Install dependencies:- npm install
   Run the app:- npm run dev
   For production:- npm run build, npm start

##Env:-

**Server**
PORT=8080
NODE_ENV=development

**Database**
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=cicd
DB_NAME=file_upload_service

**JWT**
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=1h

**File Storage**
UPLOAD_DIR=./uploads
MAX_FILE_SIZE=10485760 # 10MB
ALLOWED_FILE_TYPES=image/jpeg,image/png,application/pdf

#Design Choices:-
TypeORM for ORM.
Bull for background job queue (Redis required).
Multer for file uploads.
JWT for stateless authentication.
Express for REST API.
PostgreSQL as the main database.
