 React.render(
        <CreateButton text="Post your blog" id="submitBlog" class="btn btn-info submitBlog"/>,
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
        <CreateBackButton class="btn btn-danger backButton"/>,
        document.getElementById('goBack')
    );