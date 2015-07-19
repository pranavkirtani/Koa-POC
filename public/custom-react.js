 var Blog = React.createClass({
   
  render: function() {

    return (
    <div>
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
  

   
    
 var commentNodes = this.state.data.map(function (comment) {
      return (
        <Blog title={comment.title} text={comment.content} id={comment._id}>
        </Blog>
      );
    });    
    
    return (
      <div className="commentList">
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
          
          $('#goBack').click(function(){
                
                 window.location='/'
                });
          
    
  },
    
    

render: function() {
    return (
   <button id={this.props.id}>{this.props.text}</button>
     
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
      html_to_return=<textarea width="500px" height="200px" ></textarea>
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
      html_to_return=<input type="text" width="500px" height="20px"  disabled/>
    }
      else{
      html_to_return=<input type="text" width="500px" height="20px"/>
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
                <div>
                    <input type="text" width="500px" height="20px" value={this.props.data.title} disabled/> 
                </div>
                <div>
                    <textarea width="500px" height="200px" value={this.props.data.content} disabled>
                    </textarea>
                </div>
            </div>
        )
    }
        
        
        
        
        });




  

