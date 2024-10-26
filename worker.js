
export default {
  async fetch (req, env, ctx) {
    const baseUrl = "https://simpletext.bananaortaco.fun";
    const blogTitle = "SimpleText BananaOrTaco";
    const blogDescription = "This is a simpletext RSS feed.";
    
    const url = new URL(req.url)
    const pre_head = `<html><head><meta name='viewport' content='width=device-width, initial-scale=1.0'><title>${blogTitle}</title></head><body style='font-family: Arial, sans-serif; margin: 10; padding: 0;'><h1>`;
    const pre_body = "</h1><p>";
    const end_it = "</p><p></br><a href='/'>Home</a> | <a href='/rss'>RSS</a></p></body></html>";
    const pagekeys = await env.PAGES.list();
     
    //we've hit the home
    if (req.method === 'GET' && url.pathname === '/') {
      var pageList = "";
      if(pagekeys.keys !== undefined && pagekeys.keys.length > 0){
        pagekeys.keys.forEach(element => {
          var prettyLink = element.name.substring(11).replaceAll('-',' ');
          pageList += "<a href='/"+element.name+"'>"+prettyLink+"</a> (" + element.name.substring(0,10) + ")</br></br>";
        });
      }
      return new Response(pre_head+blogTitle+pre_body+pageList+end_it, {
        headers: {
          "content-type": "text/html;charset=UTF-8",
        },
      });
    }

    //rss endpoint
    if (req.method === 'GET' && url.pathname === '/rss') {
      var pageList = "";
      if(pagekeys.keys !== undefined && pagekeys.keys.length > 0){
        pagekeys.keys.forEach(element => {
          var prettyLink = element.name.substring(11).replaceAll('-',' ');
          var postDate = element.name.substring(0,10);
          var postLink = "/"+element.name;

          var itemBlock = `<item>
          <title>${prettyLink}</title>
          <link>${baseUrl}${postLink}</link>
          <description>${prettyLink}</description>
          <pubDate>${postDate}</pubDate>
          <guid>${baseUrl}${postLink}</guid>
      </item>`;
          pageList += itemBlock;
        });
      }
      return new Response(`<?xml version="1.0" encoding="UTF-8" ?>
      <rss version="2.0">
        <channel>
          <title>${blogTitle}</title>
          <link>${baseUrl}</link>
          <description>${blogDescription}</description>
          <language>en-us</language>
          ${pageList}
        </channel>
      </rss>`, {
        headers: {
          "content-type": "text/xml;charset=UTF-8",
        },
      });
    }

    //must be on a specific page
    if(pagekeys.keys !== undefined && pagekeys.keys.length > 0){
      var foundPageTitle = 'Page not found'; //default
      const foundPageContent = await env.PAGES.get(url.pathname.substring(1));;
      if(foundPageContent !== null){
        foundPageTitle = url.pathname.substring(1).substring(11).replaceAll('-',' ');
      }
      
      return new Response(pre_head+foundPageTitle+pre_body+foundPageContent+end_it, {
          headers: {
          "content-type": "text/html;charset=UTF-8",
        },
      });
    }
    
  }
}
