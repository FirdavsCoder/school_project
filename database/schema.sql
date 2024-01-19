
CREATE TYPE role_type AS ENUM
('admin', 'parent', 'student', 'teacher');
CREATE TYPE sex_type AS ENUM
('male', 'female');


create TABLE brands
(
    id serial PRIMARY KEY,
    name VARCHAR(128) UNIQUE not null,
    is_public boolean DEFAULT true
);

create TABLE schools
(
    id serial PRIMARY KEY,
    name VARCHAR(128) not null,
    address VARCHAR(256) DEFAULT NULL,
    latitude numeric default null,
    longitude numeric default null,
    phone int
    [] DEFAULT null,
    brand_id int not null,
    constraint fk_brand_id foreign key
    (brand_id) references brands
    (id)
);
    create TABLE users
    (
        id serial PRIMARY KEY,
        login VARCHAR(32) unique not null,
        password text not null,
        role role_type not null,
        sex sex_type default null,
        first_name varchar(64) not null,
        last_name varchar(64) not null,
        address VARCHAR(256) DEFAULT NULL,
        latitude numeric default null,
        longitude numeric default null,
        phone int
        [] DEFAULT null,
    group_id int default null,
    brand_id int not null,
    constraint fk_brand_id foreign key
        (brand_id) references brands
        (id)
);
        create TABLE user_parents
        (
            id serial PRIMARY KEY,
            child_id int not null,
            parent_id int not null,
            constraint fk_child_id foreign key (child_id) references users(id),
            constraint fk_parent_id foreign key (parent_id) references users(id)
        );
        create TABLE rooms
        (
            id serial PRIMARY KEY,
            number int default null,
            name varchar(32) default null,
            floor int default null,
            capacity int default null,
            school_id int not null,
            constraint fk_school_id foreign key (school_id) references schools(id)
        );

        create TABLE subjects
        (
            id serial PRIMARY KEY,
            name varchar(32) not null,
            brand_id int not null,
            constraint fk_brand_id foreign key (brand_id) references brands(id)

        );
        create TABLE groups
        (
            id serial PRIMARY KEY,
            name varchar(64) not null,
            brand_id int not null,
            head_teacher_id int not null,
            room_id int default null,
            constraint fk_brand_id foreign key (brand_id) references brands(id),
            constraint fk_head_teacher_id foreign key (head_teacher_id) references users(id),
            constraint fk_room_id foreign key (room_id) references rooms(id)
        );
        create TABLE teacher_subjects
        (
            id serial PRIMARY KEY,
            teacher_id int not null,
            subject_id int not null,
            constraint fk_teacher_id foreign key (teacher_id) references users(id),
            constraint fk_subject_id foreign key (subject_id) references subjects(id)
        );
        create TABLE lessons
        (
            id serial PRIMARY KEY,
            teacher_id int not null,
            subject_id int not null,
            group_id int not null,
            room_id int not null,
            start_time timestamp not null ,
            end_time timestamp not null ,
            started_time timestamp default null ,
            ended_time timestamp default null ,
            constraint fk_teacher_id foreign key (teacher_id) references users(id),
            constraint fk_group_id foreign key (group_id) references groups(id),
            constraint fk_subject_id foreign key (subject_id) references subjects(id)

        );

        alter table  users add  constraint fk_group_id foreign key (group_id) references groups(id);
