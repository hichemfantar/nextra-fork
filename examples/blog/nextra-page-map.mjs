export const pageMap = [{
  name: "page",
  route: "/page",
  frontMatter: {
    "sidebarTitle": "Page",
    "type": "page",
    "title": "About",
    "date": new Date(1577836800000)
  }
}, {
  name: "posts",
  route: "/posts",
  children: [{
    name: "aaron-swartz-a-programmable-web",
    route: "/posts/aaron-swartz-a-programmable-web",
    children: [{
      name: "page",
      route: "/posts/aaron-swartz-a-programmable-web/page",
      frontMatter: {
        "sidebarTitle": "Page",
        "title": "Notes on A Programmable Web by Aaron Swartz",
        "date": "2016/5/21",
        "description": "At the time when I was getting into web development, I had the chance to read one of the most inspiring book about the web, Aaron Swartz's A Programmable Web. And it completely changed my mind.",
        "tag": "web development",
        "author": "Shu"
      }
    }]
  }, {
    name: "callout",
    route: "/posts/callout",
    children: [{
      name: "page",
      route: "/posts/callout/page",
      frontMatter: {
        "sidebarTitle": "Page",
        "title": "Callout",
        "date": "2023/5/15",
        "description": "En example of using the Callout component in your blog.",
        "tag": "web development",
        "author": "Tristan Dubbeld"
      }
    }]
  }, {
    name: "code-blocks",
    route: "/posts/code-blocks",
    children: [{
      name: "page",
      route: "/posts/code-blocks/page",
      frontMatter: {
        "sidebarTitle": "Page",
        "title": "Code blocks",
        "date": "2022/7/29",
        "description": "En example of using code blocks in your blog.",
        "tag": "web development,JavaScript,GraphQL,C++,Java,React,Next.js,The Guild,MacBook Pro",
        "author": "Dimitri POSTOLOV"
      }
    }]
  }, {
    name: "draft",
    route: "/posts/draft",
    children: [{
      name: "page",
      route: "/posts/draft/page",
      frontMatter: {
        "sidebarTitle": "Page",
        "title": "Draft",
        "date": "2023/6/28",
        "description": "An example of a draft post.",
        "draft": true,
        "tag": "web development",
        "author": "Ada Lovelace"
      }
    }]
  }, {
    name: "page",
    route: "/posts/page",
    frontMatter: {
      "sidebarTitle": "Page",
      "type": "posts",
      "title": "Random Thoughts",
      "date": new Date(1578009600000)
    }
  }, {
    name: "table",
    route: "/posts/table",
    children: [{
      name: "page",
      route: "/posts/table/page",
      frontMatter: {
        "sidebarTitle": "Page",
        "title": "Table",
        "date": "2022/8/28",
        "description": "En example of using table.",
        "tag": "web development",
        "author": "Dimitri POSTOLOV"
      }
    }]
  }]
}, {
  name: "tags",
  route: "/tags",
  children: []
}];