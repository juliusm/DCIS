<?php
/**
 * Created by IntelliJ IDEA.
 * User: juliusmercons
 * Date: 4/5/12
 * Time: 2:12 PM
 */
 
class Post extends AppModel {

    public $validate = array(
        'title' => array(
            'rule' => 'notEmpty'
        ),
        'body' => array(
            'rule' => 'notEmpty'
        )
    );

}
