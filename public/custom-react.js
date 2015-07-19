 var Blog = React.createClass({
   
  render: function() {

    return (
    <div className="blogLinks">
      <a href={"/view/"+this.props.id}>
       {this.props.title}
       
      </a>
      </div>
     
    );
  }
});


var BlogList = React.createClass({


 getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  render: function() {
  
var html_to_add;
   if(this.state.data.length>0){
        html_to_add=<h3>Blogs available to read</h3>
   }
      else{
      html_to_add='';
      }
 var commentNodes = this.state.data.map(function (comment) {
      return (
        <Blog title={comment.title} text={comment.content} id={comment._id}>
        </Blog>
      );
    });    
    
    return (
      <div className="commentList">
        {html_to_add}
        {commentNodes}
      </div>
    );
    
    
    
  }
});



var CreateButton=React.createClass({
    
    
    
      componentDidMount: function() {
            //var id=this.props.id;
            $('#createButton').click(function(){
                window.location='/create';


            });
            $('#submitBlog').click(function(){

                var params={};
                params.title=$('#title input').val();
                params.content=$('#content textarea').val();
               // alert(params);
                $.ajax({
                          url: '/blogs',
                          cache: false,
                          method:'POST',
                          data:params,
                          success: function(data) {
                              alert('Blog created successfully!!!')
                           window.location='/';
                          }
                });
                
                

});
          
         
          
    
  },
    
    

render: function() {
    return (
   <button id={this.props.id} className={this.props.class} width>{this.props.text}</button>
     
    );
  }


});


var BlogContentField=React.createClass({
    
  
                                       

render:function(){
    
    
      
    var html_to_return;
    
    
    
     if(this.props.disabled){
      html_to_return=<textarea width="500px" height="200px" disabled></textarea>
    }
      else{
      html_to_return=<textarea width="500px" height="200px" className="blogContent" maxlength="6000" placeholder="Write your Blog here :)"></textarea>
      }

    return(
    
        html_to_return
    )

}
}) ;



var BlogTitleField=React.createClass({
    
    
    
    
    

render:function(){
    
    
    var html_to_return;
    
    
    
     if(this.props.disabled){
      html_to_return=<input type="text" width="500px" height="20px" className="blogTitle" disabled/>
    }
      else{
      html_to_return=<input type="text" width="500px" height="20px" className="blogTitle" placeholder="Enter the title for your blog"/>
      }

    return(
       
    html_to_return
    )

}
}) ;
    
    
    
var BlogViewableArea=React.createClass({
    
    
    
     getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
      var url = window.location.href;
      var url_to_hit=url.split('/view/')[1];
    $.ajax({
      url: '/blogs/'+url_to_hit,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
      
      var that=this;
        $('#comment').click(function(){
        
                var url = window.location.href;
                var id=url.split('/view/')[1];
                var params={};
                params.id=id;
                params.name=$('#name').val();
                params.body=$('#body').val();
                $.ajax({
                url: '/comments',
                method:'POST',
                data:params,
                success: function(data) {
                    that.setState({data:data});
                    $('#name').val('');
                    $('#body').val('');
                  
                }.bind(that),
                error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
                }.bind(this)
                });
        
        
            })
      
      
      
  },
    
    
    
    
    render:function(){
    
    return(
    
    <BlogContent data={this.state.data}/>
    )
    }
    
    });
        
        
var BlogContent=React.createClass({
    
    
    
    
    
    
    
            render:function(){
    
        return(

            <div>
                <div className="titleBlog">
                    {this.props.data.title}
                </div>
                <div className="contentBlog">
                   {this.props.data.content}
                </div>
            <CommentData data={this.props.data.comments|| []}/>
            <AddComment/>
            </div>
        )
    }
        
        
        
        
        });
    
    
    
    var CommentData=React.createClass({
    
      render:function(){
          
          
           var commentNodes = this.props.data.map(function (comment) {
      return (
            <div className="comment">
              <span className="name"><b>{comment.name}</b></span> says <span className="content">{comment.body}</span>
            </div>
      );
    });    
    
    return (
      <div>
        <h4>Comment section </h4>
        {commentNodes}
      </div>
    );
          
          
        
          
      }
    });
    
    
    
    
    var AddComment=React.createClass({
        
        componentDidMount:function(){
          
        
        
        
        },
    
      render:function(){
         return(
         <div>
             <h4>Please Do add a Comment</h4>
             <div>
                <input type="text" id="name" placeholder="Your Name is?"/>
             </div>
             <div>
                <textarea id="body" placeholder="Your Comments :)"></textarea>
             </div>
                 <CreateButton text="Add Comment" id="comment" class="addComment btn btn-primary"/>
        </div>
         
        );
    
         
    
       }
    });


    
var CreateBackButton=React.createClass({
    
    
    componentDidMount:function(){
      $('#goBack').click(function(){
                
                 window.location='/'
                });
    
    
    
    },
    
    render:function(){
            return(
            <button id='goback' className={this.props.class}>Back to Blog Page</button>
            )

    }    
    
    
    })


  


