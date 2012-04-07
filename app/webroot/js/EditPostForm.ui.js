/**
 * edit post form
 */
EditPostFormUi = Ext.extend(Ext.Window, {
    height: 295,
    width: 471,
    title: 'Edit Post',
    id: 'editPostWindow',
    x: 30,

    initComponent: function() {
        Ext.applyIf(this, {
            items: [
                {
                    xtype: 'form',
                    height: 267,
                    layout: 'absolute',
                    id: 'editPostForm',
                    url: '/DCIS/posts/edit',
                    title: '',
                    items: [
                        {
                            xtype: 'label',
                            text: 'Title:',
                            x: 40,
                            y: 45
                        },
                        {
                            xtype: 'label',
                            text: 'Body:',
                            x: 40,
                            y: 100
                        },
                        {
                            xtype: 'textfield',
                            width: 280,
                            name: 'title',
                            x: 100,
                            y: 40
                        },
                        {
                            xtype: 'textarea',
                            boxMaxWidth: 280,
                            name: 'body',
                            anchor: '100%',
                            x: 100,
                            y: 90
                        },
                         {
                            xtype:'hidden',
                            name:'id'
                        },
                        {
                            xtype: 'button',
                            id: 'savePost',
                            width: 70,
                            scale: 'medium',
                            text: 'Save',
                            x: 130,
                            y: 200,
                            handler: function(){

                                var window = Ext.getCmp("editPostWindow");
                                var form = window.findById("editPostForm");
                                var grid = Ext.getCmp("postsGrid");

                                form.getForm().submit({
                                    success: function(res,req){

                                        window.destroy();
                                        grid.store.reload();
                                        grid.getView().refresh();
                                        Ext.MessageBox.alert('Status', 'Changes saved successfully.');
                                    },
                                    failure: function(error1, error2){
                                        Ext.MessageBox.alert('Status', 'Service is currently unavailable. Please try again later.');
                                    }

                                });
                            }
                        },
                        {
                            xtype: 'button',
                            id: 'cancelPost',
                            width: 80,
                            scale: 'medium',
                            text: 'Cancel',
                            x: 260,
                            y: 200,
                            handler: function(){
                                var window = Ext.getCmp("editPostWindow");
                                window.destroy();
                            }
                        }
                    ]
                }
            ]
        });

        EditPostFormUi.superclass.initComponent.call(this);
    }
});