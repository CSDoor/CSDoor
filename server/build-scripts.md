CREATE TABLE "User" (
  "id"  serial  UNIQUE,
  "name"  varchar  NOT NULL  UNIQUE,
  "cohort"  integer  NOT NULL,
  "companyId"  integer  NOT NULL,
  "jobTitle"  varchar  NOT NULL,
  CONSTRAINT User_pk PRIMARY KEY ("id")
) WITH (
OIDS=FALSE
);

CREATE TABLE "Interviewquestion" (
  "id"  serial  UNIQUE,
  "companyId"  integer  NOT NULL,
  "type"  varchar  NOT NULL,
  "question"  varchar  NOT NULL  UNIQUE,
  "difficulty"  integer  NOT NULL,
  "createdBy"  integer NOT NULL,
  "date"  varchar  NOT NULL,
  "language"  varchar  NOT NULL,
  CONSTRAINT Interviewquestion_pk PRIMARY KEY ("id")
) WITH (
OIDS=FALSE
);

CREATE TABLE "Comments" (
  "id"  serial  UNIQUE,
  "difficulty"  integer  NOT NULL,
  "userId"  integer  NOT NULL,
  "text"  varchar  NOT NULL,
  "questionId"  integer NOT NULL,
  CONSTRAINT Comments_pk PRIMARY KEY ("id")
) WITH (
OIDS=FALSE
);

CREATE TABLE "Company" (
  "id"  serial  UNIQUE,
  "name"  varchar UNIQUE NOT NULL,
  CONSTRAINT Company_pk PRIMARY KEY ("id")
) WITH (
OIDS=FALSE
);

ALTER TABLE "User" ADD CONSTRAINT "User_fk0" FOREIGN KEY ("companyId") REFERENCES "Company"("id");

ALTER TABLE "Interviewquestion" ADD CONSTRAINT "Interviewquestion_fk0" FOREIGN KEY ("companyId") REFERENCES "Company"("id");

ALTER TABLE "Interviewquestion" ADD CONSTRAINT "Interviewquestion_fk1" FOREIGN KEY ("createdBy") REFERENCES "User"("id");

ALTER TABLE "Comments" ADD CONSTRAINT "Comments_fk0" FOREIGN KEY ("userId") REFERENCES "User"("id");

ALTER TABLE "Comments" ADD CONSTRAINT "Comments_fk1" FOREIGN KEY ("questionId") REFERENCES "Interviewquestion"("id");
