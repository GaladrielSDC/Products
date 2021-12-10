
CREATE TABLE Product (
  id SERIAL PRIMARY KEY,
  product_name text,
  slogan text,
  product_description text,
  category text,
  default_price integer not null
);
CREATE TABLE Feature (
  id SERIAL PRIMARY KEY,
  product_id INT not null,
  feature text,
  feature_value text,
  foreign key (product_id)
  references Product(id)
);
CREATE TABLE Photo (
  id SERIAL PRIMARY KEY,
  style_id INT not null,
  thumbnail_url text,
  photo_url text,
  foreign key (style_id)
  references Style(id)
);
CREATE TABLE Sku (
  id SERIAL PRIMARY KEY,
  style_id INT not null,
  size varchar(10),
  quantity int,
  foreign key (style_id)
  references Style(id)
);
CREATE TABLE related  (
  id SERIAL PRIMARY KEY,
  product_id INT not null,
  related_product_id INT not null default 0,
  foreign  key (product_id)
  references Product(id),
  foreign  key (related_product_id)
  references Product(id)
);

-- COPY photo  (id, style_id, thumbnail_url, photo_url)  FROM '/Users/makeda-davis/Projects/Products/db/photos.csv' DELIMITER ',' CSV HEADER;
