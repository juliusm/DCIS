<?php
/**
 * Created by IntelliJ IDEA.
 * User: juliusmercons
 * Date: 4/5/12
 * Time: 2:14 PM
 * To change this template use File | Settings | File Templates.
 */

class PostsController extends AppController {


    public function index(){

        $this->set('posts', $this->Post->find('all'));
    }

    /**
     * Does nothing but to render the 'extjs_posts' view.
     */
    public function extjsPosts(){

    }


    /**
     * Converts database query results into a format understandable by ext js grid.
     * Uses formatQueryResults() to format each entry.
     *
     * @param $queryResults
     * @return void
     */
    private function formatQueryResultsList($queryResults){

        $formattedPosts = array();

        foreach($queryResults as $details){

            $postDetails = $this->formatQueryResults($details);
            array_push($formattedPosts, $postDetails);
        }

        return $formattedPosts;
    }


    private function formatQueryResults($entry){

        $postDetails = array("id" => $entry["Post"]["id"],
                             "title" => $entry["Post"]["title"],
                             "body" => $entry["Post"]["body"]);
        return $postDetails;
    }


    /**
     * Called by Ext js grid to return a list of posts in JSON format.
     */
    public function jsonList() {

        $data = $this->request->data;

        $offset = (isset($data['start']))?(int)$data["start"]:0;
        $limit = 21;

        //database query
        $postsFromDb = $this->Post->find('all',array('limit' => $limit,
                                                     'offset' => $offset));

        $formattedPosts = $this->formatQueryResultsList($postsFromDb);

        //converts php array to JSON
        echo json_encode($formattedPosts);

        //prevents cakephp from rendering a view
        $this->autoRender=false;
    }


    public function getJsonPostDetail(){

        $data = $this->request->data;
        $id = $data['id'];
        $this->Post->id = $id;

        $post = $this->Post->read();

        $formattedPost = $this->formatQueryResults($post);

        $response = array("success" => true,
                          "data" => $formattedPost);
        echo json_encode($response);

        $this->autoRender=false;
    }


    public function view($id = null) {
        $this->Post->id = $id;
        $this->set('post', $this->Post->read());
    }


	//adding comment for git demo purposes only
	//second time commit
    public function add() {

        $results = '';

        if ($this->request->is('post')) {
            if ($this->Post->save($this->request->data)) {

                $this->set('posts', $this->request->data);
                $results = json_encode(array("success" => true, "requestedId" => 'newId'));
            } else {

                $results = json_encode(array("success" => false, "requestedId" => 'newId'));
            }

        }

        echo $results;
        $this->autoRender=false;
    }


    public function edit($id = null) {

        $this->Post->id = $id;

        if ($this->Post->save($this->request->data)) {

           echo json_encode(array("success" => true, "requestedId" => 'newId'));

        } else {
           echo json_encode(array("success" => false, "requestedId" => 'newId'));
        }


        $this->autoRender=false;
    }


    public function delete() {

        $data = $this->request->data;
        $id = $data['id'];

        if ($this->Post->delete($id)) {

            echo json_encode(array("success" => true, "requestedId" => 'newId', "message" => 'The post with ID: ' . $id . ' has been deleted.'));
        }else{

            echo json_encode(array("success" => false, "requestedId" => 'newId', "message" => 'delete failed.'));
        }

        $this->autoRender=false;
    }


}
