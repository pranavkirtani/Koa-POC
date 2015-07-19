 React.render(
        <CreateButton text="Submit blog" id="submitBlog"/>,
        document.getElementById('button')
    );



React.render(
  <BlogTitleField/>,
  document.getElementById('title')
);


React.render(
  <BlogContentField/>,
  document.getElementById('content')
);

 React.render(
        <CreateBackButton/>,
        document.getElementById('goBack')
    );