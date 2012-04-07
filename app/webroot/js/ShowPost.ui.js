

ShowPostUi = Ext.extend(Ext.Window, {
    height: 250,
    width: 400,
    layout: 'absolute',
    title: 'Post',

    initComponent: function() {
        Ext.applyIf(this, {
            items: [
                {
                    xtype: 'form',
                    height: 219,
                    hideBorders: true,
                    layout: 'absolute',
                    headerAsText: false,
                    title: '',
                    items: [
                        {
                            xtype: 'button',
                            id: 'editPostButton',
                            boxMinWidth: 100,
                            width: 60,
                            arrowAlign: 'bottom',
                            iconAlign: 'right',
                            scale: 'medium',
                            text: 'Edit',
                            anchor: '40%',
                            x: 70,
                            y: 160

                        },
                        {
                            xtype: 'button',
                            id: 'deletePostButton',
                            boxMinWidth: 100,
                            width: 100,
                            arrowAlign: 'bottom',
                            iconAlign: 'right',
                            scale: 'medium',
                            text: '   Delete   ',
                            anchor: '50%',
                            x: 210,
                            y: 160
                        },
                        {
                            xtype: 'panel',
                            id: 'postDetails',
                            tpl: new Ext.XTemplate(
                                '<br/><br/>',
                                '<b>&nbsp;&nbsp;&nbsp;Title :</b>{title}<br/><br/>',
                                '<b>&nbsp;&nbsp;&nbsp;Body :</b>{body}'
                            ),
                            height: 150,
                            hideBorders: true,
                            title: '',
                            x: -5,
                            y: 0
                        }
                    ]
                }
            ]
        });

        ShowPostUi.superclass.initComponent.call(this);
    }
});