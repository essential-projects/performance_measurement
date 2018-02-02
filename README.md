# Performance Measurement

## Scripts

All of these scripts are reduced to their minimal implementation to allow for accurate performance measurements.
That means there will be no logging and the dependencies are kept at a minimum.

The options of the scripts can be applied via command line arguments.

### Seed Users

The script `seed_users.js` creates user entities in the database, based on the dummy entity found inside the script.

Option | Type | Description | Default
---------|----------|----------|---------
 host | string | Which host to use | http://localhost:8000
 repeat | number | How many users are to be seeded | 50

### Fetch Users

The script `fetch_users.js` fetches **ALL** user entities from the database.

Option | Type | Description | Default
---------|----------|----------|---------
 host | string | Which host to use | http://localhost:8000

### Clear Users

The script `clear_users.js` **deletes** **ALL** user entities from the database.

Option | Type | Description | Default
---------|----------|----------|---------
 host | string | Which host to use | http://localhost:8000
