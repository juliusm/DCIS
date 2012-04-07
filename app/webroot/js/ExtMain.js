/**
 * Created by IntelliJ IDEA.
 * User: juliusmercons
 * Date: 4/5/12
 * Time: 2:14 PM
 * To change this template use File | Settings | File Templates.
 */

//retrieves post details from the server
var getPostDetails = function(id, action){

    Ext.Ajax.request({

        loadMask: true,
        url: '/DCIS/posts/getJsonPostDetail',
        params: {id: id},
        success: function(response) {
            var data = Ext.decode(response.responseText);

            switch(action){

                case 'editPost':
                    showEditPostForm(data);
                    break;

                case 'showPost':
                    showPostDetails(data);
                    break;
            }
        }

    });

}

var deletePost = function(id){

    Ext.Ajax.request({

        loadMask: true,
        url: '/DCIS/posts/delete',
        params: {id: id},
        success: function(response) {

            var data = Ext.decode(response.responseText);

            Ext.MessageBox.alert('Status', data.message);

            //reloads grid after deleting an entry
            var grid = Ext.getCmp("postsGrid");
            grid.store.reload();
            grid.getView().refresh();

        }

    });

}


var showPostDetails = function(details){

    var showPostUi = new ShowPostUi({
        renderTo: Ext.getBody()
    });

    var template = showPostUi.findById('postDetails').tpl;

    template.overwrite(showPostUi.findById('postDetails').body, details.data);
    showPostUi.show();

    //add listener to delete button on show window
    var deleteButton = showPostUi.findById('deletePostButton');
    deleteButton.on('click', function(){
          deletePost(details.data.id);

          //removes show window from screen after deleting an entry.
          showPostUi.destroy();
    });

    //add listener to edit button on show window
    var editButton = showPostUi.findById('editPostButton');
    editButton.on('click', function(){
         getPostDetails(details.data.id, "editPost");

         //removes show window from screen after deleting an entry.
         showPostUi.destroy();
    });

}


var showEditPostForm = function(details){

    var cmp1 = new EditPostFormUi({
        renderTo: Ext.getBody()
    });
    cmp1.findById('editPostForm').getForm().loadRecord(details);
    cmp1.show();
}



//Loads Ext js grid on page load
Ext.onReady(function() {
    Ext.QuickTips.init();

    //contains data to be displayed in grid.
    var store = new PostsStore();

    var grid = new GridContainerUi({
        renderTo: Ext.getBody()
    });
    grid.show();
});
