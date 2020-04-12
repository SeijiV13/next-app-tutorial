import React from 'react';
import Layout from "../components/Layout";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as blogActions from '../store/blog/actions';
import BlogItem from '../components/BlogItem';
import Router from 'next/router'
import { Button } from 'react-bootstrap';
const button = {
    marginRight: "0px",
}
class Index extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.selectBlog = this.selectBlog.bind(this);
    }
    render() {
        const { blogs } = this.props;

        return (
                 <Layout>
                    <div>
                      {blogs.map(blog =>{
                          return (
                          <BlogItem key={blog.id} blog={blog} onClick={(data) => this.selectBlog(data)}></BlogItem>
                          )
                      })}
                    </div>
        
                    <Button style={button}  onClick={(data) => this.selectBlog({blog: null, action: 'create'})}>Create Blog</Button>

                 </Layout>
             
        )
    }
    componentDidMount() {
        this.props.actions.getAllBlogs();
    }


    selectBlog(data) {
        if(data.action === "delete") {
            this.props.actions.deleteBlog(data.blog.id).then(() => {
                this.props.actions.getAllBlogs();
            });
            
            return;
        }
        this.props.actions.setSelectedBlog(data.blog);
        this.props.actions.setFormState(data.action);
        Router.push('/blogform')
    }

}


const mapStateToProps = (state, ownProps) => {
    return {
      blogs: state.blogs.allBlogs
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        actions: bindActionCreators(Object.assign({}, blogActions), dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);