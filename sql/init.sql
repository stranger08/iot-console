CREATE TABLE IF NOT EXISTS "users" (
    "id"   SERIAL ,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255),
    "registeredAt" TIMESTAMP WITH TIME ZONE NOT NULL,
    "role" VARCHAR(20),
    "status" VARCHAR(20),
    PRIMARY KEY ("id")
);

INSERT INTO public."users"("email", "password", "registeredAt", "role", "status") VALUES
    ('andy.anderson@gmail.com', 'test', now(), 'user', 'active'),
    ('molly.parker@email.com', 'test', now(), 'user', 'active'),
    ('admin@iotplatform.com', 'test', now(), 'admin', 'active'),
    ('developer@iotplatform.com', 'test', now(), 'admin', 'active'),
    ('tester@iotplatform.com', 'test', now(), 'admin', 'active');

CREATE TABLE IF NOT EXISTS "devices" (
    "id"   SERIAL ,
    "name" VARCHAR(255) NOT NULL,
    "registeredAt" TIMESTAMP WITH TIME ZONE NOT NULL,
    "type" VARCHAR(20),
    "status" VARCHAR(20),
    "data" JSONB,
    "controls" JSONB,
    PRIMARY KEY ("id")
);
