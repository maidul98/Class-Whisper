import React from "react";
import Navbar from "react-bootstrap/Navbar";
import FormControl from "react-bootstrap/FormControl";
import Comments from './Comments'
import "font-awesome/css/font-awesome.min.css";
import { Button, Form } from 'semantic-ui-react'

function SinglePost() {
  return (
    <div>
      <div class="row">
        <div class="col-sm-6 offset-sm-3">
          <div className="post">
            <div className="row">
              <div className="col-sm-1">
                <div className="postVotes">
                  <i class="fas fa-arrow-up voteIcon"></i>
                  <p class="postVotes">102</p>
                  <i class="fas fa-arrow-down voteIcon"></i>
                </div>
              </div>
              <div className="col-sm-11">
                <div className="postedDetails">
                  <span className="postedIn">class/CS 5150</span>{" "}
                  <span>posted by mi252</span>
                </div>
                <div className="postTitle">
                  <h5>This is the title</h5>
                </div>
                <div className="postBody">
                  <p>
                    Sed ut perspiciatis unde omnis iste natus error sit
                    voluptatem accusantium doloremque laudantium, totam rem
                    aperiam, eaque ipsa quae ab illo inventore veritatis et
                    quasi architecto beatae vitae dicta sunt explicabo. Nemo
                    enim ipsam voluptatem quia voluptas sit aspernatur aut odit
                    aut fugit, sed quia consequuntur magni dolores eos qui
                    ratione voluptatem sequi nesciunt. Neque porro quisquam est,
                    qui dolorem ipsum quia dolor sit amet, consectetur, adipisci
                    velit, sed quia non numquam eius modi tempora incidunt ut
                    labore et dolore magnam aliquam quaerat voluptatem. Ut enim
                    ad minima veniam, quis nostrum exercitationem ullam corporis
                    suscipit laboriosam, nisi ut aliquid ex ea commodi
                    consequatur? Quis autem vel eum iure reprehenderit qui in ea
                    voluptate velit esse quam nihil molestiae consequatur, vel
                    illum qui dolorem eum fugiat quo voluptas nulla pariatur?
                  </p>
                </div>
                <div className="postStats">
                  <span className="commentsCount">
                    <i class="fas fa-comment-alt postCommentsIcon"></i> 23
                    comments
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="addComment">
          <Form reply>
            <Form.TextArea />
            <Button className="pull-right" content='Add Reply' primary disabled />
            <div className="clearfix"></div>
          </Form>
          </div>
          <div className="postComments">
              <Comments/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SinglePost;
