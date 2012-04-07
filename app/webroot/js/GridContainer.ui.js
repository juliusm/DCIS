/**
 * Created by IntelliJ IDEA.
 * User: juliusmercons
 * Date: 4/5/12
 * Time: 2:14 PM
 * To change this template use File | Settings | File Templates.
 */

GridContainerUi = Ext.extend(Ext.Panel, {
    height: 595,
    width: 825,
    title: 'Blog',

    initComponent: function() {
        Ext.applyIf(this, {
            items: [
                {
                    xtype: 'grid',
                    id: 'postsGrid',
                    height: 540,
                    width: 831,
                    title: 'Posts',
                    store: 'PostsStore',
                    columns: [
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'title',
                            editable: false,
                            header: 'Title',
                            id: 'title',
                            sortable: true,
                            width: 200
                        },
                        {
                            xtype: 'gridcolumn',
                            dataIndex: 'body',
                            editable: false,
                            header: 'Body',
                            id: 'body',
                            sortable: true,
                            width: 618
                        }
                    ]

                }
            ],
            bbar: {
                xtype: 'paging',
                height: 28,
                store: 'PostsStore',
                items: [
                    {
                        xtype: 'button',
                        id: 'addPost',
                        text: 'Add Post',
                        handler: function(){
                            //displays a window to add post when this button is clicked.
                            var cmp1 = new AddPostFormUi({
                                renderTo: Ext.getBody()
                            });

                            cmp1.show();
                        }
                    }
                ]
            }
        });

        GridContainerUi.superclass.initComponent.call(this);

        var grid = this.findById("postsGrid");

        //listener when user double clicks a row on grid
        grid.on("rowdblclick", function(grid, rowIndex, columnIndex, e){

            var index = grid.getStore().getAt(rowIndex);
            var id = index.get('id');

            //retrieves post details and then displays it in a window (refer to getPostDetails() on ExtMain.js).
            getPostDetails(id, "showPost");

	    });
    }
});

