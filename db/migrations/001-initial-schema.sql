-- Up
CREATE TABLE Students (id INTEGER PRIMARY KEY, firstname TEXT, lastname TEXT);
CREATE TABLE Teachers (id INTEGER PRIMARY KEY, firstname TEXT , lastname TEXT );
CREATE TABLE Classes (id INTEGER PRIMARY KEY, name TEXT, code TEXT ,startdate TEXT ,enddate TEXT ,teacher_id INTEGER,FOREIGN KEY(teacher_id) REFERENCES Teachers(teacher_id));
CREATE TABLE Student_classes (class_id INTEGER, student_id INTEGER);
-- Down
DROP TABLE Students;
DROP TABLE Teachers;
DROP TABLE Classes;
DROP TABLE Student_classes;