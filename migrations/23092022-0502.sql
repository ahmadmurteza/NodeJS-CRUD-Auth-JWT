create table users_tab (
    id serial primary key,
    email varchar,
    password varchar
);

create table reflections_tab (
    id serial primary key,
    success varchar,
    low_point varchar,
    take_away varchar,
    owner_id int,
    created_date timestamp,
    modified_date timestamp,
    CONSTRAINT fk_users
        FOREIGN KEY(owner_id)
        REFERENCES users_tab(id)
)