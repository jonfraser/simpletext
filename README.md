# simpletext blog
A simple to use text only blog using CloudFlare Workers and KV. I wanted to see if I could create a super basic blog engine with very little setup, writing effort, and writing distraction. Enter simpletext! Create a cloudflare worker and KV and start adding KV Pairs (blog entries) to get a free blog engine right on the cloudflare edge.

# Setup
1. Create a CloudFlare account (free plan works fine until your blog gets super popular)
2. Create a worker and leave the default text for the moment
4. Create a KV
3. Add a Binding to your KV from your Worker (via the Settings in the Worker) named "PAGES"
5. Paste the worker.js content from this project into your Worker (overwrite it all)
6. Update the top variables baseUrl, blogTitle, blogDescription
7. Save and deploy your worker

# Adding blog entries
Simply add KV Pairs into your KV. A few notes:
- At the moment the Key is convention-based and needs to be in the format yyyy-MM-dd\~blog-title (ie 2024-10-26\~My-First-Entry)
- The date gets extracted and split from the title by the tilde.
- The title is formatted by replacing the dashes with spaces
- Not following this format will break everything (probably)
- The Value can have whatever you want that is valid HTML. What you put is not being sanitised so take care

# Example
https://simpletext.bananaortaco.fun/
