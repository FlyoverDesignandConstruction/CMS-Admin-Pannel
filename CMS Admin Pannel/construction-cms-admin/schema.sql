CREATE DATABASE IF NOT EXISTS construction_cms
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE construction_cms;

CREATE TABLE IF NOT EXISTS users (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(190) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('admin', 'editor') NOT NULL DEFAULT 'admin',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS home_banners (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(190) NOT NULL,
  subtitle TEXT NULL,
  button_text VARCHAR(80) NULL,
  button_link VARCHAR(255) NULL,
  image_url VARCHAR(500) NULL,
  sort_order INT NOT NULL DEFAULT 1,
  status ENUM('active', 'inactive') NOT NULL DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_home_banners_status (status),
  INDEX idx_home_banners_order (sort_order)
);

CREATE TABLE IF NOT EXISTS company_profiles (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  headline VARCHAR(190) NOT NULL,
  summary TEXT NULL,
  mission TEXT NULL,
  vision TEXT NULL,
  years_experience INT NOT NULL DEFAULT 0,
  status ENUM('active', 'inactive') NOT NULL DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_company_profiles_status (status)
);

CREATE TABLE IF NOT EXISTS services (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(160) NOT NULL,
  summary TEXT NULL,
  icon_name VARCHAR(80) NULL,
  sort_order INT NOT NULL DEFAULT 1,
  status ENUM('active', 'inactive') NOT NULL DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_services_status (status),
  INDEX idx_services_order (sort_order)
);

CREATE TABLE IF NOT EXISTS projects (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(190) NOT NULL,
  category VARCHAR(120) NULL,
  location VARCHAR(160) NULL,
  client_name VARCHAR(160) NULL,
  completion_year INT NULL,
  image_url VARCHAR(500) NULL,
  summary TEXT NULL,
  status ENUM('active', 'inactive') NOT NULL DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_projects_status (status),
  INDEX idx_projects_category (category),
  INDEX idx_projects_year (completion_year)
);

CREATE TABLE IF NOT EXISTS testimonials (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  client_name VARCHAR(160) NOT NULL,
  client_role VARCHAR(160) NULL,
  quote_text TEXT NOT NULL,
  rating TINYINT UNSIGNED NOT NULL DEFAULT 5,
  status ENUM('active', 'inactive') NOT NULL DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_testimonials_status (status)
);

CREATE TABLE IF NOT EXISTS blog_posts (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(190) NOT NULL,
  slug VARCHAR(190) NOT NULL UNIQUE,
  excerpt TEXT NULL,
  body LONGTEXT NULL,
  published_at DATE NULL,
  status ENUM('published', 'draft') NOT NULL DEFAULT 'draft',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_blog_posts_status (status),
  INDEX idx_blog_posts_published_at (published_at)
);

CREATE TABLE IF NOT EXISTS contact_information (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  office_name VARCHAR(160) NOT NULL,
  address TEXT NULL,
  phone VARCHAR(80) NULL,
  email VARCHAR(190) NULL,
  map_url VARCHAR(500) NULL,
  facebook_url VARCHAR(500) NULL,
  linkedin_url VARCHAR(500) NULL,
  status ENUM('active', 'inactive') NOT NULL DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_contact_information_status (status)
);

CREATE TABLE IF NOT EXISTS contact_messages (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  sender_name VARCHAR(160) NOT NULL,
  sender_email VARCHAR(190) NULL,
  phone VARCHAR(80) NULL,
  subject VARCHAR(190) NULL,
  message TEXT NOT NULL,
  status ENUM('new', 'read', 'replied') NOT NULL DEFAULT 'new',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_contact_messages_status (status),
  INDEX idx_contact_messages_created_at (created_at)
);

INSERT INTO users (id, name, email, password_hash, role)
VALUES
  (1, 'CMS Admin', 'admin@constructco.example', '$2y$10$replace_with_real_hash', 'admin')
ON DUPLICATE KEY UPDATE
  name = VALUES(name),
  role = VALUES(role);

INSERT INTO home_banners (id, title, subtitle, button_text, button_link, image_url, sort_order, status)
VALUES
  (1, 'Building Strong Foundations', 'Commercial and residential construction delivered with practical planning.', 'View Projects', '/projects', 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=900&q=80', 1, 'active'),
  (2, 'Modern Project Management', 'From site preparation to finishing work, every stage stays visible.', 'Our Services', '/services', 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=80', 2, 'active')
ON DUPLICATE KEY UPDATE
  title = VALUES(title),
  subtitle = VALUES(subtitle),
  button_text = VALUES(button_text),
  button_link = VALUES(button_link),
  image_url = VALUES(image_url),
  sort_order = VALUES(sort_order),
  status = VALUES(status);

INSERT INTO company_profiles (id, headline, summary, mission, vision, years_experience, status)
VALUES
  (1, 'Reliable Construction Partner Since 2010', 'ConstructCo manages building, renovation, and civil works for private and commercial clients.', 'Deliver durable projects with clear communication, disciplined safety, and accountable teams.', 'Become the most trusted regional construction company for long-life building projects.', 16, 'active')
ON DUPLICATE KEY UPDATE
  headline = VALUES(headline),
  summary = VALUES(summary),
  mission = VALUES(mission),
  vision = VALUES(vision),
  years_experience = VALUES(years_experience),
  status = VALUES(status);

INSERT INTO services (id, name, summary, icon_name, sort_order, status)
VALUES
  (1, 'Commercial Building', 'Planning and construction for offices, showrooms, warehouses, and mixed-use spaces.', 'building', 1, 'active'),
  (2, 'Renovation Works', 'Structural improvement, interior upgrades, exterior repair, and phased renovation support.', 'hammer', 2, 'active')
ON DUPLICATE KEY UPDATE
  name = VALUES(name),
  summary = VALUES(summary),
  icon_name = VALUES(icon_name),
  sort_order = VALUES(sort_order),
  status = VALUES(status);

INSERT INTO projects (id, name, category, location, client_name, completion_year, image_url, summary, status)
VALUES
  (1, 'Riverside Office Complex', 'Commercial', 'Yangon', 'Riverside Group', 2025, 'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=900&q=80', 'Five-floor office facility with reinforced concrete structure and energy-conscious facade.', 'active'),
  (2, 'North Gate Residential Villas', 'Residential', 'Mandalay', 'North Gate Estate', 2024, 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80', 'Residential villa project with site utilities, road access, and landscape coordination.', 'active')
ON DUPLICATE KEY UPDATE
  name = VALUES(name),
  category = VALUES(category),
  location = VALUES(location),
  client_name = VALUES(client_name),
  completion_year = VALUES(completion_year),
  image_url = VALUES(image_url),
  summary = VALUES(summary),
  status = VALUES(status);

INSERT INTO testimonials (id, client_name, client_role, quote_text, rating, status)
VALUES
  (1, 'Aung Min', 'Property Developer', 'The team kept the project schedule clear and solved site issues quickly.', 5, 'active')
ON DUPLICATE KEY UPDATE
  client_name = VALUES(client_name),
  client_role = VALUES(client_role),
  quote_text = VALUES(quote_text),
  rating = VALUES(rating),
  status = VALUES(status);

INSERT INTO blog_posts (id, title, slug, excerpt, body, published_at, status)
VALUES
  (1, 'How We Prepare a Site Before Construction', 'site-preparation-before-construction', 'A short look at surveying, utilities, access planning, and safety preparation.', 'Good construction starts before concrete is poured. Site preparation includes surveys, access planning, drainage checks, and safety controls.', '2026-05-20', 'published')
ON DUPLICATE KEY UPDATE
  title = VALUES(title),
  excerpt = VALUES(excerpt),
  body = VALUES(body),
  published_at = VALUES(published_at),
  status = VALUES(status);

INSERT INTO contact_information (id, office_name, address, phone, email, map_url, facebook_url, linkedin_url, status)
VALUES
  (1, 'Main Office', 'No. 45 Industrial Road, Yangon', '+95 9 123 456 789', 'info@constructco.example', 'https://maps.google.com', 'https://facebook.com', 'https://linkedin.com', 'active')
ON DUPLICATE KEY UPDATE
  office_name = VALUES(office_name),
  address = VALUES(address),
  phone = VALUES(phone),
  email = VALUES(email),
  map_url = VALUES(map_url),
  facebook_url = VALUES(facebook_url),
  linkedin_url = VALUES(linkedin_url),
  status = VALUES(status);

INSERT INTO contact_messages (id, sender_name, sender_email, phone, subject, message, status)
VALUES
  (1, 'Mya Thet', 'mya@example.com', '+95 9 222 333 444', 'Warehouse construction estimate', 'Please send information about your commercial warehouse construction service.', 'new')
ON DUPLICATE KEY UPDATE
  sender_name = VALUES(sender_name),
  sender_email = VALUES(sender_email),
  phone = VALUES(phone),
  subject = VALUES(subject),
  message = VALUES(message),
  status = VALUES(status);
