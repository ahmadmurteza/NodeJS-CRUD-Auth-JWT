const pool = require("./../config/connection");

pool.query(
	`
create table users_tab (
    id serial primary key,
    email varchar,
    password varchar
);
`,
	(err, res) => {
		if (err) throw "Cannot create users table";
		pool.query(
			`create table reflections_tab (
            id serial primary key,
            success varchar,
            low_point varchar,
            take_away varchar,
            owner_id int,
            created_date timestamp,
            modified_date timestamp,
            constraint fk_users
                foreign key (owner_id),
                references users_tab(id)
        );`,
			(err, res) => {
				if (err) throw "Cannot create reflections table";
			}
		);
	}
);

module.exports = pool;
