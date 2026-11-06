
# Xenia

A full-stack social application inspired by Twitter and Threads. Xenia lets people share short posts and images, discover other users, and follow conversations through likes, comments, and activity notifications.

[Live demo](https://xenia-virid.vercel.app/) · [Repository](https://github.com/Pourixa/Xenia)

## Main features

- **Posts and conversations:** publish posts of up to 280 characters with up to four images, add emojis, like or unlike posts, and leave comments. Visitors can browse the public feed without signing in.
- **Profiles and following:** search by name or username, follow people, switch between the public and following feeds, and browse a profile's posts, likes, and comments. Users can edit their name, username, bio, and avatar URL.
- **Accounts and activity:** register with email and password or sign in through GitHub. Follow, like, and comment events create notifications, with an unread count and automatic marking as read when the notifications page opens.

The interface includes mobile and desktop layouts, light and dark themes, and load-more pagination on feeds and several user lists.

## My contribution

I built Xenia independently as an assignment from **The Odin Project**. The course supplied the project brief; I designed and implemented the application rather than following a step-by-step implementation tutorial.

My work includes the React screens and their API integration, Express routes and controllers, the relational database schema, authentication flows, social interactions, image uploads, and notifications.

The project also uses existing tools and UI foundations: Vite for the React scaffold, shadcn-style components with Base UI primitives, Lucide icons, and Frimousse for emoji selection. These support the application-specific code rather than being components I wrote from scratch.

## Technical challenge: building the following feed

A following feed needs more than a list of posts. It must connect users to the accounts they follow, return those accounts' posts in order, and include enough information to render each post without separate requests for its author, counts, and like state.

Xenia models follows in a separate `followship` table. Each record connects a follower to a followed user, and a composite unique constraint prevents duplicate relationships. The API retrieves the followed user IDs and uses them to filter posts, returning the newest first in batches of 20.

Prisma queries also select author information, image URLs, like and comment counts, and likes belonging to the current viewer. The client turns that last result into an `isLiked` flag and appends subsequent pages through the load-more control. The public feed uses a similar response shape, allowing both feeds to share the post component.

See the [database schema](api/prisma/schema.prisma), [post controller](api/controllers/postController.js), and [home feed](client/src/routes/Home.jsx).

## Technology choices

| Technology | Role and fit |
| --- | --- |
| React and React Router | Reusable interactive components and nested routes for feeds, profiles, and post pages. |
| Vite | Frontend development server and production build tooling. |
| Tailwind CSS, Base UI, and shadcn | Styling and reusable interface primitives for forms, menus, tabs, and themes. |
| Node.js and Express | A separate JSON API, organized into routes, controllers, and middleware. |
| PostgreSQL and Prisma | Relational storage for users, follows, posts, likes, comments, and notifications, with migrations and database constraints. |
| JWT, bcrypt, and GitHub OAuth | Cookie-based authentication, password hashing, and an alternative GitHub sign-in flow. |
| Multer and Supabase Storage | Multipart image handling and hosted image storage, with image metadata linked to posts in PostgreSQL. |

## Project structure

- `client/src/routes/` — page components and nested profile views.
- `client/src/components/` — application components and reusable UI elements.
- `client/src/lib/` — API request helpers and shared utilities.
- `api/routes/` — endpoint definitions.
- `api/controllers/` — database operations and application behavior.
- `api/middleware/` — authentication, validation, uploads, and error handling.
- `api/prisma/` — schema, migrations, database client, and seed script.

## Run locally

You need a recent Node.js version compatible with the locked dependencies, npm, PostgreSQL, and a Supabase project for image storage. GitHub sign-in additionally requires a GitHub OAuth application.

### 1. Install dependencies

```bash
git clone https://github.com/Pourixa/Xenia.git
cd Xenia/api
npm ci
cd ../client
npm ci
```

### 2. Configure the API

Create `api/.env`:

```dotenv
DATABASE_URL=postgresql://USER:PASSWORD@HOST:5432/xenia
JWT_SECRET=replace-with-a-long-random-secret
CLIENT_URL=http://localhost:5173

PROJECT_URL=https://YOUR_PROJECT.supabase.co
API_KEY=YOUR_SERVER_SIDE_SUPABASE_KEY

GITHUB_CLIENT_ID=YOUR_GITHUB_CLIENT_ID
GITHUB_CLIENT_SECRET=YOUR_GITHUB_CLIENT_SECRET
GITHUB_CALLBACK_URL=http://localhost:8585/user/auth/github/callback
```

Create a Supabase Storage bucket named `Images`. The implementation uses public image URLs, so the bucket must allow public reads and the server key must have upload permission. Keep server credentials out of the client and version control.

For GitHub authentication, configure the OAuth application's callback URL to match `GITHUB_CALLBACK_URL`.

### 3. Configure the frontend

Create `client/.env`:

```dotenv
VITE_API_URL=http://localhost:8585
```

### 4. Prepare the database and start both applications

From `api/`:

```bash
npx prisma generate
npx prisma migrate deploy
node app.js
```

In another terminal, from `client/`:

```bash
npm run dev
```

The API listens on port **8585**. Open the frontend URL printed by Vite; its origin must match `CLIENT_URL`.

**Authentication configuration:** the current code sets cookies with `secure: true` and `sameSite: "none"` for cross-site deployment. Local sign-in may require HTTPS or a development-only cookie configuration appropriate to the local origins. Cookie options are currently set directly in the authentication controllers.

### Frontend checks

From `client/`:

```bash
npm run build
```

## Current limitations

- **Incomplete account and post management:** update/delete handlers exist, but their routes lack authentication wiring; post update/delete also pass string IDs to an integer-ID model. These are unfinished functionality.
- **Authentication and authorization need further hardening:** protected actions need explicit unauthenticated responses, notification read updates need receiver ownership checks, and GitHub OAuth needs state validation and consistent cookie options.
- **Limited notification and comment history:** notifications are fetched on page load, not pushed in real time. The notification list and a post's initial comments are capped at 20 without a load-more flow.
- **Uploads need stronger safeguards:** the API limits the number of images, but does not configure file-size limits or server-side image-type filtering. Post creation and external image uploads also need recovery handling for partial failures.
- **Testing and error handling:** no automated test suite or CI workflow is included. The shared error handler needs early returns after sending specific error responses.
- **Google sign-in is not implemented:** its button is explicitly disabled.

## Preview

<!-- Add a screenshot of the loaded application at docs/screenshots/home.png,
then replace the review note above with:
![Xenia home feed with image posts and navigation](docs/screenshots/home.png)
-->
![Xenia Post Page](/1_001.jpg)
---

Documentation based on the main branch at commit `725e406a0f47cec44bdd825b0a1bcaad4acdd584`. Features and setup were reviewed from source; the local setup and checks above were not executed during this documentation review.

