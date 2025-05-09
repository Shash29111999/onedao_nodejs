execute below query to Roles table

INSERT INTO "Roles" (id, name, "createdAt", "updatedAt") VALUES
(2, 'admin', '2025-05-08 14:54:12.902976+05:30', '2025-05-08 14:54:12.902976+05:30'),
(3, 'viewer', '2025-05-08 14:54:12.902976+05:30', '2025-05-08 14:54:12.902976+05:30');

create .env file inside root directory of project and replace the correct values

POSTGRESQL_USERNAME=your_postgres_username
POSTGRESQL_PASSWORD=your_postgres_password
POSTGRESQL_DB=your_database_name
PORT=8080
JWT_SECRET=your_jwt_secret_key
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_app_password

