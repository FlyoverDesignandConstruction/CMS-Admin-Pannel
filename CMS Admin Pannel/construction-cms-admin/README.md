# Construction Company CMS Admin Panel

This export demonstrates part of a content management system for a construction company website. It includes:

- HTML admin interface
- CSS dashboard styling
- JavaScript CRUD behavior
- SQL MySQL database schema and sample data
- Node.js + Express API backend

## Main CMS Sections

- Home Page Banners
- Company Profile
- Services
- Project Portfolio
- Testimonials
- News and Blog Posts
- Contact Information
- Contact Messages

## Run the Static Demo

Open this file in a browser:

```text
public/index.html
```

The admin panel works with sample data even if the backend is not running.

## Run with Node.js + Express and MySQL

1. Install dependencies:

```bash
npm install
```

2. Create the database:

```bash
mysql -u root -p < schema.sql
```

3. Copy the environment file:

```bash
cp .env.example .env
```

4. Start the server:

```bash
npm start
```

5. Open:

```text
http://localhost:3000
```

## Admin Workflow

The admin selects a content section, adds or edits records, saves changes, and the data is stored in MySQL through the Express API. The public construction website can then read active records from the same database.
