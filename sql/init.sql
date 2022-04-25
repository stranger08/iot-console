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
    ('admin@iotplatform.com', 'test', now(), 'admin', 'active'),
    ('andy.anderson@gmail.com', 'test', now(), 'user', 'active'),
    ('molly.parker@email.com', 'test', now(), 'user', 'active'),
    ('developer@iotplatform.com', 'test', now(), 'admin', 'active'),
    ('tester@iotplatform.com', 'test', now(), 'admin', 'active');


CREATE TABLE IF NOT EXISTS "projects" (
    "id" SERIAL,
    "name" VARCHAR(255) NOT NULL,
    "created_by" INT,
    "created_at" TIMESTAMP WITH TIME ZONE NOT NULL,
    PRIMARY KEY ("id")
);

INSERT INTO public."projects"("name", "created_by", "created_at") VALUES
    ('Home', 1, now()),
    ('Coffee Machine Provider', 1, now()),
    ('Weather agency', 1, now());

CREATE TABLE IF NOT EXISTS "project_users" (
    "project_id" INT,
    "user_id" INT
);

CREATE TABLE IF NOT EXISTS "devices" (
    "id" SERIAL,
    "user_id" INT,
    "group_id" INT,
    "project_id" INT,
    "name" VARCHAR(255) NOT NULL,
    "registeredAt" TIMESTAMP WITH TIME ZONE NOT NULL,
    "type" VARCHAR(20),
    "status" VARCHAR(20),
    PRIMARY KEY ("id"),
    CONSTRAINT fk_user
      FOREIGN KEY(user_id) 
	  REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS "device_telemetry" (
    "id" SERIAL,
    "device_id" INT,
    "name" VARCHAR(30),
    "data_ref" VARCHAR(30),
    CONSTRAINT fk_device
        FOREIGN KEY(device_id)
        REFERENCES devices(id)
);

CREATE TABLE IF NOT EXISTS "device_setting" (
    "id" SERIAL,
    "device_id" INT,
    "name" VARCHAR(30),
    "type" VARCHAR(30),
    "path" VARCHAR(30),
    "value" VARCHAR(30),
    CONSTRAINT fk_device
        FOREIGN KEY(device_id)
        REFERENCES devices(id)
);

CREATE TABLE IF NOT EXISTS "groups" (
    "id" SERIAL,
    "user_id" INT,
    "project_id" INT,
    "name" VARCHAR(255) NOT NULL,
    "registeredAt" TIMESTAMP WITH TIME ZONE NOT NULL,
    PRIMARY KEY ("id"),
    CONSTRAINT fk_user
      FOREIGN KEY(user_id) 
	  REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS "controls" (
    "id" SERIAL,
    "user_id" INT,
    "project_id" INT,
    "name" VARCHAR(255) NOT NULL,
    "registeredAt" TIMESTAMP WITH TIME ZONE NOT NULL,
    PRIMARY KEY ("id"),
    CONSTRAINT fk_user
      FOREIGN KEY(user_id) 
	  REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS "controls_conditions" (
    "id" SERIAL,
    "control_id" INT,
    "device_id" INT,
    "data_path" VARCHAR(30),
    "operator" VARCHAR(30),
    "value" VARCHAR(30),
    PRIMARY KEY ("id"),
    CONSTRAINT fk_control
        FOREIGN KEY(control_id)
        REFERENCES controls(id),
    CONSTRAINT fk_device
        FOREIGN KEY(device_id)
        REFERENCES devices(id)
);

CREATE TABLE IF NOT EXISTS "controls_actions" (
    "id" SERIAL,
    "control_id" INT,
    "device_id" INT,
    "setting_path" VARCHAR(30),
    "value" VARCHAR(30),
    PRIMARY KEY ("id"),
    CONSTRAINT fk_control
        FOREIGN KEY(control_id)
        REFERENCES controls(id),
    CONSTRAINT fk_device
        FOREIGN KEY(device_id)
        REFERENCES devices(id)
)