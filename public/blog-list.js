 React.render(
        <CreateButton text="Write a Blog" id="createButton" class="btn btn-success writeBlog"/>,
        document.getElementById('button')
    );


React.render(
  <BlogList url="/blogs/"/>,
  document.getElementById('content')
);